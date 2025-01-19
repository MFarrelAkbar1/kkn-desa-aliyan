// models/berita.model.ts
import mongoose from 'mongoose';

const BeritaSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  gambar: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Berita = mongoose.models.Berita || mongoose.model('Berita', BeritaSchema);
export default Berita;