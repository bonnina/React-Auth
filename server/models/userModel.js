const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Required!"],
      maxlength: [50, "Too Long!"],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Required!"],
    }
  }
);


module.exports = mongoose.model("User", UserSchema);