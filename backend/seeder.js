const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bus = require('./models/Bus');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Sample bus data
const busData = [
  {
    busNumber: 'BUS001',
    operator: 'Express Travels',
    departureLocation: 'New York',
    destination: 'Boston',
    departureTime: new Date('2025-04-10T08:00:00'),
    arrivalTime: new Date('2025-04-10T12:00:00'),
    totalSeats: 40,
    availableSeats: generateSeats(40, 25),
    busType: 'AC',
    amenities: ['WiFi', 'Charging Point', 'Water Bottle'],
    fare: 35
  },
  {
    busNumber: 'BUS002',
    operator: 'City Link',
    departureLocation: 'New York',
    destination: 'Boston',
    departureTime: new Date('2025-04-10T10:00:00'),
    arrivalTime: new Date('2025-04-10T14:30:00'),
    totalSeats: 40,
    availableSeats: generateSeats(40, 30),
    busType: 'Non-AC',
    amenities: ['Water Bottle'],
    fare: 25
  },
  {
    busNumber: 'BUS003',
    operator: 'Luxury Lines',
    departureLocation: 'New York',
    destination: 'Boston',
    departureTime: new Date('2025-04-10T12:00:00'),
    arrivalTime: new Date('2025-04-10T16:00:00'),
    totalSeats: 40,
    availableSeats: generateSeats(40, 40),
    busType: 'AC',
    amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Toilet'],
    fare: 45
  },
  {
    busNumber: 'BUS004',
    operator: 'Night Rider',
    departureLocation: 'Boston',
    destination: 'New York',
    departureTime: new Date('2025-04-10T20:00:00'),
    arrivalTime: new Date('2025-04-11T00:30:00'),
    totalSeats: 40,
    availableSeats: generateSeats(40, 35),
    busType: 'Sleeper',
    amenities: ['WiFi', 'Charging Point', 'Blanket', 'Toilet'],
    fare: 50
  }
];

// Admin user
const userData = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'password123',
  phone: '1234567890',
  isAdmin: true
};

// Generate seat data
function generateSeats(total, available) {
  const seats = [];
  
  for (let i = 1; i <= total; i++) {
    const seatNumber = i < 10 ? `0${i}` : `${i}`;
    
    seats.push({
      seatNumber,
      isBooked: i > available, // Mark some seats as booked
      price: Math.floor(Math.random() * 10) + 20 // Random price between 20-30
    });
  }
  
  return seats;
}

// Import data function
const importData = async () => {
  try {
    // Clear existing data
    await Bus.deleteMany();
    await User.deleteMany();
    
    // Import sample data
    await Bus.insertMany(busData);
    await User.create(userData);
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the import
importData();