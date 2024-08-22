import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js'; // Update the path as needed
import Room from './models/Room.js';
import User from './models/User.js';

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

const createHotels = async () => {
    const hotels = [];
    for (let i = 1; i <= 20; i++) {
        hotels.push(
            new Hotel({
                name: `Hotel ${i}`,
                type: i % 2 === 0 ? 'resort' : 'hotel',
                city: 'City' + i,
                address: 'Address' + i,
                distance: `${Math.floor(Math.random() * 1000)}m`,
                photos: ['photo1.jpg', 'photo2.jpg'],
                title: `Title of Hotel ${i}`,
                desc: `Description of Hotel ${i}`,
                rating: Math.random() * 5,
                rooms: [],
                cheapestPrice: Math.floor(Math.random() * 500) + 50,
                featured: i % 3 === 0,
            })
        );
    }
    return await Hotel.insertMany(hotels);
};

const createRooms = async () => {
    const rooms = [];
    for (let i = 1; i <= 50; i++) {
        rooms.push(
            new Room({
                title: `Room ${i}`,
                price: Math.floor(Math.random() * 200) + 50,
                maxPeople: Math.floor(Math.random() * 4) + 1,
                desc: `Description of Room ${i}`,
                roomNumbers: [{ number: i, unavailableDates: [] }],
            })
        );
    }
    return await Room.insertMany(rooms);
};

const createUsers = async () => {
    const users = [
        {
            username: 'user1',
            email: 'user1@example.com',
            country: 'Country1',
            city: 'City1',
            phone: '1234567890',
            password: 'hashedPassword1',
            isAdmin: true,
        },
        {
            username: 'user2',
            email: 'user2@example.com',
            country: 'Country2',
            city: 'City2',
            phone: '1234567891',
            password: 'hashedPassword2',
            isAdmin: false,
        },
        {
            username: 'user3',
            email: 'user3@example.com',
            country: 'Country3',
            city: 'City3',
            phone: '1234567892',
            password: 'hashedPassword3',
            isAdmin: false,
        },
    ];
    return await User.insertMany(users);
};

const seedDatabase = async () => {
    await connect();
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    await User.deleteMany({});
    const createdHotels = await createHotels();
    const createdRooms = await createRooms();
    await createUsers();

    // Associate rooms with hotels
    for (let i = 0; i < createdHotels.length; i++) {
        const hotel = createdHotels[i];
        hotel.rooms = createdRooms.slice(i * 2, i * 2 + 2).map((room) => room._id);
        await hotel.save();
    }

    console.log('Database seeded successfully');
    mongoose.connection.close();
};

seedDatabase();
