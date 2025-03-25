import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';

const SeatMapContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const BusLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2rem 0;
`;

// Using attrs to filter out custom props
const Seat = styled.button.attrs(props => ({
  disabled: props.isBooked
}))`
  width: 50px;
  height: 50px;
  border: 2px solid ${({ isSelected, isBooked }) =>
    isBooked ? '#ff4d4d' : isSelected ? '#0066cc' : '#ddd'};
  background-color: ${({ isSelected, isBooked }) =>
    isBooked ? '#ffe6e6' : isSelected ? '#e6f0ff' : 'white'};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ isBooked }) => (isBooked ? 'not-allowed' : 'pointer')};
  color: ${({ isBooked }) => (isBooked ? '#ff4d4d' : '#333')};
  font-weight: 500;

  &:hover {
    background-color: ${({ isBooked }) => !isBooked && '#f0f0f0'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Legend = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

// Using attrs for legend items as well to handle color and bgColor props
const LegendItem = styled.div.attrs(() => ({}))`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    width: 20px;
    height: 20px;
    border: 2px solid ${({ color }) => color};
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 3px;
  }
`;

function SeatMap({ bus, onSeatSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Hardcoded URL instead of using environment variables
    const newSocket = io('http://localhost:5173');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('seat_selected', (data) => {
      if (data.busId === bus._id) {
        // Update the bus seat status in your state
        // This should be handled through Redux in a real application
        console.log('Seat selected by another user:', data);
      }
    });

    return () => {
      socket.off('seat_selected');
    };
  }, [socket, bus._id]);

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    const isSeatSelected = selectedSeats.find(
      (s) => s.seatNumber === seat.seatNumber
    );

    let newSelectedSeats;
    if (isSeatSelected) {
      newSelectedSeats = selectedSeats.filter(
        (s) => s.seatNumber !== seat.seatNumber
      );
    } else {
      newSelectedSeats = [...selectedSeats, seat];
    }

    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats);

    if (socket) {
      socket.emit('select_seat', {
        busId: bus._id,
        seatNumber: seat.seatNumber,
        isSelected: !isSeatSelected,
      });
    }
  };

  return (
    <SeatMapContainer>
      <Legend>
        <LegendItem color="#ddd" bgColor="white">
          <span></span>
          Available
        </LegendItem>
        <LegendItem color="#0066cc" bgColor="#e6f0ff">
          <span></span>
          Selected
        </LegendItem>
        <LegendItem color="#ff4d4d" bgColor="#ffe6e6">
          <span></span>
          Booked
        </LegendItem>
      </Legend>
      <BusLayout>
        {bus.availableSeats.map((seat) => (
          <Seat
            key={seat.seatNumber}
            isSelected={selectedSeats.some(
              (s) => s.seatNumber === seat.seatNumber
            )}
            isBooked={seat.isBooked}
            onClick={() => handleSeatClick(seat)}
            // No need to add disabled here as it's handled by styled-components attrs
          >
            {seat.seatNumber}
          </Seat>
        ))}
      </BusLayout>
    </SeatMapContainer>
  );
}

export default SeatMap;