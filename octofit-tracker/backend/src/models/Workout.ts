import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  duration: number; // in minutes
  intensity: 'low' | 'medium' | 'high';
  caloriesBurned: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema: Schema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      required: true
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    caloriesBurned: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
