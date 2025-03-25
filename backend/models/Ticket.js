const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Bus'
    },
    seats: [{
        seatNumber: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['CONFIRMED', 'CANCELLED', 'PENDING'],
        default: 'CONFIRMED'
    },
    passengerDetails: [{
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true
        }
    }],
    ticketNumber: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

// Generate ticket number before saving
ticketSchema.pre('save', function(next) {
    if (!this.ticketNumber) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.ticketNumber = `TKT${year}${month}${random}`;
    }
    next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;