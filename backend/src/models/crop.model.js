import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  harvestDate: {
    type: Date,
    default: Date.now,
  },
  deliveryAvailable: {
    type: Boolean,
    default: false,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  perQuintalPrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model("Crop", cropSchema);
