import { FaHeartBroken } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFav } from "../../Store/Slice/Fav";
import { Col, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../Services/axiosIns";
import { useNavigate } from "react-router-dom";
import { langContext } from "../../Components/Contexts/lang";
import "./Fav.css";

function Fav() {
  const Liked = useSelector((state) => state.Fav.favMovies);
  console.log(Liked);
  const navigate = useNavigate();
  const { lang, setLang } = useContext(langContext);

  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeFav(id));
    localStorage.removeItem(`movie_${id}`);
  };
  // eslint-disable-next-line no-unused-vars
  const [Movies, setMovies] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/popular")
      .then((res) => {
        console.log(res.data.results);

        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row xs={1} md={4} className="g-4 " dir={lang === "ar" ? "rtl" : "ltr"}>
        {Liked.map((movie) => (
          <Col key={Liked.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="img-fluid rounded-3 "
            />

            <div className="bg-black bg-opacity-50 det rounded-3 p-3 z-2 position-absolute ">
              <div className="position-absolute top-0 end-0 pt-4 pe-4">
                <FaHeartBroken
                  className="text-danger fs-3 text-light hover"
                  onClick={() => handleRemove(movie)}
                />
              </div>
              <h4 className="text-light">{movie.title}</h4>
              <h6 className="text-light">{movie.release_date}</h6>
              <p className="text-light">
                {movie.overview.split(" ").slice(0, 12).join(" ") + "...."}
              </p>

              <button
                className="btn btn-primary w-100 bot"
                onClick={() => {
                  navigate(`/details/${movie.id}`);
                }}
              >
                Watch Now
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Fav;
