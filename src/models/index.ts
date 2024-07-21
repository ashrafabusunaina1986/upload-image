import { model, models, Schema } from "mongoose";

const fileSchema = new Schema({
  filename: String,
  url: String,
});

const Images = models.Images || model("Images", fileSchema);
export default Images;
