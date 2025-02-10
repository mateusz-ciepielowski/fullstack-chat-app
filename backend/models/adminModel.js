import mongoose, { mongo } from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, maxLength: 32, unique: true },
    password: { type: String, required: true, minLength: 8 },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admin", AdminSchema);

export default AdminModel;
