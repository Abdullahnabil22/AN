/* eslint-disable no-useless-escape */
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { langContext } from "../../Components/Contexts/lang";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { lang, setLang } = useContext(langContext);

  const onSubmit = (data) => console.log(data);
  const password = watch("password");

  return (
    <>
      <Container
        className="d-flex min-vh-100 flex-column justify-content-center px-4 py-5"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <div className="text-center">
              <p className="fw-bold text-light display-3 AN">
                A<strong className="text-danger">N</strong>
              </p>
              <h2 className="mt-4 fw-bold text-light">
                {" "}
                {lang === "ar" ? "أنضم الأن" : "Register Now"}{" "}
              </h2>
            </div>

            <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label className="text-light">
                  {" "}
                  {lang === "ar" ? "الأسم" : "Name"}
                </Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errors.name}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name && errors.name.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="text-light">
                  {lang === "ar" ? "البريد الالكتروني" : "Email address"}
                </Form.Label>
                <Form.Control
                  type="email"
                  isInvalid={!!errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email && errors.email.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="username" className="mb-3">
                <Form.Label className="text-light">
                  {" "}
                  {lang === "ar" ? "أسم المستخدم" : "Username"}
                </Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errors.username}
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                    pattern: {
                      value: /^\S+$/,
                      message: "Username must not contain spaces",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username && errors.username.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label className="text-light">
                  {lang === "ar" ? " كلمة السر" : "Password"}
                </Form.Label>
                <Form.Control
                  type="password"
                  isInvalid={!!errors.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password && errors.password.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label className="text-light">
                  {" "}
                  {lang === "ar" ? " تأكيد كلمة السر" : "Confirm Password"}
                </Form.Label>
                <Form.Control
                  type="password"
                  isInvalid={!!errors.confirmPassword}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword && errors.confirmPassword.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" className="w-100 btn-primary fw-bold">
                {lang === "ar" ? " أنضم" : "Register"}
              </Button>
            </Form>

            <p className="mt-4 text-center text-secondary">
              {lang === "ar" ? " مشترك بالفعل؟" : "Already a member?"}{" "}
              <a href="#" className="text-decoration-none text-primary">
                {lang === "ar" ? " سجل دخول الأن" : "Sign in Now"}
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
