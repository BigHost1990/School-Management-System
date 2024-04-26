import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  contactDetails: {
    email: {
      type: String,
      required: true
    },
    phone: String,
    address: String
  },
  feesPaid: {
    type: Number,
    required: true
  },
  class: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    },
    name: {
      type: String
    }
  },
  role: {
    type: String,
    default: "Student"
},
},{ timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;

