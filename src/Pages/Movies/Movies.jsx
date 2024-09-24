import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Movies.css";

import { Autoplay, EffectCards } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../../Store/Slice/Fav";
import { moviesAction } from "../../Store/Slice/Movies";
import { langContext } from "../../Components/Contexts/lang";
// import { useFetch } from "../../Hooks/useFetch";

function Movies() {
  const navigate = useNavigate();

  let { movies } = useSelector((state) => state.movie);
  const { lang } = useContext(langContext);
  // console.log(movies);

  const [page, setPage] = useState(1);

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
  // const { data } = useFetch("https://api.themoviedb.org/3/movie/popular", {
  //   api_key: "879c6a542c95ace09e3ee4133eb03db8",
  //   page: page,
  //   language: lang,
  // });
  // const movies = data.data?.results;
  // console.log(movies);

  useEffect(() => {
    dispatch(moviesAction({ page, language: lang }));
    // getMovies(page, lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, page, lang]);

  // const goToNext = () => {
  //   dispatch(nextPage());
  // };
  // const goToPrev = () => {
  //   dispatch(prevPage());
  // };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // if (loading)
  //   return (
  //     <>
  //       <h1>Loading...</h1>
  //     </>
  //   );

  // console.log(lang);
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[Autoplay, EffectCards]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper mb-5"
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              className="test"
              onClick={() => {
                navigate(`/details/${movie.id}`);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Row xs={1} md={4} className="g-4" dir={lang === "ar" ? "rtl" : "ltr"}>
        {movies?.map((movie) => (
          <Col key={movie.id}>
            <img
              src={
                movie.poster_path != null
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "./Default.jpg"
              }
              alt={movie.title}
              className="img-fluid rounded-3 "
            />

            <div className="bg-black bg-opacity-50 det rounded-3 p-3 z-2 position-absolute ">
              <div className="position-absolute top-0 end-0 pt-4 pe-4">
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
      <div
        className="row justify-content-center pt-3"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <button
          className="btn btn-outline-light fw-bold col-2 me-2"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          {lang === "ar" ? "السابق" : "Prev"}
        </button>
        <button
          className="btn btn-outline-light fw-bold col-2"
          onClick={() => handlePageChange(page + 1)}
        >
          {lang === "ar" ? "التالي" : "Next"}
        </button>
      </div>
    </>
  );
}

export default Movies;
