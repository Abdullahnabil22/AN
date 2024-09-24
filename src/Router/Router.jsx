import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Movies from "../Pages/Movies/Movies";
import Fav from "../Pages/Favorites/Fav";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Details from "../Pages/movieDetail/details";
import Search from "../Pages/search/search";
import NotFound from "../Pages/NotFound/NotFound";
import { useSelector } from "react-redux";
import Series from "../Pages/Series/Series";
import SDetails from "../Pages/movieDetail/sDetails";
import SSearch from "../Pages/search/SSearch";
import NMovies from "../Pages/Movies/Nmovies";

function Router() {
  const isLoggedIn = useSelector((state) => state.Log.isLogging);

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <div className="m-5">
          <Routes>
            <Route path="/" element={<NMovies />} />
            {isLoggedIn && <Route path="/Favorite" element={<Fav />} />}
            <Route path="/series" element={<Series />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/Sdetails/:id" element={<SDetails />} />
            <Route path="/search/:name" element={<Search />} />
            <Route path="/searchSeries/:name" element={<SSearch />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default Router;
