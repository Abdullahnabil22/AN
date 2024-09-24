/* eslint-disable no-useless-escape */
import { useContext, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { langContext } from "../../Components/Contexts/lang";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const [pass, setPass] = useState({
    showPassword: false,
  });
  const handleTogglePasswordVisibility = () => {
    setPass({ showPassword: !pass.showPassword });
  };
  const { lang, setLang } = useContext(langContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      if (e.target.value.length !== 0) {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
          setErrors({ ...errors, emailError: "Invalid email address" });
        } else {
          setErrors({ ...errors, emailError: "" });
        }
      } else {
        setErrors({ ...errors, emailError: "Email is Required" });
      }
    } else if (e.target.name === "password") {
      if (e.target.value.length !== 0) {
        if (e.target.value.length < 8) {
          setErrors({
            ...errors,
            passwordError: "Password must be at least 8 characters long",
          });
        } else {
          setErrors({ ...errors, passwordError: "" });
        }
      } else {
        setErrors({ ...errors, passwordError: "Password is Required" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    localStorage.setItem("token", "123");
    navigate("/");
    location.reload();
  };

  return (
    <>
      <Container
        className="d-flex min-vh-50 flex-column justify-content-center px-4 py-5"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <div className="text-center">
              <p className="fw-bold text-light display-3 AN">
                A<strong className="text-danger">N</strong>
              </p>
              <h2 className="mt-4 fw-bold text-light">
                {lang === "ar"
                  ? "سجل الدخول لحسابك"
                  : "Sign in to your account"}
              </h2>
            </div>

            <Form className="mt-4" onSubmit={(e) => handleSubmit(e)}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="text-light">
                  {" "}
                  {lang === "ar" ? "البريد الالكتروني" : "Email address"}
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  required
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                  isInvalid={!!errors.emailError}
                />
                <Form.Control.Feedback type="invalid" className="pt-2">
                  {errors.emailError}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Label className="text-light">
                    {lang === "ar" ? " كلمة السر" : "Password"}
                  </Form.Label>
                  <a href="#" className="text-decoration-none text-primary">
                    {lang === "ar" ? " نسيت كلمة السر؟" : "Forgot password?"}
                  </a>
                </div>
                <div className="position-relative">
                  <Form.Control
                    type={pass.showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                    isInvalid={!!errors.passwordError}
                  />
                  <div
                    className={lang === "ar" ? " spaceAr" : "spaceEn"}
                    onClick={handleTogglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {pass.showPassword ? <IoEye /> : <IoEyeOff />}
                  </div>
                  <Form.Control.Feedback type="invalid" className="pt-2">
                    {errors.passwordError}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>

              <Button type="submit" className="w-100 btn-primary mt-2 fw-bold">
                {lang === "ar" ? " تسجيل الدخول" : "Sign in"}
              </Button>
            </Form>

            <p className="mt-4 text-center text-secondary">
              {lang === "ar" ? " لست مشترك؟" : "Not a member?"}{" "}
              <a href="#" className="text-decoration-none text-primary">
                {lang === "ar"
                  ? " انضم لنا الان بالمجان"
                  : " Sign up now for free"}
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
