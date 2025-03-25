import styled from 'styled-components';
import SearchBar from '../components/SearchBar';

const HomeContainer = styled.div`
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/images/bus-hero.jpg') center/cover no-repeat;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  color: white;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  max-width: 600px;
`;

function HomePage() {
  return (
    <HomeContainer>
      <Title>Book Your Bus Tickets Online</Title>
      <Subtitle>
        Search, compare, and book bus tickets from anywhere, anytime. Travel
        comfortably with our trusted bus partners.
      </Subtitle>
      <SearchBar />
    </HomeContainer>
  );
}

export default HomePage;