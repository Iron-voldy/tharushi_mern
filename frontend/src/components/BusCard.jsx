import { useNavigate } from 'react-router-dom';

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