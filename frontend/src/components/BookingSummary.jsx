import styled from 'styled-components';
import { FaBus, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const SummaryContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  color: #333;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 1rem;
  text-transform: uppercase;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #333;

  svg {
    color: #0066cc;
  }
`;

const SeatList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Seat = styled.div`
  background-color: #e6f0ff;
  color: #0066cc;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 500;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
`;

function BookingSummary({ bus, selectedSeats, totalAmount }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SummaryContainer>
      <Title>Booking Summary</Title>

      <Section>
        <SectionTitle>Bus Details</SectionTitle>
        <InfoRow>
          <FaBus />
          {bus.operator} - {bus.busNumber}
        </InfoRow>
        <InfoRow>
          <FaMapMarkerAlt />
          {bus.departureLocation} to {bus.destination}
        </InfoRow>
        <InfoRow>
          <FaClock />
          {formatDate(bus.departureTime)} at {formatTime(bus.departureTime)}
        </InfoRow>
      </Section>

      <Section>
        <SectionTitle>Selected Seats</SectionTitle>
        <SeatList>
          {selectedSeats.map((seat) => (
            <Seat key={seat.seatNumber}>{seat.seatNumber}</Seat>
          ))}
        </SeatList>
      </Section>

      <TotalAmount>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </TotalAmount>
    </SummaryContainer>
  );
}

export default BookingSummary;