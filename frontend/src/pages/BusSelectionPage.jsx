import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { searchBuses } from '../store/slices/busSlice';
import BusCard from '../components/BusCard';
import SearchBar from '../components/SearchBar';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchBarContainer = styled.div`
  margin-bottom: 2rem;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
`;

const ResultsCount = styled.span`
  color: #666;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

function BusSelectionPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { buses, isLoading, isError, message } = useSelector(
    (state) => state.bus
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchData = {
      departureLocation: params.get('from'),
      destination: params.get('to'),
      date: params.get('date'),
    };

    dispatch(searchBuses(searchData));
  }, [dispatch, location.search]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <PageContainer>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>

      <ResultsHeader>
        <Title>Available Buses</Title>
        <ResultsCount>{buses.length} buses found</ResultsCount>
      </ResultsHeader>

      <ResultsContainer>
        {buses.length > 0 ? (
          buses.map((bus) => <BusCard key={bus._id} bus={bus} />)
        ) : (
          <NoResults>
            No buses found for the selected route and date. Please try different
            dates or routes.
          </NoResults>
        )}
      </ResultsContainer>
    </PageContainer>
  );
}

export default BusSelectionPage;