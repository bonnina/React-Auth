const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const SocialSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Required!"],
      maxlength: [50, "Too Long!"],
      unique: true,
      trim: true
    }
  }
);


module.exports = mongoose.model("Social", SocialSchema);