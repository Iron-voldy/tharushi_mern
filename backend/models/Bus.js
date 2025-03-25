const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    operator: {
        type: String,
        required: true
    },
    departureLocation: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true,
        default: 40
    },
    availableSeats: [{
        seatNumber: {
            type: String,
            required: true
        },
        isBooked: {
            type: Boolean,
            default: false
        },
        price: {
            type: Number,
            required: true
        }
    }],
    busType: {
        type: String,
        enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
        required: true
    },
    amenities: [{
        type: String
    }],
    fare: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Bus = mongoose.model('Bus', busSchema);
module.exports = Bus;