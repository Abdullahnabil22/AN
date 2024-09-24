import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../Services/axiosIns";
import { langContext } from "../../Components/Contexts/lang";
import { detailsAction } from "../../Store/Slice/details";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { addFav, removeFav } from "../../Store/Slice/Fav";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  let { details } = useSelector((state) => state.detail);
  const { lang } = useContext(langContext);
  // console.log(details);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState({});
  const getDetails = async () => {
    try {
      let res = await axiosInstance.get(`/${id}/images`, {
        params: {
          include_image_language: "en",
        },
      });
      setMovies(res.data.logos);
    } catch (err) {
      console.log(err);
    }
  };
  const [similar, setSimilar] = useState([]);

  const getSimilar = async () => {
    try {
      let res = await axiosInstance.get(`/${id}/similar`, {
        params: {
          language: lang,
        },
      });
      setSimilar(res.data?.results);
    } catch (err) {
      console.log(err);
    }
  };
  const [vedios, setVedios] = useState([]);
  const getVedios = async () => {
    try {
      let res = await axiosInstance.get(`/${id}/videos`, {
        params: {
          include_vedio_language: "en",
        },
      });
      console.log(res.data.results);
      setVedios(res.data?.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(detailsAction({ id, language: lang }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, lang, dispatch]);

  useEffect(() => {
    getDetails();
    getSimilar();
    getVedios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const Liked = useSelector((state) => state.Fav.favMovies);

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
      <div className="container" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="row">
          <div className="col-md-5">
            <img
              src={
                details.poster_path != null
                  ? `https://image.tmdb.org/t/p/w500/${details.poster_path}`
                  : "/Default.jpg"
              }
              alt={movies.title}
              className="rounded-3"
            />
          </div>
          <div className="col-md-7 text-light">
            {movies.length != 0 ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movies[0]?.file_path}`}
                alt={movies.title}
                className="rounded-3 mb-5"
                style={{ maxHeight: 250 }}
              />
            ) : (
              <p className="display-4 fw-bold">{details.title}</p>
            )}
            <p className="fs-6 fw-bold">
              {" "}
              {lang === "ar" ? "قصة الفيلم:" : "Description:"}{" "}
              {details.overview}{" "}
            </p>
            <p className="fs-6 fw-bold">
              {" "}
              {lang === "ar" ? "تاريخ الأصدار:" : "Release Date:"}{" "}
              {details.release_date}
            </p>
            <iframe
              className="w-100"
              height="315"
              src={`https://www.youtube.com/embed/${vedios[0]?.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div
        className="container text-light mt-5"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <h1 className="mb-5">
          {" "}
          {lang === "ar" ? "الافلام المقترحة" : "Similar Movies"}{" "}
        </h1>
        <div className="scroll-container">
          <Row xs={1} className="flex-nowrap g-4">
            {similar.map((movie) => (
              <Col key={movie.id} className="flex-shrink-1">
                <img
                  src={
                    movie.poster_path != null
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "/Default.jpg"
                  }
                  alt={movie.title}
                  className="img-fluid rounded-3"
                />
                <div className="bg-black bg-opacity-50 det rounded-3 p-3 z-2 ">
                  <div className=" pt-4 pe-4">
                    {isFav(movie) ? (
                      <FaHeart
                        onClick={() => handleUnlike(movie)}
                        className="fs-3 text-light hover"
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => {
                          handleLike(movie);
                        }}
                        className="fs-3 text-light hover"
                      />
                    )}
                  </div>
                  <h4 className="text-light">{movie.title}</h4>
                  <h6 className="text-light">{movie.release_date}</h6>
                  <p className="text-light">
                    {movie.overview.split(" ").slice(0, 12).join(" ") + "...."}
                  </p>

                  <button
                    className="btn btn-primary w-100 bot fw-bold"
                    onClick={() => {
                      navigate(`/details/${movie.id}`);
                    }}
                  >
                    {lang === "ar" ? "شاهد الآن" : "Watch Now"}
                  </button>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Details;
