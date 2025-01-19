// C:\Users\HP VICTUS\Documents\GitHub\kkn-desa-aliyan\app\tentang\page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TentangKamiItem {
  _id?: string;
  judul: string;
  deskripsi: string;
  gambar: string;
}

export default function TentangKami() {
  const [items, setItems] = useState<TentangKamiItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [editingItem, setEditingItem] = useState<TentangKamiItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<TentangKamiItem>({
    judul: "",
    deskripsi: "",
    gambar: "/default-image.jpg"
  });

  const checkLogin = async () => {
    try {
      const response = await fetch("/api/auth/check");
      setIsLoggedIn(response.ok);
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/tentangKami");
      const data = await response.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    checkLogin();
    fetchItems();
  }, []);

  const handleImageUpload = async (file: File): Promise<string> => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "your_upload_preset");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) {
      setError("Please wait for image upload to complete");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (!formData.judul || !formData.deskripsi || !formData.gambar) {
        throw new Error("Please fill in all fields and upload an image");
      }

      const response = await fetch("/api/tentangKami", {
        method: editingItem ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingItem ? {
          ...formData,
          _id: editingItem._id
        } : formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          judul: "",
          deskripsi: "",
          gambar: "/default-image.jpg"
        });
        setEditingItem(null);
        setShowAdminForm(false);
        await fetchItems();
      } else {
        throw new Error(data.error || "Failed to save item");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save item";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/tentangKami?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchItems();
      } else {
        throw new Error(data.error || "Failed to delete item");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete item";
      setError(errorMessage);
    }
  };

  const handleEdit = (item: TentangKamiItem) => {
    setEditingItem(item);
    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi,
      gambar: item.gambar
    });
    setShowAdminForm(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setFormData(prev => ({ ...prev, gambar: imageUrl }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to upload image";
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold"></h1>
        {isLoggedIn && !showAdminForm && (
          <button
            onClick={() => setShowAdminForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Tambahkan Informasi
          </button>
        )}
      </div>

      {/* Admin Form */}
      {isLoggedIn && showAdminForm && (
        <div className="mb-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium mb-1">Judul</label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) => setFormData(prev => ({ ...prev, judul: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                value={formData.deskripsi}
                onChange={(e) => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gambar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
                required={!editingItem || !formData.gambar}
              />
              {formData.gambar && formData.gambar !== "/default-image.jpg" && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={formData.gambar}
                    alt="Preview"
                    className="max-w-sm rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={isLoading || isUploading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : editingItem ? "Update" : "Tambah"} Konten
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setFormData({
                    judul: "",
                    deskripsi: "",
                    gambar: "/default-image.jpg"
                  });
                  setShowAdminForm(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content List - Modified for new layout with smaller images */}
      <div className="space-y-8">
        {items.map((item) => (
          <div key={item._id} className="border p-4 rounded">
            {/* Title - Justified */}
            <h2 className="text-4xl font-semibold text-justify w-full mb-10">
              {item.judul}
            </h2>

            {/* Image - Centered and Smaller */}
            {item.gambar && item.gambar !== "/default-image.jpg" && (
              <div className="w-full flex justify-center mb-10">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  style={{ maxWidth: '600px', width: '100%', borderRadius: '8px' }}
                />
              </div>
            )}
            
            {/* Description - Justified */}
            <p className="text-2xl text-justify w-full mb-4">
              {item.deskripsi}
            </p>

            {/* Admin Controls */}
            {isLoggedIn && (
              <div className="mt-4 space-x-2 flex justify-end">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => item._id && handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}