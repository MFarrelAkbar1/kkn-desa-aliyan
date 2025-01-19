// app/berita/page.tsx
"use client";
import { useState, useEffect } from "react";
import Kartu from "../components/kartu";

interface BeritaItem {
  _id: string;
  nama: string;
  gambar: string;
  createdAt: string;
}

export default function BeritaPage() {
  const [berita, setBerita] = useState<BeritaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch("/api/berita");
        const data = await response.json();
        if (data.success) {
          setBerita(data.data);
        } else {
          setError(data.error || "Failed to fetch news");
        }
      } catch (error) {
        setError("Failed to load news");
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBerita();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Berita Desa Aliyan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {berita.map((item) => (
          <Kartu
            key={item._id}
            id={item._id}
            title={item.nama}
            imageSrc={item.gambar}
            date={item.createdAt}
            href={`/berita/${item._id}`}
          />
        ))}
      </div>
    </div>
  );
}