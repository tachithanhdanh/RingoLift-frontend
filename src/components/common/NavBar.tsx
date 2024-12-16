import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { FiBell } from "react-icons/fi"; // Import icon từ React Icons
import "../../assets/styles/global.scss"; // Import file SCSS
import profileAvatar from "../../assets/images/avatar.png"; // Import avatar từ thư mục assets/img

const NavBar: React.FC = () => {
  return (
    <Navbar expand="lg" className="navbar-custom py-2" fixed="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand
          href="#"
          className="fw-bold fs-3 text-uppercase"
          style={{ fontStyle: "italic", color: "#FF782D" }}
        >
          ringolift
        </Navbar.Brand>

        {/* Search Form */}
        <Form className="d-flex ms-3">
          <FormControl
            type="search"
            placeholder="Search..."
            className="me-2"
            aria-label="Search"
            style={{ borderRadius: "8px", padding: "5px 10px" }}
          />
        </Form>

        {/* Nav Links */}
        <Nav className="ms-auto d-flex align-items-center">
          <Button variant="dark" className="mx-2">
            Learn
          </Button>
          <Button variant="dark" className="mx-2">
            Vocabulary
          </Button>
          <Button variant="dark" className="mx-2">
            Stories
          </Button>
          <Button variant="dark" className="mx-2">
            Mistakes
          </Button>

          {/* Notification Bell Icon */}
          <Nav.Link href="#notifications" className="text-dark px-3">
            <FiBell size={24} />
          </Nav.Link>

          {/* Profile Avatar */}
          <Nav.Link href="#profile">
            <img
              src={profileAvatar}
              alt="Profile Avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #444",
              }}
            />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
