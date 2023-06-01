import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useEth } from '../../contexts/EthContext';

function NavEle() {
  const {state:{accounts}} = useEth();
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">VIDEO CRATE</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-links" >Home</Nav.Link>
            
            <Nav.Link as={Link} to="/update" className="nav-links">Verification</Nav.Link>
            <NavDropdown title="Permissions" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/request-permission" className="nav-links">Request Permission</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/grant-permission" className="nav-links">
              Grant Permission
              </NavDropdown.Item>
              
            </NavDropdown>
            <NavDropdown title="Attestation" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/request-attestation" className="nav-links" >Request Attestation</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/grant-attestation" className="nav-links" >
              Grant Attestation
              </NavDropdown.Item>          
            </NavDropdown>
            <Nav.Link as={Link} to="/explore" className="nav-links" >Explore</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">{accounts}</Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavEle;