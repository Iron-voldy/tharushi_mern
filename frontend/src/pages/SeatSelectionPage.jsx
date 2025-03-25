import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const BookingContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div``;

const RightSection = styled.div``;

const PassengerForm = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const FormTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  
  &:hover {
    background-color: #0052a3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const NoSeatsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-top: 2rem;
`;

function SeatSelectionPage() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useSelector((state) => state.auth);
  const { bus, isLoading: busLoading } = useSelector((state) => state.bus);
  const { ticket, isLoading: ticketLoading, isSuccess } = useSelector((state) => state.ticket);
  
  useEffect(() => {
    if (!user) {
      toast.error('Please log in to book tickets');
      navigate('/login');
    }
    
    dispatch(getBusDetails(busId));
  }, [dispatch, busId, user, navigate]);
  
  useEffect(() => {
    if (isSuccess && ticket) {
      navigate(`/confirmation/${ticket._id}`);
    }
  }, [isSuccess, ticket, navigate]);
  
  // Update passenger details when selected seats change
  useEffect(() => {
    // Create one passenger entry for each selected seat
    const newPassengerDetails = selectedSeats.map((seat, index) => ({
      name: '',
      age: '',
      gender: ''
    }));
    
    setPassengerDetails(newPassengerDetails);
  }, [selectedSeats]);
  
  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };
  
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengerDetails(updatedPassengers);
  };
  
  const calculateTotal = () => {
    if (!selectedSeats.length) return 0;
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };
  
  const validateForm = () => {
    for (const passenger of passengerDetails) {
      if (!passenger.name || !passenger.age || !passenger.gender) {
        return false;
      }
    }
    return true;
  };
  
  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Please fill all passenger details');
      return;
    }
    
    setIsSubmitting(true);
    
    const ticketData = {
      busId,
      seats: selectedSeats,
      totalAmount: calculateTotal(),
      passengerDetails
    };
    
    dispatch(bookTicket(ticketData))
      .unwrap()
      .then(() => {
        toast.success('Ticket booked successfully!');
        setIsSubmitting(false);
      })
      .catch((error) => {
        toast.error(error || 'Failed to book ticket');
        setIsSubmitting(false);
      });
  };
  
  if (busLoading) {
    return (
      <PageContainer>
        <div>Loading bus details...</div>
      </PageContainer>
    );
  }
  
  if (!bus) {
    return (
      <PageContainer>
        <div>Bus not found. Please try another bus.</div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Title>Select Your Seats - {bus.operator} ({bus.busNumber})</Title>
      
      <BookingContainer>
        <LeftSection>
          <SeatMap bus={bus} onSeatSelect={handleSeatSelect} />
          
          {selectedSeats.length > 0 ? (
            <PassengerForm>
              <FormTitle>Passenger Details</FormTitle>
              
              {passengerDetails.map((passenger, index) => (
                <div key={index}>
                  <h4>Passenger {index + 1} - Seat {selectedSeats[index].seatNumber}</h4>
                  
                  <FormGroup>
                    <Label>Name</Label>
                    <Input 
                      type="text" 
                      value={passenger.name} 
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      placeholder="Enter passenger name"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Age</Label>
                    <Input 
                      type="number" 
                      min="1"
                      max="120"
                      value={passenger.age} 
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      placeholder="Enter passenger age"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Gender</Label>
                    <Select
                      value={passenger.gender}
                      onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormGroup>
                </div>
              ))}
              
              <Button 
                onClick={handleSubmit} 
                disabled={!validateForm() || isSubmitting || ticketLoading}
              >
                {isSubmitting || ticketLoading ? 'Processing...' : 'Book Tickets'}
              </Button>
            </PassengerForm>
          ) : (
            <NoSeatsMessage>
              <h3>No seats selected</h3>
              <p>Please select seats from the seat map above to proceed with booking.</p>
            </NoSeatsMessage>
          )}
        </LeftSection>
        
        <RightSection>
          {bus && selectedSeats.length > 0 && (
            <BookingSummary 
              bus={bus}
              selectedSeats={selectedSeats}
              totalAmount={calculateTotal()}
            />
          )}
        </RightSection>
      </BookingContainer>
    </PageContainer>
  );
}

export default SeatSelectionPage;