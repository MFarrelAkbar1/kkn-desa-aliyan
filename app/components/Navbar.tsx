import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo_aliyan.png"
              alt="Logo Desa Aliyan"
              width={150} // Ukuran logo tetap besar
              height={150}
              className="cursor-pointer"
              priority
            />
          </Link>
        </div>

        {/* Navbar Links */}
        <ul className="flex space-x-8 text-lg font-medium">
          <li>
            <Link
              href="/"
              className="text-black hover:text-green-400 transition duration-300 px-4 py-2"
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link
              href="/tentang"
              className="text-black hover:text-green-400 transition duration-300 px-4 py-2"
            >
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link
              href="/galeri"
              className="text-black hover:text-green-400 transition duration-300 px-4 py-2"
            >
              Galeri
            </Link>
          </li>
          <li>
            <Link
              href="/berita"
              className="text-black hover:text-green-400 transition duration-300 px-4 py-2"
            >
              Berita/Artikel
            </Link>
          </li>
          <li>
            <Link
              href="/wisata"
              className="text-black hover:text-green-400 transition duration-300 px-4 py-2"
            >
              Wisata dan Atraksi
            </Link>
          </li>
          <li>
            <Link
              href="/produk"
              className="text-black hover:text-green-400 transition duration-300 px-4 py-2"
            >
              Produk Lokal
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="text-black hover:text-green-400 transition duration-300 px-4 py-2"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
