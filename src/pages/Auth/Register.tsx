// src/pages/Auth/Register.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import LearningIllustration from "../../assets/images/register-learning.png";
import { UserGenderResponse } from "../../interfaces/responses/UserGenderResponse";
import { getAllGenders } from "../../services/userService";
import { UserRegisterRequest } from "../../interfaces/requests/UserRegisterRequest";
import { registerUser } from "../../services/authService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Register() {
  // State lưu giá trị input form
  const [formData, setFormData] = useState<UserRegisterRequest>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    genderId: undefined,
    password: "",
    isPublic: true,
    role: "user",
  });

  // State lưu lỗi
  const [genders, setGenders] = useState<UserGenderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  // Fetch danh sách gender khi component được mount
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const genderData = await getAllGenders();
        setGenders(genderData);
      } catch (error) {
        console.error("Error fetching genders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenders();
  }, []);

  // Xử lý khi input thay đổi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    setFormData({ ...formData, dateOfBirth: date?.toISOString() || "" });
  };

  // Xử lý thay đổi radio button (genderId)
  // const handleGenderChange = (genderId: number) => {
  //   setFormData({ ...formData, genderId });
  // };

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email.";
    }
    if (!formData.username) {
      newErrors.username = "Username is required.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    // if (!formData.day || !formData.month || !formData.year) {
    //   newErrors.dateOfBirth = "Please provide a valid date of birth.";
    // }
    return newErrors;
  };

  // Xử lý submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      // Chuẩn hóa dữ liệu
      const userRegisterData = {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
        genderId: formData.genderId || undefined,
        password: formData.password,
        isPublic: true, // Mặc định là true
        role: "USER", // Role mặc định
      };

      console.log("Submitting Data: ", userRegisterData);
      // Gửi lên server (ví dụ: gọi API)
      // apiService.register(userRegisterData);

      try {
        const response = await registerUser(formData);
        console.log("User registered successfully:", response);
        setSuccess("User registered successfully!");
        setErrors({});
      } catch (error) {
        console.error("Error registering user:", error);
        setSuccess(null);
        setErrors({ submit: "Registration failed. Please try again later." });
      }
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

        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-white"
        >
          <Card className="shadow-lg p-4 rounded-4 w-75">
            <Card.Body>
              <h3 className="text-center mb-4 fw-bold">Create a new account</h3>
              {success && <div className="alert alert-success">{success}</div>}
              {errors.submit && (
                <div className="alert alert-danger">{errors.submit}</div>
              )}
              {loading ? (
                <Spinner
                  animation="border"
                  variant="primary"
                  className="d-block mx-auto"
                />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  {/* <Row className="mt-3">
                    <Col>
                      <Form.Control
                        placeholder="Day"
                        name="day"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Month"
                        name="month"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Year"
                        name="year"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row> */}

                  <div className="my-3">
                    <label className="me-2">Date of Birth</label>
                    <DatePicker
                      selected={date}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      placeholderText="Select your date of birth"
                      isClearable
                    />
                  </div>

                  {/* <Form.Group className="my-3">
                  <Form.Check
                    inline
                    label="Female"
                    name="gender"
                    type="radio"
                    onChange={() => handleGenderChange(1)}
                  />
                  <Form.Check
                    inline
                    label="Male"
                    name="gender"
                    type="radio"
                    onChange={() => handleGenderChange(2)}
                  />
                  <Form.Check
                    inline
                    label="Custom"
                    name="gender"
                    type="radio"
                    onChange={() => handleGenderChange(3)}
                  />
                  {errors.genderId && (
                    <div className="text-danger">{errors.genderId}</div>
                  )}
                </Form.Group> */}

                  <Form.Group className="my-3">
                    <Form.Select
                      name="genderId"
                      value={formData.genderId || ""}
                      onChange={handleChange}
                      isInvalid={!!errors.genderId}
                    >
                      <option value="">Select Gender</option>
                      {genders.map((gender) => (
                        <option key={gender.id} value={gender.id}>
                          {gender.genderType}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.genderId}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="primary"
                      className="rounded-pill btn-orange"
                    >
                      Sign Up
                    </Button>
                  </div>
                </Form>
              )}
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-primary fw-bold">
                  Log in
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
