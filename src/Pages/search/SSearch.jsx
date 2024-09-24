import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addFav, removeFav } from "../../Store/Slice/Fav";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function SSearch() {
  const navigate = useNavigate();
  const { name } = useParams();

  const [Movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/search/tv", {
        params: {
          query: `${name}`,
          api_key: "879c6a542c95ace09e3ee4133eb03db8",
        },
      })
      .then((res) => {
        console.log(res.data.results);

        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Liked = useSelector((state) => state.Fav.favMovies);

  const dispatch = useDispatch();
  const handleLike = (id) => {
    dispatch(addFav(id));
  };
  const handleUnlike = (id) => {
    dispatch(removeFav(id));
  };

  const isFav = (movie) => {
    return Liked.some((fav) => fav.id === movie.id);
  };

  return (
    <>
      <Row xs={1} md={4} className="g-4 ">
        {Movies.map((movie) => (
          <Col key={movie.id} className="col">
            <div className=" position-relative" style={{ height: "506.7px" }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="img-fluid rounded-3 "
                alt="movie image"
              />
              <div className="bg-black bg-opacity-50 det rounded-3 p-3 z-2 position-absolute bottom-0">
                <div className="position-absolute top-0 end-0 pt-4 pe-4">
                  {isFav(movie) ? (
                    <FaHeart
                      onClick={() => handleUnlike(movie)}
                      className="fs-3 text-light"
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() => {
                        handleLike(movie);
                      }}
                      className="fs-3 text-light"
                    />
                  )}
                </div>
                <h4 className="text-light">{movie.name}</h4>
                <h6 className="text-light">{movie.first_air_date}</h6>
                <p className="text-light">
                  {movie.overview.split(" ").slice(0, 12).join(" ") + "...."}
                </p>

                <button
                  className="btn btn-success w-100 "
                  onClick={() => {
                    navigate(`/Sdetails/${movie.id}`);
                  }}
                >
                  Watch Now
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default SSearch;
