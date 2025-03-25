import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { login, reset } from '../store/slices/authSlice';

const LoginContainer = styled.div`
  max-width: 450px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #0052a3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  
  a {
    color: #0066cc;
    text-decoration: underline;
    
    &:hover {
      color: #0052a3;
    }
  }
`;

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <LoginContainer>
      <Title>
        <FaSignInAlt /> Login
      </Title>
      
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
            required
          />
        </FormGroup>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Form>
      
      <RegisterLink>
        Don't have an account? <a href="/register">Register</a>
      </RegisterLink>
    </LoginContainer>
  );
}

export default LoginPage;