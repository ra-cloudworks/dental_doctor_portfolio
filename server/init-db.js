import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../database.sqlite');
console.log('Seeding database at:', dbPath);

const db = new sqlite3.Database(dbPath);

// Helper function to run query with promise
const runAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

async function seed() {
  try {
    // 1. Create Tables
    await runAsync(`CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS specialties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      desc TEXT,
      icon TEXT,
      link TEXT
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS gallery_cases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_id TEXT UNIQUE,
      category TEXT,
      title TEXT,
      desc TEXT,
      beforeImage TEXT,
      afterImage TEXT,
      prosthetics TEXT,
      duration TEXT,
      material TEXT,
      featured INTEGER DEFAULT 0
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS timeline_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tag TEXT,
      title TEXT,
      institution TEXT,
      details TEXT
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      value TEXT,
      label TEXT
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS patient_resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      category TEXT,
      description TEXT,
      icon TEXT,
      link TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      phone TEXT,
      preferredDate TEXT,
      specialty TEXT,
      message TEXT,
      status TEXT DEFAULT 'pending',
      createdAt TEXT DEFAULT (datetime('now'))
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT,
      views INTEGER DEFAULT 0,
      date TEXT DEFAULT (date('now'))
    )`);

    // 2. Clear existing entries to prevent duplicates (except settings where we replace)
    await runAsync('DELETE FROM specialties');
    await runAsync('DELETE FROM stats');
    await runAsync('DELETE FROM timeline_items');
    await runAsync('DELETE FROM gallery_cases');
    await runAsync('DELETE FROM patient_resources');

    // 3. Seed Settings
    const initialSettings = [
      { key: 'hero_badge', value: 'BOARD CERTIFIED PROSTHODONTIST' },
      { key: 'hero_title_left', value: 'Precision Restorative Care for a ' },
      { key: 'hero_title_gold', value: 'Lifetime of' },
      { key: 'hero_title_right', value: 'Smiles.' },
      { key: 'hero_desc', value: 'Specializing in advanced prosthodontics and implantology to restore function and aesthetic perfection through clinically-driven surgical precision.' },
      { key: 'hero_profile_img', value: '/src/assets/profile.jpeg' },
      { key: 'hero_badge_title', value: 'MDS PROSTHODONTICS' },
      { key: 'hero_badge_desc', value: 'Precision Certified Specialist' },
      
      { key: 'implant_title', value: 'Advanced Dental Implantology' },
      { key: 'implant_subtitle', value: 'The Architecture of a Lasting Smile' },
      { key: 'implant_desc', value: 'Dental implantology at our practice is approached as both a biological science and a structural art. Whether replacing a single tooth or executing a full-arch rehabilitation via the All-on-4® protocol, our goal is primary stability and long-term osseointegration.' },
      
      { key: 'implant_proc1_title', value: 'Single Tooth Replacement' },
      { key: 'implant_proc1_desc', value: 'Precision placement to preserve adjacent tooth structure and maintain bone volume. We focus on emergent profile design for indistinguishable aesthetics.' },
      { key: 'implant_proc2_title', value: 'All-on-4 / Full Arch' },
      { key: 'implant_proc2_desc', value: 'Strategic placement of four implants to support a full fixed prosthesis. Ideal for patients with significant bone loss seeking immediate function.' },
      
      { key: 'tech_item1_title', value: 'CBCT Guided Surgery' },
      { key: 'tech_item1_desc', value: '3D dynamic imaging for sub-millimeter placement accuracy.' },
      { key: 'tech_item2_title', value: 'Zirconia Restoration' },
      { key: 'tech_item2_desc', value: 'Biocompatible, metal-free material for superior gingival health.' },
      { key: 'tech_item3_title', value: 'Digital Scanning' },
      { key: 'tech_item3_desc', value: 'Itero Element scanning for high-precision prosthesis fit.' },
      
      { key: 'commit_title', value: 'Commitment to Surgical Precision & Lifelong Learning' },
      { key: 'commit_desc', value: 'Dr. Popuri combines her profound academic background with over 10 years of hands-on clinical experience, including leadership roles at municipal hospitals and national dental clinics, to deliver results that are both functional and biologically sound.' },
      { key: 'commit_badge1_val', value: 'Top 1%' },
      { key: 'commit_badge1_lbl', value: 'Fellowship Graduates' },
      { key: 'commit_badge2_val', value: 'Global' },
      { key: 'commit_badge2_lbl', value: 'Implantology Fellowship' },

      { key: 'story_quote', value: 'The precision of Dr. Popuri\'s work is simply unmatched. After years of discomfort, my full-mouth reconstruction feels exactly like my natural teeth—only better. Her attention to detail gave me my life back.' },
      { key: 'story_patient_name', value: 'Rajeswari Kumar' },
      { key: 'story_patient_role', value: 'IMPLANT & PROSTHETIC PATIENT' },

      { key: 'clinic_phone', value: '+91 (0) 40 2345 6789' },
      { key: 'clinic_location', value: 'Specialist Restorative Wing, Premium Dental Care, Jubilee Hills, Hyderabad, Telangana' },
      { key: 'clinic_email', value: 'contact@drpopuri.com' },
      
      { key: 'primary_award_title', value: 'Best Paper Award 2024' },
      { key: 'primary_award_desc', value: 'Prosthodontic Association' },
      { key: 'footer_bio_summary', value: 'Specializing in advanced prosthodontics and aesthetic restorative care for over 15 years...' }
    ];

    for (const s of initialSettings) {
      await runAsync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [s.key, s.value]);
    }

    // 4. Seed Specialties
    const initialSpecialties = [
      { title: 'Complete Mouth Rehabilitation', desc: 'Comprehensive restoration of entire dentition with precision and aesthetics.', icon: '🦷', link: '' },
      { title: 'Dental Implants', desc: 'State-of-the-art implant placement with osseointegration techniques.', icon: '🔧', link: '#implantology' },
      { title: 'Prosthodontic Restorations', desc: 'Crowns, bridges, and dentures with superior aesthetics and function.', icon: '✨', link: '' },
      { title: 'Digital Smile Design', desc: 'Smile visualization and planning using advanced digital technology.', icon: '💻', link: '' },
      { title: 'Bone Grafting', desc: 'Surgical augmentation for optimal implant placement and longevity.', icon: '🧬', link: '' },
      { title: 'Aesthetic Dentistry', desc: 'Cosmetic solutions for a beautiful and natural-looking smile.', icon: '💎', link: '' }
    ];

    for (const s of initialSpecialties) {
      await runAsync('INSERT INTO specialties (title, desc, icon, link) VALUES (?, ?, ?, ?)', [s.title, s.desc, s.icon, s.link]);
    }

    // 5. Seed Stats
    const initialStats = [
      { value: '500+', label: 'Restored Smiles' },
      { value: '15+', label: 'Years Experience' },
      { value: '2.5k', label: 'Dental Implants' },
      { value: '100%', label: 'Clinical Precision' }
    ];

    for (const s of initialStats) {
      await runAsync('INSERT INTO stats (value, label) VALUES (?, ?)', [s.value, s.label]);
    }

    // 6. Seed Timeline Items
    const initialTimeline = [
      { tag: 'MDS – MASTER OF DENTAL SURGERY (2016)', title: 'Prosthodontics & Crown and Bridge', institution: 'Banasthali Institute of Dental Science and Hospital', details: 'Specialized training in full-mouth rehabilitation and implant-supported restorations.' },
      { tag: 'BDS – BACHELOR OF DENTAL SURGERY (2013)', title: 'Clinical Foundation', institution: 'Uttaranchal Institute of Dental Science and Hospital', details: 'Distinguished academic record laying the foundation for restorative excellence.' },
      { tag: 'AWARD & RECOGNITION', title: 'Best Paper Award 2024', institution: 'National Prosthodontics Conference', details: 'Received for research in advanced restorative techniques and implant protocols.' }
    ];

    for (const t of initialTimeline) {
      await runAsync('INSERT INTO timeline_items (tag, title, institution, details) VALUES (?, ?, ?, ?)', [t.tag, t.title, t.institution, t.details]);
    }

    // 7. Seed Gallery Cases
    const initialCases = [
      {
        case_id: 'Case #01',
        category: 'Dental Implants',
        title: 'Single Anterior Implant',
        desc: 'Replacement of a fractured central incisor with a custom titanium implant and translucent zirconia crown.',
        beforeImage: '/src/assets/implant_showcase.png',
        afterImage: '/src/assets/implant_showcase.png',
        prosthetics: 'Screw-retained Zirconia Crown',
        duration: '3 Months',
        material: 'Monolithic Translucent Zirconia',
        featured: 0
      },
      {
        case_id: 'Case #02',
        category: 'Full-Mouth',
        title: 'Full-Arch Rehabilitation',
        desc: 'Complete restoration of upper and lower dentition correcting severe attritional wear and occlusal vertical dimension.',
        beforeImage: '/src/assets/before_after_showcase.png',
        afterImage: '/src/assets/before_after_showcase.png',
        prosthetics: 'Fixed Crown & Bridge Rehabilitation',
        duration: '5 Months',
        material: 'IPS e.max Ceram & Zirconia Substructure',
        featured: 1
      },
      {
        case_id: 'Case #03',
        category: 'Cosmetic Dentistry',
        title: 'Aesthetic Porcelain Veneers',
        desc: 'Smile redesign using ultra-thin lithium disilicate veneers to correct spacing, minor rotation, and staining.',
        beforeImage: '/src/assets/profile.jpeg',
        afterImage: '/src/assets/profile.jpeg',
        prosthetics: '8 Anterior Laminate Veneers',
        duration: '2 Weeks',
        material: 'IPS e.max Press (Lithium Disilicate)',
        featured: 0
      },
      {
        case_id: 'Case #04',
        category: 'Dental Implants',
        title: 'Implant-Supported Bridge',
        desc: 'Restoring posterior masticatory support with two osseointegrated implants supporting a 3-unit fixed bridge.',
        beforeImage: '/src/assets/implant_showcase.png',
        afterImage: '/src/assets/implant_showcase.png',
        prosthetics: '3-Unit Implant Bridge',
        duration: '4 Months',
        material: 'Porcelain-Fused-to-Zirconia (PFZ)',
        featured: 0
      },
      {
        case_id: 'Case #05',
        category: 'Full-Mouth',
        title: 'All-on-4® Restoration',
        desc: 'Immediate loading protocol for fully edentulous mandible, restoring complete chew function in a single day.',
        beforeImage: '/src/assets/before_after_showcase.png',
        afterImage: '/src/assets/before_after_showcase.png',
        prosthetics: 'All-on-4 Fixed Prosthesis',
        duration: '6 Months (Final)',
        material: 'Titanium-Reinforced BioHPP & Composite',
        featured: 0
      },
      {
        case_id: 'Case #06',
        category: 'Cosmetic Dentistry',
        title: 'Minimal Prep Veneers',
        desc: 'Aesthetic enhancement preserving maximum tooth structure, correcting enamel hypoplasia.',
        beforeImage: '/src/assets/profile.jpeg',
        afterImage: '/src/assets/profile.jpeg',
        prosthetics: '6 Minimal Prep Veneers',
        duration: '3 Weeks',
        material: 'Premium Translucent Feldspathic Porcelain',
        featured: 0
      }
    ];

    for (const c of initialCases) {
      await runAsync(`INSERT INTO gallery_cases 
        (case_id, category, title, desc, beforeImage, afterImage, prosthetics, duration, material, featured) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [c.case_id, c.category, c.title, c.desc, c.beforeImage, c.afterImage, c.prosthetics, c.duration, c.material, c.featured]
      );
    }

    // 8. Seed Patient Resources
    const initialPatientResources = [
      { title: 'What to Expect Before Your Implant Surgery', category: 'Pre-Op Instructions', description: 'A comprehensive guide covering dietary restrictions, medication adjustments, and preparation steps to ensure optimal outcomes for your dental implant procedure.', icon: '📋', link: '', sort_order: 1 },
      { title: 'Post-Operative Care for Dental Implants', category: 'Post-Op Care', description: 'Detailed aftercare instructions including oral hygiene routines, dietary guidelines, and warning signs to watch for during your recovery period.', icon: '🩹', link: '', sort_order: 2 },
      { title: 'Understanding the Implant Timeline', category: 'General Info', description: 'Learn about the stages of dental implant treatment from initial consultation through osseointegration to final crown placement.', icon: '⏱️', link: '', sort_order: 3 },
      { title: 'FAQs About Prosthodontic Treatments', category: 'FAQ', description: 'Answers to the most commonly asked questions about crowns, bridges, veneers, and full-mouth rehabilitation procedures.', icon: '❓', link: '', sort_order: 4 },
      { title: 'Payment & Insurance Information', category: 'General Info', description: 'Information about accepted insurance plans, financing options, and payment methods available at our clinic.', icon: '💳', link: '', sort_order: 5 },
      { title: 'Preparing for Your First Consultation', category: 'Pre-Op Instructions', description: 'What to bring, medical records to prepare, and how to maximize your initial visit with Dr. Popuri for treatment planning.', icon: '📄', link: '', sort_order: 6 }
    ];

    for (const r of initialPatientResources) {
      await runAsync(
        'INSERT INTO patient_resources (title, category, description, icon, link, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
        [r.title, r.category, r.description, r.icon, r.link, r.sort_order]
      );
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    db.close();
  }
}

seed();
