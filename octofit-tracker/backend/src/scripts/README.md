# 🌱 OctoFit Tracker Database Scripts

Utility scripts for managing the OctoFit Tracker MongoDB database.

## 📂 Scripts

### Seed Database
Initialize the database with sample data (5 users and 12 workouts).

```bash
npm run seed
```

**Creates:**
- 5 sample users with different fitness goals
- 12 sample workouts across different types and intensities
- Workout data spanning multiple days

**Sample Users:**
1. Alice Johnson - Muscle Gain
2. Bob Smith - Weight Loss
3. Carol Davis - Endurance
4. David Wilson - General Fitness
5. Emma Taylor - Muscle Gain

### Reset Database
Delete all data from the database (caution!).

```bash
npm run reset
```

⚠️ **WARNING:** This permanently deletes all users and workouts.

## 📊 Seed Data Overview

### Users (5 total)
- Alice Johnson: age 28, weight 65kg, height 170cm
- Bob Smith: age 35, weight 85kg, height 180cm
- Carol Davis: age 31, weight 60kg, height 165cm
- David Wilson: age 26, weight 72kg, height 175cm
- Emma Taylor: age 29, weight 58kg, height 162cm

### Workouts (12 total)
- **Cardio**: Running, Cycling, Swimming (5 workouts)
- **Strength**: Gym sessions, Leg training (4 workouts)
- **Flexibility**: Yoga, Pilates (2 workouts)
- **Sports**: Basketball (1 workout)

## 🎯 Usage Examples

### Step 1: Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or if installed locally
mongod
```

### Step 2: Seed the Database
```bash
cd backend
npm install
npm run seed
```

### Step 3: Start the Server
```bash
npm run dev
```

### Step 4: Test API Endpoints
```bash
# Get all users
curl http://localhost:8000/api/users

# Get all workouts
curl http://localhost:8000/api/workouts

# Get first user's workouts (replace USER_ID)
curl http://localhost:8000/api/workouts/user/USER_ID

# Get first user's statistics
curl http://localhost:8000/api/workouts/stats/user/USER_ID
```

## 📈 Seed Data Statistics

- **Total Users**: 5
- **Total Workouts**: 12
- **Total Calories Burned**: 4,630 kcal
- **Total Duration**: 538 minutes
- **Average Workout Duration**: 44.83 minutes

## 🔄 Workflow

1. **Development**: Use `npm run seed` to populate test data
2. **Testing**: Run API tests against the seeded database
3. **Reset**: Use `npm run reset` to clear and reseed as needed

## 📝 Notes

- Seed data includes realistic dates (past 3 days)
- Workouts are distributed across different types and intensities
- Each user has 2-3 workouts for testing aggregation features
- All sample data is removed when resetting

## 🚀 Next Steps

After seeding:
1. Open [http://localhost:8000/api/users](http://localhost:8000/api/users) to see all users
2. Test CRUD operations with the seeded data
3. Use GraphQL explorer to query relationships
4. Verify statistics calculations
