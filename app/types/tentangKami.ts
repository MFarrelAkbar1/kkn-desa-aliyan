// types/tentangKami.ts

export interface TentangKamiItem {
    _id?: string;
    judul: string;
    deskripsi: string;
    gambar: string;
    createdAt?: string;
  }
  
  export interface TentangKamiResponse {
    success: boolean;
    data?: TentangKamiItem[];
    error?: string;
  }