import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = "mongodb+srv://ankithm103:0iu6VorXLXQtME8c@cluster222.rznyghb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster222";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

import tournamentsRouter from './routes/tournaments.js';
import paymentsRouter from './routes/payments.js';

// Basic route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Use routes
app.use('/api/tournaments', tournamentsRouter);
app.use('/api/payments', paymentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
