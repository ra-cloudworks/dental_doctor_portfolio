export default function ContentLibraryTab({ C, cases, content, handleImageUpload }) {
  const mediaItems = [];

  if (content.hero_profile_img) {
    mediaItems.push({
      src: content.hero_profile_img,
      filename: content.hero_profile_img.split('/').pop(),
      label: 'Hero Profile',
      category: 'Profile',
    });
  }

  cases.forEach((c) => {
    if (c.beforeImage) {
      mediaItems.push({
        src: c.beforeImage,
        filename: c.beforeImage.split('/').pop(),
        label: `${c.title} (Before)`,
        category: 'Cases',
      });
    }
    if (c.afterImage) {
      mediaItems.push({
        src: c.afterImage,
        filename: c.afterImage.split('/').pop(),
        label: `${c.title} (After)`,
        category: 'Cases',
      });
    }
  });

  const categories = [...new Set(mediaItems.map((m) => m.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>Content Library</h2>
          <p className="text-gray-500 text-sm max-w-2xl mt-1">
            All media assets across your portfolio. {mediaItems.length} asset{mediaItems.length !== 1 ? 's' : ''} total.
          </p>
        </div>
        <label className="px-5 py-2.5 bg-[#04231E] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity cursor-pointer">
          Upload Media
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] border border-black/[0.04] shadow-sm text-center">
          <p className="text-gray-400 text-sm">No media assets yet. Upload your first image above.</p>
        </div>
      ) : (
        categories.map((cat) => (
          <div key={cat} className="space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: C.forestGreen }}>{cat}</h3>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {mediaItems.filter((m) => m.category === cat).length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {mediaItems.filter((m) => m.category === cat).map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-2xl border border-black/[0.04] shadow-sm group hover:shadow-md transition-shadow">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 truncate" title={item.filename}>{item.filename}</p>
                  <p className="text-xs font-semibold mt-1 truncate" title={item.label}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
