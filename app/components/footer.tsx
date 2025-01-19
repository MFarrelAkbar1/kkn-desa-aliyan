import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        {/* Logo Desa Aliyan */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo_aliyan.png"
            alt="Logo Desa Aliyan"
            width={180} // Ukuran logo lebih besar
            height={180}
            className="rounded-full"
          />
        </div>

        {/* Informasi Kontak */}
        <p className="mb-2 text-lg font-bold">Desa Aliyan</p>
        <p className="text-sm">
          Alamat: Jl. Desa Aliyan No. 123, Kecamatan X, Kabupaten Y
        </p>
        <p className="text-sm">Email: info@desaaliyan.com | Telepon: (021) 123-4567</p>

        {/* Link Media Sosial */}
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            Twitter
          </a>
        </div>

        {/* Hak Cipta */}
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} Desa Aliyan. Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
}
