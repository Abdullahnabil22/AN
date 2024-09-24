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

import "./Series.css";

import { Autoplay, EffectCards } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../../Store/Slice/Fav";
import { langContext } from "../../Components/Contexts/lang";
import { seriesAction } from "../../Store/Slice/Series";

function Series() {
  const navigate = useNavigate();
  let { series, error, loading } = useSelector((state) => state.series);
  const { lang, setLang } = useContext(langContext);
  console.log(series);

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

  useEffect(() => {
    dispatch(seriesAction({ page, language: lang }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, lang, dispatch]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
        {series.map((series) => (
          <SwiperSlide key={series.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${series.backdrop_path}`}
              className="test"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Row xs={1} md={4} className="g-4" dir={lang === "ar" ? "rtl" : "ltr"}>
        {series.map((series) => (
          <Col key={series.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
              className="img-fluid rounded-3 "
            />

            <div className="bg-black bg-opacity-50 det rounded-3 p-3 z-2 position-absolute ">
              <div className="position-absolute top-0 end-0 pt-4 pe-4">
                {isFav(series) ? (
                  <FaHeart
                    onClick={() => handleUnlike(series)}
                    className="fs-3 text-light"
                  />
                ) : (
                  <FaRegHeart
                    onClick={() => {
                      handleLike(series);
                    }}
                    className="fs-3 text-light"
                  />
                )}
              </div>
              <h4 className="text-light">{series.name}</h4>
              <h6 className="text-light">{series.first_air_date}</h6>
              <p className="text-light">
                {series.overview.split(" ").slice(0, 12).join(" ") + "...."}
              </p>

              <button
                className="btn btn-success w-100 bot"
                onClick={() => {
                  navigate(`/Sdetails/${series.id}`);
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

export default Series;
