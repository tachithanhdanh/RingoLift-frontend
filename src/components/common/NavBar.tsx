import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import {
  FiBell,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiTrendingUp,
  FiUser,
  FiUsers,
} from "react-icons/fi"; // Import icon từ React Icons
import "../../assets/styles/global.scss"; // Import file SCSS
import profileAvatar from "../../assets/images/avatar.png"; // Import avatar từ thư mục assets/img
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  // State quản lý toggle của dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout(); // Gọi hàm logout từ AuthContext
    navigate("/login"); // Chuyển về trang login sau khi logout
  };

  const handleToggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <Navbar expand="lg" className="navbar-custom py-2" fixed="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand
          href="#"
          className="fw-bold fs-3 text-uppercase"
          style={{ fontStyle: "italic", color: "#FF782D" }}
          onClick={() => navigate("/private/home")}
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
          <Link to="/private/learn">
            <Button variant="dark" className="mx-2">
              Learn
            </Button>
          </Link>
          <Link to="/private/vocabulary">
            <Button variant="dark" className="mx-2">
              Vocabulary
            </Button>
          </Link>
          <Link to="/private/stories">
            <Button variant="dark" className="mx-2">
              Stories
            </Button>
          </Link>
          <Link to="/private/mistakes">
            <Button variant="dark" className="mx-2">
              Mistakes
            </Button>
          </Link>

          {/* Notification Bell Icon */}
          <Nav.Link href="#notifications" className="text-dark px-3">
            <FiBell size={24} />
          </Nav.Link>

          {/* Profile Dropdown */}
          <Dropdown show={showDropdown} onToggle={() => {}}>
            <Dropdown.Toggle
              as="div"
              style={{ cursor: "pointer" }}
              onClick={handleToggleDropdown}
            >
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
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="bg-light shadow-sm">
              <Dropdown.Item onClick={() => navigate("/private/profile")}>
                <FiUser className="me-2" /> Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/private/friends")}>
                <FiUsers className="me-2" /> Friends
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/private/settings")}>
                <FiSettings className="me-2" /> Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/private/messages")}>
                <FiMessageSquare className="me-2" /> Messages
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/private/progress")}>
                <FiTrendingUp className="me-2" /> Progress
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                <FiLogOut className="me-2" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;