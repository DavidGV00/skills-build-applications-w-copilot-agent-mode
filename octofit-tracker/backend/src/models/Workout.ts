import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId
  name: string
  type: string
  duration: number
  caloriesBurned: number
  intensity: string
  date: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    name: {
      type: String,
      required: [true, 'Please provide a workout name'],
      trim: true,
      maxlength: [100, 'Workout name cannot be more than 100 characters']
    },
    type: {
      type: String,
      required: [true, 'Please provide a workout type'],
      enum: ['cardio', 'strength', 'flexibility', 'sports', 'other']
    },
    duration: {
      type: Number,
      required: [true, 'Please provide workout duration in minutes'],
      min: 1,
      max: 600
    },
    caloriesBurned: {
      type: Number,
      required: [true, 'Please provide calories burned'],
      min: 0
    },
    intensity: {
      type: String,
      required: [true, 'Please provide intensity level'],
      enum: ['low', 'moderate', 'high']
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot be more than 500 characters']
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IWorkout>('Workout', workoutSchema)
