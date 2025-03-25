import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
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
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  grid-column: 1 / -1;
  &:hover {
    background-color: #0052a3;
  }
`;

function SearchBar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    departureLocation: '',
    destination: '',
    date: '',
  });

  const { departureLocation, destination, date } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/buses?from=${departureLocation}&to=${destination}&date=${date}`
    );
  };

  return (
    <SearchContainer>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="departureLocation">From</Label>
          <Input
            type="text"
            id="departureLocation"
            name="departureLocation"
            value={departureLocation}
            onChange={onChange}
            placeholder="Enter departure city"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="destination">To</Label>
          <Input
            type="text"
            id="destination"
            name="destination"
            value={destination}
            onChange={onChange}
            placeholder="Enter destination city"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={onChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </FormGroup>
        <Button type="submit">Search Buses</Button>
      </Form>
    </SearchContainer>
  );
}

export default SearchBar;