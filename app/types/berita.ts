// types/berita.ts
export interface BeritaItem {
    _id?: string;
    nama: string;
    gambar: string;
    createdAt?: string;
  }
  
  export interface BeritaPageItem extends BeritaItem {
    deskripsi: string;
  }
  
  export interface BeritaResponse {
    success: boolean;
    data?: BeritaItem[] | BeritaItem;
    error?: string;
  }
  
  export interface BeritaPageResponse {
    success: boolean;
    data?: BeritaPageItem[] | BeritaPageItem;
    error?: string;
  }