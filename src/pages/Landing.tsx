// pages/Landing.tsx
import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light"
    >
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <Card.Title as="h2" className="mb-4">
                Chào mừng bạn đến với{" "}
                <span className="text-primary">RingoLift</span>
              </Card.Title>
              <Card.Text>
                Nơi bạn có thể học, giao lưu và khám phá những kiến thức mới mỗi
                ngày! Đăng nhập hoặc đăng ký để bắt đầu hành trình của bạn.
              </Card.Text>
              <div className="d-flex justify-content-around mt-4">
                <Link to="/login">
                  <Button variant="primary" size="lg" className="w-100 mb-2">
                    Đăng Nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="success" size="lg" className="w-100 mb-2">
                    Đăng Ký
                  </Button>
                </Link>
                <Link to="/forgot-password">
                  <Button variant="warning" size="lg" className="w-100 mb-2">
                    Quên Mật Khẩu?
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
