import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import BusSelectionPage from './pages/BusSelectionPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/buses" element={<BusSelectionPage />} />
            <Route path="/select-seat/:busId" element={<SeatSelectionPage />} />
            <Route path="/confirmation/:ticketId" element={<BookingConfirmationPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;