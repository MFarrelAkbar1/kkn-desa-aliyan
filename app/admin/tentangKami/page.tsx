"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TentangKamiItem {
  _id?: string;
  judul: string;
  deskripsi: string;
  gambar: string;
}

export default function AdminTentangKami() {
  const [items, setItems] = useState<TentangKamiItem[]>([]);
  const [newItem, setNewItem] = useState<TentangKamiItem>({
    judul: "",
    deskripsi: "",
    gambar: ""
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

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

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default');

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
        throw new Error('Cloudinary cloud name is missing');
      }

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const responseData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(responseData.error?.message || 'Upload failed');
      }

      return responseData.secure_url;
    } catch (error) {
      console.error("Detailed upload error:", error);
      throw new Error('Failed to upload image to Cloudinary');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      let imageUrl = newItem.gambar;
      
      if (selectedImage) {
        try {
          imageUrl = await handleImageUpload(selectedImage);
        } catch (error) {
          setError("Failed to upload image. Please try again.");
          return;
        }
      }

      const response = await fetch("/api/tentangKami", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newItem,
          gambar: imageUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewItem({
          judul: "",
          deskripsi: "",
          gambar: ""
        });
        setSelectedImage(null);
        await fetchItems();
      } else {
        throw new Error(data.error || 'Failed to save item');
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setError(error instanceof Error ? error.message : "Failed to save item");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin - Tentang Kami</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input
            type="text"
            value={newItem.judul}
            onChange={(e) => setNewItem({...newItem, judul: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            value={newItem.deskripsi}
            onChange={(e) => setNewItem({...newItem, deskripsi: e.target.value})}
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
            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
            className="w-full"
            required
          />
          {isUploading && (
            <p className="text-yellow-600 mt-2">Uploading image...</p>
          )}
          {newItem.gambar && (
            <div className="mt-2 flex justify-center">
              <img
                src={newItem.gambar}
                alt="Preview"
                className="max-w-xs rounded"
              />
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isUploading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Tambah Konten"}
        </button>
      </form>

      <div className="space-y-8">
        {items.map((item) => (
          <div key={item._id} className="border p-4 rounded">
            {/* Title - Justified */}
            <h2 className="text-xl font-semibold text-justify w-full mb-4">
              {item.judul}
            </h2>

            {/* Image - Centered */}
            {item.gambar && (
              <div className="w-full flex justify-center mb-4">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="max-w-md rounded"
                />
              </div>
            )}
            
            {/* Description - Justified */}
            <p className="text-justify w-full">
              {item.deskripsi}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}