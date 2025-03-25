import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaBus, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { logout, reset } from '../store/slices/authSlice';

const HeaderContainer = styled.header`
  background-color: #0066cc;
  color: white;
  padding: 1rem 2rem;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: #e6f0ff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #e6f0ff;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: white;
  background: none;
  border: none;
  padding: 0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #e6f0ff;
  }
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">
          <FaBus /> EasyBus
        </Logo>

        <NavLinks>
          {user ? (
            <>
              <NavLink to="/">Home</NavLink>
              <Button onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <FaSignInAlt /> Login
              </NavLink>
              <NavLink to="/register">
                <FaUserPlus /> Register
              </NavLink>
            </>
          )}
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;