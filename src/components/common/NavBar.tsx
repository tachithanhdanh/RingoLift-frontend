
import { Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import './NavLink.css';

const NavBar = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#FFECEC' }}>
      <Navbar.Brand href="#" 
      style={{
              fontFamily: 'Arial',
              fontSize: '48px',
              fontStyle: 'italic',
              fontWeight: '800',     
              color: '#FF782D',  
              paddingLeft: '60px',
            }}>
        ringolift
      </Navbar.Brand>
      <Form className="d-flex" style={{ paddingLeft: '60px' }}>
          <FormControl
            type="search"
            placeholder="Search..."
            className="me-2"
            aria-label="Search"
            style={{ borderRadius: '8px', padding: '5px 10px' }}
          />
        </Form>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Nav className="mx-auto" >
        <a href="#learn"  className="custom-nav-link">Learn</a>
        <a href="#vocabulary" className="custom-nav-link">Vocabulary</a>
        <a href="#stories" className="custom-nav-link">Stories</a>
        <a href="#mistakes" className="custom-nav-link">Mistakes</a>
      </Nav>
        <Nav>
          <Nav.Link href="#notifications" className="px-3">
            <i className="bi bi-bell" style={{ fontSize: '1.2rem', color: '#444' }}></i>
          </Nav.Link>
          <Nav.Link href="#profile">
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              style={{
                width: '98px',
                height: '98px',
                borderRadius: '50%',
                border: '2px solid #444'
              }}
            />
          </Nav.Link>
        </Nav>
    </Navbar>
  );
};

export default NavBar;
