import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaCheckCircle, FaBus, FaMapMarkerAlt, FaClock, FaTicketAlt } from 'react-icons/fa';
import { getTicketDetails } from '../store/slices/ticketSlice';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const ConfirmationCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: #28a745;
`;

const Icon = styled(FaCheckCircle)`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const Section = styled.div`
  margin: 2rem 0;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
`;

const Label = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  color: #333;
  font-weight: 500;
`;

const Button = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 2rem;

  &:hover {
    background: #0052a3;
  }
`;

const SeatsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Seat = styled.div`
  background: #e6f0ff;
  color: #0066cc;
  padding: 0.5rem;
  border-radius: 4px;
  font-weight: 500;
`;

function BookingConfirmationPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticket, isLoading, isError } = useSelector((state) => state.ticket);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getTicketDetails(ticketId));
  }, [dispatch, ticketId, user, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !ticket) {
    return <div>Error loading ticket details</div>;
  }

  return (
    <PageContainer>
      <ConfirmationCard>
        <Header>
          <Icon />
          <Title>Booking Confirmed!</Title>
          <Subtitle>Your ticket has been booked successfully</Subtitle>
        </Header>

        <Section>
          <SectionTitle>
            <FaTicketAlt /> Ticket Details
          </SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Ticket Number</Label>
              <Value>{ticket.ticketNumber}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Booking Date</Label>
              <Value>{formatDate(ticket.createdAt)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Number of Seats</Label>
              <Value>{ticket.seats.length}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Total Amount</Label>
              <Value>${ticket.totalAmount}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitle>
            <FaBus /> Bus Details
          </SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Bus Operator</Label>
              <Value>{ticket.bus.operator}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Bus Type</Label>
              <Value>{ticket.bus.busType}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Bus Number</Label>
              <Value>{ticket.bus.busNumber}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Selected Seats</Label>
              <SeatsList>
                {ticket.seats.map((seat) => (
                  <Seat key={seat.seatNumber}>{seat.seatNumber}</Seat>
                ))}
              </SeatsList>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitle>
            <FaMapMarkerAlt /> Journey Details
          </SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>From</Label>
              <Value>{ticket.bus.departureLocation}</Value>
            </InfoItem>
            <InfoItem>
              <Label>From</Label>
              <Value>{ticket.bus.departureLocation}</Value>
            </InfoItem>
            <InfoItem>
              <Label>To</Label>
              <Value>{ticket.bus.destination}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Date</Label>
              <Value>{formatDate(ticket.bus.departureTime)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Time</Label>
              <Value>{formatTime(ticket.bus.departureTime)}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Button onClick={() => navigate('/')}>
          Book Another Journey
        </Button>
      </ConfirmationCard>
    </PageContainer>
  );
}

export default BookingConfirmationPage;