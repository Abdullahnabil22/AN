import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { langContext } from "../../Components/Contexts/lang";

function SDetails() {
  const { id } = useParams();
  const [movies, setMovies] = useState({});
  const { lang, setLang } = useContext(langContext);

  const getDetails = async () => {
    try {
      let res = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
        params: { api_key: "879c6a542c95ace09e3ee4133eb03db8" },
      });
      setMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              alt={movies.title}
              className="rounded-3"
            />
          </div>
          <div className="col-md-7 text-light">
            <p className="display-4 fw-bold">{movies.name}</p>
            <p className="fs-6 fw-bold">Description: {movies.overview}</p>
            <p className="fs-6 fw-bold">
              Release Date: {movies.first_air_date}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SDetails;
