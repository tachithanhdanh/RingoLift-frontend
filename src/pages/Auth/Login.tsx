import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import LearningIllustration from "../../assets/images/register-learning.png";
import { useAuth } from "../../hooks/useAuth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginRequest = { username, password };
      const userData = await loginUser(loginRequest); // Gọi API đăng nhập
      login(userData); // Lưu thông tin người dùng vào context
      navigate("/private/home"); // Điều hướng tới trang chính
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center bg-light">
      <Row className="w-100">
        <Col md={6} className="d-flex flex-column justify-content-center p-5">
          <h1 className="fw-bold mb-4 text-center text-orange">ringolift</h1>
          <h4 className="mb-4">
            Learn English in a Fun and Friendly Way — Build Confidence, Make
            Friends, and Connect with the World Around You!
          </h4>
          <div className="text-center">
            <img
              src={LearningIllustration}
              alt="Learning Illustration"
              className="img-fluid"
            />
          </div>
        </Col>

        {/* Right Side: Login Form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Card className="shadow-lg p-4 rounded-4 w-75">
            <Card.Body>
              <h3 className="fw-bold text-center mb-4">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                  <Form.Check type="checkbox" label="Remember me" />
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot your password?
                  </Link>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-orange w-100"
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                </Button>
                {/* <div className="text-center mt-3">
                  <Button variant="outline-dark" className="w-100">
                    <i className="bi bi-google"></i> Continue with Google
                  </Button>
                </div> */}
              </Form>
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-decoration-none text-primary"
                >
                  Sign up
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
