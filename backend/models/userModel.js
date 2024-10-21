import mongoose from "mongoose";
const scoreSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now  // Automatically takes the current date if not provided
    },
    score: {
        type: String,
        required: true  // Corrected 'require' to 'required'
    }
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    jobProfile: {
      type: String,
      require: true,
    },
    scoreData: {
      type: [scoreSchema],
      default: [],
    },
  },
  { minimize: false }
);

const userModel =
  mongoose.models.user || mongoose.model("userModel", userSchema);
export default userModel;
