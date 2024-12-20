import mongoose from "mongoose";

// Define the question schema
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
});

// Define the score schema
const scoreSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  jobProfile: {
    type: String,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
});

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    scoreData: {
      type: [scoreSchema],
      default: [],
    },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("userModel", userSchema);
export default userModel;
