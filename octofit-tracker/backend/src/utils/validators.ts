export const validators = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  isValidAge: (age: number): boolean => {
    return age >= 1 && age <= 150
  },

  isValidWeight: (weight: number): boolean => {
    return weight >= 20 && weight <= 500
  },

  isValidHeight: (height: number): boolean => {
    return height >= 50 && height <= 300
  },

  isValidDuration: (duration: number): boolean => {
    return duration >= 1 && duration <= 600
  },

  isValidCalories: (calories: number): boolean => {
    return calories >= 0
  },

  isValidWorkoutType: (type: string): boolean => {
    const validTypes = ['cardio', 'strength', 'flexibility', 'sports', 'other']
    return validTypes.includes(type)
  },

  isValidIntensity: (intensity: string): boolean => {
    const validIntensities = ['low', 'moderate', 'high']
    return validIntensities.includes(intensity)
  },

  isValidGoal: (goal: string): boolean => {
    const validGoals = ['weight_loss', 'muscle_gain', 'endurance', 'general_fitness']
    return validGoals.includes(goal)
  }
}
