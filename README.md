# 🚌 EasyBus - Bus Ticket Booking System

## 📋 Overview

EasyBus is a modern web application for booking bus tickets online. This application simplifies the bus booking process by allowing users to view available buses, select their preferred seats, and book tickets easily.

## ✨ Key Features

- 🔍 **Search for Buses**: Find buses by specifying departure location, destination, and travel date
- 👀 **View Available Seats**: Interactive seat map showing available and booked seats
- 🪑 **Select Seats**: Choose preferred seats with real-time updates
- 🎫 **Book Tickets Online**: Complete the booking process by entering passenger details
- 👤 **User Authentication**: Secure login and registration system
- 🔄 **Real-time Updates**: Socket.io integration for real-time seat availability updates

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io

### Frontend
- React (Vite)
- Redux Toolkit
- React Router
- Styled Components
- Socket.io Client

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/easybus.git
   cd easybus
   ```

2. **Set up backend**
   ```
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory with the following content:
   ```
   NODE_ENV=development
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

3. **Set up frontend**
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```
   cd frontend
   npm run dev
   ```

3. **Seed the database (optional)**
   ```
   cd backend
   node seeder.js
   ```

4. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 📱 Usage Guide

1. **Register/Login**: Create an account or log in with existing credentials
2. **Search for Buses**: Enter departure location, destination, and date
3. **Select Bus**: Choose from available buses on the selected route
4. **Select Seats**: Pick your preferred seats from the seat map
5. **Enter Passenger Details**: Fill in passenger information for each seat
6. **Book Tickets**: Confirm your booking
7. **View Booking Confirmation**: Get booking confirmation with ticket details

## 📝 Project Structure

```
easybus/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Express middlewares
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── .env            # Environment variables
│   ├── server.js       # Express app
│   └── seeder.js       # Database seeder
│
└── frontend/
    ├── public/         # Static files
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── pages/      # Page components
    │   ├── services/   # API services
    │   ├── store/      # Redux store and slices
    │   ├── App.jsx     # Main app component
    │   └── main.jsx    # Entry point
    └── vite.config.js  # Vite configuration
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Secure user data handling

## 👨‍💻 Contributors

- [Your Name](https://github.com/yourusername)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React Icons](https://react-icons.github.io/react-icons/) for the beautiful icons
- [Styled Components](https://styled-components.com/) for the styling solution
- [Socket.io](https://socket.io/) for real-time functionality

---

⭐ Star this repository if you find it useful! 🚌
