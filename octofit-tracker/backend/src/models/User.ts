import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  age?: number
  weight?: number
  height?: number
  goal?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    age: {
      type: Number,
      min: 1,
      max: 150
    },
    weight: {
      type: Number,
      min: 20,
      max: 500
    },
    height: {
      type: Number,
      min: 50,
      max: 300
    },
    goal: {
      type: String,
      enum: ['weight_loss', 'muscle_gain', 'endurance', 'general_fitness'],
      default: 'general_fitness'
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IUser>('User', userSchema)
