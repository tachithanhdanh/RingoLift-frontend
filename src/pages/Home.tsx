import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import appImage from "../assets/images/ringolift.png";
import { useAuth } from "../hooks/useAuth";
import "../assets/styles/global.scss";

export default function Home() {
  const { user } = useAuth();
  const userId = user?.id;

  return (
    <Container className="py-5 paddingTop marginTop">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <h1 className="display-4 fw-bold" style={{ color: "#FF782D" }}>
            Welcome to RingoLift!
          </h1>
          <p className="mt-4 lead">
            Your personal companion for mastering the English language. Learn,
            practice, and grow your skills with engaging lessons, interactive
            exercises, and personalized progress tracking.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="mt-3"
            href="/private/learn"
          >
            Get Started
          </Button>
        </Col>
        <Col md={6}>
          <img src={appImage} alt="RingoLift App" className="img-fluid" />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Interactive Lessons</Card.Title>
              <Card.Text>
                Master grammar, vocabulary, and pronunciation with tailored
                lessons.
              </Card.Text>
              <Button variant="outline-primary" href="/private/learn">
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Track Your Progress</Card.Title>
              <Card.Text>
                Monitor your improvement and set new learning goals easily.
              </Card.Text>
              <Button
                variant="outline-primary"
                href={`/private/profile/${userId}`}
              >
                View Progress
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Fun Stories and Exercises</Card.Title>
              <Card.Text>
                Practice your skills with engaging stories and interactive
                quizzes.
              </Card.Text>
              <Button variant="outline-primary" href="/private/stories">
                Explore Stories
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Vocabulary</Card.Title>
              <Card.Text>
                Expand your vocabulary with structured lessons and exercises.
              </Card.Text>
              <Button variant="outline-primary" href="/private/vocabulary">
                Go to Vocabulary
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Mistakes</Card.Title>
              <Card.Text>
                Review and correct common mistakes to improve your accuracy.
              </Card.Text>
              <Button variant="outline-primary" href="/private/mistakes">
                Review Mistakes
              </Button>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col md={3}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Notifications</Card.Title>
              <Card.Text>
                Stay updated with the latest lessons, exercises, and progress.
              </Card.Text>
              <Button variant="outline-primary" href="#notifications">
                Check Notifications
              </Button>
            </Card.Body>
          </Card>
        </Col> */}
        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Edit Profile</Card.Title>
              <Card.Text>
                Update your profile information to personalize your learning
                experience.
              </Card.Text>
              <Button variant="outline-primary" href="/private/edit-profile">
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
