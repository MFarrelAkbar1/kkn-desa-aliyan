export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="bg-green-100 p-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di Desa Aliyan</h1>
        <p className="text-lg text-gray-700 mb-6">
          Desa yang kaya dengan keindahan alam, budaya, dan potensi lokal.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition">
          Jelajahi Desa
        </button>
      </section>

      {/* Tentang Desa Aliyan */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Tentang Desa Aliyan</h2>
        <p className="text-gray-700">
          Desa Aliyan adalah desa yang terletak di kawasan yang indah dengan warisan budaya yang kaya. Kami bangga dengan
          keunikan tradisi, keramahan penduduk, dan potensi yang luar biasa.
        </p>
        <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition">
          Baca Lebih Lanjut
        </button>
      </section>

      {/* Potensi Desa */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Potensi Desa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kartu 1 */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img src="/aliyan1.jpg" alt="Wisata Alam" className="h-32 w-full object-cover rounded-md mb-4" />
            <h3 className="font-bold text-lg">Wisata Alam</h3>
            <p className="text-gray-700">
              Jelajahi keindahan alam yang memukau di Desa Aliyan.
            </p>
          </div>
          {/* Kartu 2 */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img src="/aliyan2.jpg" alt="Kerajinan Tangan" className="h-32 w-full object-cover rounded-md mb-4" />
            <h3 className="font-bold text-lg">Kerajinan Tangan</h3>
            <p className="text-gray-700">
              Produk lokal berkualitas hasil tangan-tangan kreatif penduduk desa.
            </p>
          </div>
          {/* Kartu 3 */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img src="/aliyan3.jpeg" alt="Kuliner Khas" className="h-32 w-full object-cover rounded-md mb-4" />
            <h3 className="font-bold text-lg">Kuliner Khas</h3>
            <p className="text-gray-700">
              Nikmati berbagai makanan tradisional yang menggugah selera.
            </p>
          </div>
        </div>
      </section>

      {/* Berita dan Artikel */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Berita dan Artikel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="font-bold text-lg">Festival Budaya 2025</h3>
            <p className="text-gray-700">
              Festival budaya tahunan Desa Aliyan akan segera digelar!
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="font-bold text-lg">Peningkatan Infrastruktur</h3>
            <p className="text-gray-700">
              Program pembangunan jalan baru untuk kemudahan akses ke desa.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="font-bold text-lg">Pelatihan UMKM</h3>
            <p className="text-gray-700">
              Warga desa mengikuti pelatihan untuk meningkatkan usaha mikro.
            </p>
          </div>
        </div>
        <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition">
          Lihat Semua Berita
        </button>
      </section>

      {/* Galeri */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Galeri Foto</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/aliyan4.jpg" alt="Foto 1" className="rounded-lg shadow-md" />
          <img src="/aliyan5.jpg" alt="Foto 2" className="rounded-lg shadow-md" />
          <img src="/aliyan6.jpg" alt="Foto 3" className="rounded-lg shadow-md" />
          <img src="/aliyan1.jpg" alt="Foto 4" className="rounded-lg shadow-md" />
        </div>
        <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition">
          Lihat Galeri
        </button>
      </section>
    </div>
  );
}
