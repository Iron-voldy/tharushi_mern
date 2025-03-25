import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBus, FaWifi, FaPlug, FaToilet } from 'react-icons/fa';

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const BusInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const BusDetails = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  p {
    margin: 0;
    color: #666;
  }
`;

const Time = styled.div`
  text-align: center;
  p {
    margin: 0;
    &:first-child {
      font-weight: bold;
      color: #333;
    }
    &:last-child {
      color: #666;
      font-size: 0.9rem;
    }
  }
`;

const Price = styled.div`
  text-align: center;
  h4 {
    margin: 0 0 0.5rem 0;
    color: #0066cc;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0052a3;
  }
`;

const Amenities = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  color: #666;
  svg {
    font-size: 1.2rem;
  }
`;

function BusCard({ bus }) {
  const navigate = useNavigate();
  const {
    _id,
    operator,
    busNumber,
    busType,
    departureTime,
    arrivalTime,
    fare,
    amenities,
  } = bus;

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <FaWifi title="WiFi" />;
      case 'charging point':
        return <FaPlug title="Charging Point" />;
      case 'toilet':
        return <FaToilet title="Toilet" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <BusInfo>
        <BusDetails>
          <h3>{operator}</h3>
          <p>
            {busType} • {busNumber}
          </p>
        </BusDetails>
        <Time>
          <p>{formatTime(departureTime)}</p>
          <p>Departure</p>
        </Time>
        <Time>
          <p>{formatTime(arrivalTime)}</p>
          <p>Arrival</p>
        </Time>
        <Price>
          <h4>${fare}</h4>
          <Button onClick={() => navigate(`/select-seat/${_id}`)}>
            Select Seats
          </Button>
        </Price>
      </BusInfo>
      <Amenities>
        <FaBus />
        {amenities.map((amenity, index) => (
          <span key={index}>{getAmenityIcon(amenity)}</span>
        ))}
      </Amenities>
    </Card>
  );
}

export default BusCard;