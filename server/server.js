import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { query } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env (KEY=VALUE per line) without requiring a dependency
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvFile(path.resolve(__dirname, '../.env'));

const app = express();
const PORT = process.env.PORT || 5000;

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

if (!DASHBOARD_PASSWORD || !SESSION_SECRET) {
  console.warn('WARNING: DASHBOARD_PASSWORD and SESSION_SECRET are not set. Set them in a .env file — dashboard login will be disabled until then.');
}

function signToken() {
  const payload = `admin:${Date.now()}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}.${signature}`).toString('base64');
}

function verifyToken(token) {
  if (!token || !SESSION_SECRET) return false;
  let decoded;
  try {
    decoded = Buffer.from(token, 'base64').toString('utf-8');
  } catch {
    return false;
  }
  const dotIdx = decoded.lastIndexOf('.');
  if (dotIdx === -1) return false;
  const payload = decoded.slice(0, dotIdx);
  const signature = decoded.slice(dotIdx + 1);
  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expectedSignature, 'hex');
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return false;
  const ts = Number(payload.split(':')[1]);
  return Number.isFinite(ts) && Date.now() - ts <= SESSION_DURATION_MS;
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized. Please log in again.' });
  }
  next();
}

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists in public directory
const uploadsDir = path.resolve(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer disk storage configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique file names
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only accept image files
    const filetypes = /jpeg|jpg|png|gif|webp|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed (jpeg, jpg, png, gif, webp, svg)'));
  }
});

// Serve public uploads statically (fallback in case frontend build needs direct server static files)
app.use('/uploads', express.static(uploadsDir));

// ── API ROUTES ──

// 1. Image Upload Endpoint
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    // Return the relative URL path of the uploaded image
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ imagePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Settings Endpoint (Key-Value site settings)
app.get('/api/content', async (req, res) => {
  try {
    const rows = await query.all('SELECT key, value FROM settings');
    const content = {};
    rows.forEach(r => {
      content[r.key] = r.value;
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/content', requireAuth, async (req, res) => {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await query.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
    }
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Specialties Endpoints (CRUD)
app.get('/api/specialties', async (req, res) => {
  try {
    const rows = await query.all('SELECT * FROM specialties');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/specialties', requireAuth, async (req, res) => {
  try {
    const { id, title, desc, icon, link } = req.body;
    if (id) {
      await query.run(
        'UPDATE specialties SET title = ?, desc = ?, icon = ?, link = ? WHERE id = ?',
        [title, desc, icon, link || '', id]
      );
      res.json({ success: true, message: 'Specialty updated' });
    } else {
      const result = await query.run(
        'INSERT INTO specialties (title, desc, icon, link) VALUES (?, ?, ?, ?)',
        [title, desc, icon, link || '']
      );
      res.json({ success: true, id: result.id, message: 'Specialty created' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/specialties/:id', requireAuth, async (req, res) => {
  try {
    await query.run('DELETE FROM specialties WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Specialty deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Gallery Cases Endpoints (CRUD)
app.get('/api/cases', async (req, res) => {
  try {
    const rows = await query.all('SELECT * FROM gallery_cases');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/cases', requireAuth, async (req, res) => {
  try {
    const { id, case_id, category, title, desc, beforeImage, afterImage, prosthetics, duration, material, featured } = req.body;
    const isFeatured = featured ? 1 : 0;

    // If setting this case as featured, first clear featured flag on all other cases
    if (isFeatured === 1) {
      await query.run('UPDATE gallery_cases SET featured = 0');
    }

    if (id) {
      await query.run(
        `UPDATE gallery_cases SET 
          case_id = ?, category = ?, title = ?, desc = ?, 
          beforeImage = ?, afterImage = ?, prosthetics = ?, 
          duration = ?, material = ?, featured = ? 
        WHERE id = ?`,
        [case_id, category, title, desc, beforeImage, afterImage, prosthetics, duration, material, isFeatured, id]
      );
      res.json({ success: true, message: 'Case updated' });
    } else {
      const result = await query.run(
        `INSERT INTO gallery_cases 
          (case_id, category, title, desc, beforeImage, afterImage, prosthetics, duration, material, featured) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [case_id, category, title, desc, beforeImage, afterImage, prosthetics, duration, material, isFeatured]
      );
      res.json({ success: true, id: result.id, message: 'Case created' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/cases/:id', requireAuth, async (req, res) => {
  try {
    await query.run('DELETE FROM gallery_cases WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Case deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Timeline Endpoints (CRUD)
app.get('/api/timeline', async (req, res) => {
  try {
    const rows = await query.all('SELECT * FROM timeline_items');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/timeline', requireAuth, async (req, res) => {
  try {
    const { id, tag, title, institution, details } = req.body;
    if (id) {
      await query.run(
        'UPDATE timeline_items SET tag = ?, title = ?, institution = ?, details = ? WHERE id = ?',
        [tag, title, institution, details, id]
      );
      res.json({ success: true, message: 'Timeline item updated' });
    } else {
      const result = await query.run(
        'INSERT INTO timeline_items (tag, title, institution, details) VALUES (?, ?, ?, ?)',
        [tag, title, institution, details]
      );
      res.json({ success: true, id: result.id, message: 'Timeline item created' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/timeline/:id', requireAuth, async (req, res) => {
  try {
    await query.run('DELETE FROM timeline_items WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Timeline item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Stats Endpoints
app.get('/api/stats', async (req, res) => {
  try {
    const rows = await query.all('SELECT * FROM stats');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/stats', requireAuth, async (req, res) => {
  try {
    const { id, value, label } = req.body;
    await query.run('UPDATE stats SET value = ?, label = ? WHERE id = ?', [value, label, id]);
    res.json({ success: true, message: 'Stat updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Patient Resources Endpoints (CRUD)
app.get('/api/patient-resources', async (req, res) => {
  try {
    const rows = await query.all('SELECT * FROM patient_resources ORDER BY sort_order ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/patient-resources', requireAuth, async (req, res) => {
  try {
    const { id, title, category, description, icon, link, sort_order } = req.body;
    if (id) {
      await query.run(
        'UPDATE patient_resources SET title = ?, category = ?, description = ?, icon = ?, link = ?, sort_order = ? WHERE id = ?',
        [title, category, description, icon || '', link || '', sort_order || 0, id]
      );
      res.json({ success: true, message: 'Patient resource updated' });
    } else {
      const result = await query.run(
        'INSERT INTO patient_resources (title, category, description, icon, link, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
        [title, category, description, icon || '', link || '', sort_order || 0]
      );
      res.json({ success: true, id: result.id, message: 'Patient resource created' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/patient-resources/:id', requireAuth, async (req, res) => {
  try {
    await query.run('DELETE FROM patient_resources WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Patient resource deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Bookings Endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, preferredDate, specialty, message } = req.body;
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }
    const result = await query.run(
      'INSERT INTO bookings (firstName, lastName, email, phone, preferredDate, specialty, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, preferredDate || '', specialty || '', message || '']
    );
    res.json({ success: true, id: result.id, message: 'Consultation request submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bookings', requireAuth, async (req, res) => {
  try {
    const rows = await query.all('SELECT * FROM bookings ORDER BY createdAt DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookings/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    await query.run('UPDATE bookings SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: 'Booking status updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. Analytics Endpoints
app.get('/api/analytics', requireAuth, async (req, res) => {
  try {
    const totalViews = await query.all('SELECT SUM(views) as total FROM analytics');
    const byPage = await query.all('SELECT page, SUM(views) as views FROM analytics GROUP BY page ORDER BY views DESC');
    const recent = await query.all('SELECT date, SUM(views) as views FROM analytics GROUP BY date ORDER BY date DESC LIMIT 30');
    res.json({
      totalViews: totalViews[0]?.total || 0,
      byPage,
      recent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/analytics/track', async (req, res) => {
  try {
    const { page } = req.body;
    const today = new Date().toISOString().split('T')[0];
    const existing = await query.all('SELECT id FROM analytics WHERE page = ? AND date = ?', [page || 'home', today]);
    if (existing.length > 0) {
      await query.run('UPDATE analytics SET views = views + 1 WHERE id = ?', [existing[0].id]);
    } else {
      await query.run('INSERT INTO analytics (page, views, date) VALUES (?, 1, ?)', [page || 'home', today]);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard auth check
app.post('/api/auth/dashboard', async (req, res) => {
  try {
    if (!DASHBOARD_PASSWORD || !SESSION_SECRET) {
      return res.status(500).json({ error: 'Dashboard authentication is not configured on the server.' });
    }
    const { password } = req.body;
    if (password === DASHBOARD_PASSWORD) {
      res.json({ success: true, token: signToken() });
    } else {
      res.status(401).json({ error: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
