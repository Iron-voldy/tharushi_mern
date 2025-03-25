import styled from 'styled-components';
import { FaBus, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #0d2654;
  color: white;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 30px;
    height: 2px;
    background-color: #0066cc;
  }
`;

const FooterText = styled.p`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const FooterLink = styled.a`
  color: #ccc;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #1a3a6c;
  color: #ccc;
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <LogoContainer>
            <FaBus /> EasyBus
          </LogoContainer>
          <FooterText>
            Your trusted partner for easy and comfortable bus travel. Book your
            journey with us today!
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
          <FooterLink href="/terms">Terms & Conditions</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact Info</FooterTitle>
          <FooterLink href="tel:+1234567890">
            <FaPhone /> +1 (234) 567-890
          </FooterLink>
          <FooterLink href="mailto:info@easybus.com">
            <FaEnvelope /> info@easybus.com
          </FooterLink>
          <FooterLink href="#">
            <FaMapMarkerAlt /> 123 Bus Street, Transport City
          </FooterLink>
        </FooterSection>
      </FooterContent>

      <Copyright>
        &copy; {new Date().getFullYear()} EasyBus. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;