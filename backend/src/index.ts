import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import terminalRoutes from './routes/terminal';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/terminal', terminalRoutes);
app.use('/api/ai', aiRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 