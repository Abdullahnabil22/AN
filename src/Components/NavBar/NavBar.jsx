import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogging } from "../../Store/Slice/Logging";
import { langContext } from "../Contexts/lang";
import Flag from "react-flagpack";

function NavBar() {
  const navigate = useNavigate();
  const [Search, setSearch] = useState({
    search: "",
  });
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.Log.isLogging);
  const dispatch = useDispatch();
  const Liked = useSelector((state) => state.Fav.favMovies);
  const { lang, setLang } = useContext(langContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(toggleLogging(true));
    }
  }, []);

  const handleSearch = (e) => {
    setSearch({ ...Search, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar
        bg="black"
        data-bs-theme="dark"
        className="border-bottom border-1"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Container className="d-flex">
          <Navbar.Brand className="fw-bold fs-1 AN ">
            A<strong className="text-danger">N</strong>
          </Navbar.Brand>
          <Nav className={lang === "ar" ? "ms-auto me-4" : "me-auto"}>
            <Nav.Link className="text-light">
              <Link className="text-light text-decoration-none fw-bold" to="/">
                {lang === "ar" ? "الأفلام" : "Movies"}
              </Link>
            </Nav.Link>
            <Nav.Link className="text-light">
              <Link
                className="text-light text-decoration-none fw-bold"
                to="/series"
              >
                {lang === "ar" ? "المسلسلات" : "Series"}
              </Link>
            </Nav.Link>

            {isLoggedIn && (
              <Nav.Link className="text-light d-flex">
                <Link
                  className="text-light text-decoration-none fw-bold "
                  to="/Favorite"
                >
                  {lang === "ar" ? "المفضلة" : "Favorites"}
                </Link>
                {lang === "ar" ? (
                  <div className="position-relative">
                    <FaHeart className="me-1 fs-3 text-danger" />
                    <strong className=" text-light counterAr">
                      {Liked.length}
                    </strong>
                  </div>
                ) : (
                  <span>
                    <FaHeart className="ms-1 fs-3 text-danger" />
                    <strong className=" text-light counterEn">
                      {Liked.length}
                    </strong>
                  </span>
                )}
              </Nav.Link>
            )}
          </Nav>
          <Form className="mx-3 justify-content-center">
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder={lang === "ar" ? "بحث" : "Search"}
                  className=" mr-sm-2 bg-light text-black fw-bold tst"
                  name="search"
                  value={Search.search}
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                />
              </Col>
              <Col xs="auto">
                <button
                  type="submit"
                  className="btn btn-outline-light fw-bold"
                  onClick={() => {
                    navigate(`/search/${Search.search}`);
                  }}
                >
                  {lang === "ar" ? " بحث" : "Search"}
                </button>
              </Col>
            </Row>
          </Form>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link className="d-flex justify-content-end">
                <a
                  className="text-light text-decoration-none fw-bold"
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispatch(toggleLogging(false));
                  }}
                >
                  {lang === "ar" ? "  تسجيل الخروج" : "Logout"}
                </a>
              </Nav.Link>
            ) : (
              <Nav.Link className="justify-self-end">
                <Link
                  className="text-light text-decoration-none fw-bold"
                  to="/login"
                >
                  {lang === "ar" ? "تسجيل الدخول" : "Login"}
                </Link>
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link className="justify-self-end">
                <Link
                  className="text-light text-decoration-none fw-bold"
                  to="/register"
                >
                  {lang === "ar" ? "انضم لنا" : "Register"}
                </Link>
              </Nav.Link>
            )}
          </Nav>
          <button
            className="btn "
            onClick={() => {
              setLang("ar");
              localStorage.setItem("lang", "ar");
            }}
          >
            <img src="/flags/M/682.svg" className="me-2" alt="bolbol" />
          </button>

          <button
            className="btn"
            onClick={() => {
              setLang("en");
              localStorage.setItem("lang", "en");
            }}
          >
            <img src="/flags/M/840.svg" />
          </button>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
