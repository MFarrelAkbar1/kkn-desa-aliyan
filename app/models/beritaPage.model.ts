// models/beritaPage.model.ts
import mongoose from 'mongoose';

const BeritaPageSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  gambar: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BeritaPage = mongoose.models.BeritaPage || mongoose.model('BeritaPage', BeritaPageSchema);
export default BeritaPage;