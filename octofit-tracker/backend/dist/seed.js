import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import { Activity } from './models/activity.js';
import { LeaderboardEntry } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';
// Seed the octofit_db database with test data.
async function seed() {
    await connectDatabase();
    await Promise.all([
        Activity.deleteMany({}),
        LeaderboardEntry.deleteMany({}),
        User.deleteMany({}),
        Team.deleteMany({}),
        Workout.deleteMany({}),
    ]);
    const teams = await Team.insertMany([
        { name: 'North Stars', description: 'Early-morning runners and walkers' },
        { name: 'Iron Octos', description: 'Strength training and consistency crew' },
    ]);
    const users = await User.insertMany([
        {
            displayName: 'Ava Carter',
            email: 'ava.carter@mergington.edu',
            teamId: teams[0]._id,
            points: 145,
        },
        {
            displayName: 'Noah Bennett',
            email: 'noah.bennett@mergington.edu',
            teamId: teams[0]._id,
            points: 120,
        },
        {
            displayName: 'Mia Flores',
            email: 'mia.flores@mergington.edu',
            teamId: teams[1]._id,
            points: 162,
        },
        {
            displayName: 'Ethan Brooks',
            email: 'ethan.brooks@mergington.edu',
            teamId: teams[1]._id,
            points: 108,
        },
    ]);
    teams[0].captainId = users[0]._id;
    teams[1].captainId = users[2]._id;
    await Promise.all([teams[0].save(), teams[1].save()]);
    await Activity.insertMany([
        {
            userId: users[0]._id,
            activityType: 'run',
            durationMinutes: 28,
            points: 40,
            notes: 'Neighborhood loop before school',
        },
        {
            userId: users[1]._id,
            activityType: 'walk',
            durationMinutes: 45,
            points: 25,
            notes: 'Lunchtime mile challenge',
        },
        {
            userId: users[2]._id,
            activityType: 'strength',
            durationMinutes: 35,
            points: 55,
            notes: 'Upper-body circuit with coach notes',
        },
        {
            userId: users[3]._id,
            activityType: 'run',
            durationMinutes: 22,
            points: 38,
            notes: 'Track intervals after class',
        },
    ]);
    await LeaderboardEntry.insertMany([
        {
            entityType: 'team',
            entityId: teams[1]._id,
            period: 'monthly',
            score: 270,
            rank: 1,
        },
        {
            entityType: 'team',
            entityId: teams[0]._id,
            period: 'monthly',
            score: 235,
            rank: 2,
        },
        {
            entityType: 'user',
            entityId: users[2]._id,
            period: 'monthly',
            score: 162,
            rank: 1,
        },
        {
            entityType: 'user',
            entityId: users[0]._id,
            period: 'monthly',
            score: 145,
            rank: 2,
        },
    ]);
    await Workout.insertMany([
        {
            name: 'Cardio Builder',
            focusArea: 'Endurance',
            difficulty: 'beginner',
            description: 'A simple starter routine for building a weekly habit.',
        },
        {
            name: 'Tempo Sprint Mix',
            focusArea: 'Speed',
            difficulty: 'intermediate',
            description: 'Short bursts for students ready to push pace safely.',
        },
        {
            name: 'Full-Body Power Set',
            focusArea: 'Strength',
            difficulty: 'advanced',
            description: 'Compound movement circuit for experienced athletes.',
        },
    ]);
    console.log('Seeded OctoFit demo data successfully.');
}
seed()
    .catch((error) => {
    console.error('Failed to seed OctoFit demo data:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose.connection.close();
});
