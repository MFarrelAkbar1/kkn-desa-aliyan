// app/berita/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface BeritaDetail {
  _id: string;
  nama: string;
  gambar: string;
  deskripsi: string;
  createdAt: string;
}

export default function BeritaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [berita, setBerita] = useState<BeritaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/auth/check");
        setIsAdmin(response.ok);
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };
    checkAdmin();
  }, []);

  // Fetch berita detail
  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        const response = await fetch(`/api/berita?id=${params.id}`);
        const data = await response.json();
        
        if (data.success) {
          setBerita(data.data);
        } else {
          setError(data.error || "Failed to fetch news detail");
        }
      } catch (error) {
        setError("Failed to load news detail");
        console.error("Error fetching news detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBeritaDetail();
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this news item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/berita?id=${params.id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.success) {
        router.push("/berita");
      } else {
        setError(data.error || "Failed to delete news");
      }
    } catch (error) {
      setError("Failed to delete news item");
      console.error("Error deleting news:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !berita) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 text-center">{error || "News not found"}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Back Button at the top */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/berita")}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          ← Kembali ke Daftar Berita
        </button>
      </div>

      <div className="border p-4 rounded bg-white">
        {/* Title - Justified */}
        <h1 className="text-4xl font-semibold text-justify w-full mb-10">
          {berita.nama}
        </h1>

        {/* Date */}
        <p className="text-gray-600 mb-6 text-lg">
          {new Date(berita.createdAt).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        {/* Image - Centered */}
        <div className="w-full flex justify-center mb-10">
          <div className="relative" style={{ width: '100%', maxWidth: '600px' }}>
            <img
              src={berita.gambar}
              alt={berita.nama}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
        </div>

        {/* Content - Justified with larger text */}
        <div className="mb-8">
          <p className="text-2xl text-justify w-full whitespace-pre-wrap">
            {berita.deskripsi}
          </p>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => router.push(`/berita/edit/${params.id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}