const asyncHandler = require('express-async-handler');
const Ticket = require('../models/Ticket');
const Bus = require('../models/Bus');

// @desc    Search available buses
// @route   GET /api/tickets/search
// @access  Public
const searchBuses = asyncHandler(async (req, res) => {
    const { departureLocation, destination, date } = req.query;

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const buses = await Bus.find({
        departureLocation: { $regex: departureLocation, $options: 'i' },
        destination: { $regex: destination, $options: 'i' },
        departureTime: {
            $gte: startDate,
            $lte: endDate
        }
    });

    res.json(buses);
});

// @desc    Get bus details
// @route   GET /api/tickets/bus/:id
// @access  Public
const getBusDetails = asyncHandler(async (req, res) => {
    const bus = await Bus.findById(req.params.id);
    
    if (bus) {
        res.json(bus);
    } else {
        res.status(404);
        throw new Error('Bus not found');
    }
});

// @desc    Book tickets
// @route   POST /api/tickets/book
// @access  Private
const bookTicket = asyncHandler(async (req, res) => {
    const {
        busId,
        seats,
        totalAmount,
        passengerDetails
    } = req.body;

    const bus = await Bus.findById(busId);

    if (!bus) {
        res.status(404);
        throw new Error('Bus not found');
    }

    // Check if seats are available
    const unavailableSeats = seats.filter(seat => 
        bus.availableSeats.find(s => 
            s.seatNumber === seat.seatNumber && s.isBooked
        )
    );

    if (unavailableSeats.length > 0) {
        res.status(400);
        throw new Error('Some selected seats are no longer available');
    }

    // Create ticket
    const ticket = await Ticket.create({
        user: req.user._id,
        bus: busId,
        seats,
        totalAmount,
        passengerDetails
    });

    // Update seat availability
    for (const seat of seats) {
        const seatIndex = bus.availableSeats.findIndex(s => s.seatNumber === seat.seatNumber);
        if (seatIndex !== -1) {
            bus.availableSeats[seatIndex].isBooked = true;
        }
    }

    await bus.save();

    if (ticket) {
        res.status(201).json(ticket);
    } else {
        res.status(400);
        throw new Error('Invalid ticket data');
    }
});

// @desc    Get ticket details
// @route   GET /api/tickets/:id
// @access  Private
const getTicketDetails = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id).populate('bus');
    
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    // Check if ticket belongs to user
    if (ticket.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    res.json(ticket);
});

module.exports = {
    searchBuses,
    getBusDetails,
    bookTicket,
    getTicketDetails
};