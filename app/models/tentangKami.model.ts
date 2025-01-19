// models/tentangKami.model.ts

import mongoose from "mongoose";

const TentangKamiSchema = new mongoose.Schema({
  judul: { 
    type: String, 
    required: [true, 'Judul is required'] 
  },
  deskripsi: { 
    type: String, 
    required: [true, 'Deskripsi is required'] 
  },
  gambar: { 
    type: String, 
    required: [true, 'Gambar is required'],
    default: '/default-image.jpg' // Provide a default image if needed
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  collection: 'tentangKami'
});

// Delete the model if it exists to prevent schema mismatch
if (mongoose.models.TentangKami) {
  delete mongoose.models.TentangKami;
}

const TentangKami = mongoose.model("TentangKami", TentangKamiSchema, "tentangKami");

export default TentangKami;