import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  team: { type: String, required: true },
  tournament: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;
