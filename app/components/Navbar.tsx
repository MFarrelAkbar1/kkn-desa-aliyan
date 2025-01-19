"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // Function to check login status and get username from JWT
  const checkLogin = async () => {
    try {
      const response = await fetch("/api/auth/check", {
        method: "GET",
      });
      const data = await response.json();
      setIsLoggedIn(response.ok);
      if (data.username) {
        setUsername(data.username);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  // Custom event handler for login success
  const handleLoginSuccess = (event: CustomEvent) => {
    setIsLoggedIn(true);
    if (event.detail?.username) {
      setUsername(event.detail.username);
    }
  };

  useEffect(() => {
    checkLogin();
    window.addEventListener('login-success', handleLoginSuccess as EventListener);
    return () => {
      window.removeEventListener('login-success', handleLoginSuccess as EventListener);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setIsLoggedIn(false);
      setUsername("");
      setShowDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo_aliyan.svg"
              alt="Logo Desa Aliyan"
              width={200}
              height={200}
              className="cursor-pointer"
              priority
            />
          </Link>

          {/* Navigation and Profile Section */}
          <div className="flex items-center space-x-10">
            {/* Navigation Links */}
            <div className="flex items-center space-x-10">
              <Link href="/" className="text-black hover:text-green-400 py-2">
                🏠︎ Beranda
              </Link>
              <Link href="/tentang" className="text-black hover:text-green-400 py-2">
                ✎ Tentang Kami
              </Link>
              <Link href="/galeri" className="text-black hover:text-green-400 py-2">
                📽️ Galeri
              </Link>
              <Link href="/berita" className="text-black hover:text-green-400 py-2">
                📰 Berita/Artikel
              </Link>
              <Link href="/wisata" className="text-black hover:text-green-400 py-2">
                🛖 Wisata dan Atraksi
              </Link>
              <Link href="/produk" className="text-black hover:text-green-400 py-2">
                🔗 Produk Lokal
              </Link>

              {/* Admin Profile or Login */}
              {isLoggedIn ? (
                <div className="relative flex items-center">
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <Image
                      src="/default.png"
                      alt="Admin Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="font-semibold">{username}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow-lg w-40 z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="text-black hover:text-green-400 py-2">
                  🔑 Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;