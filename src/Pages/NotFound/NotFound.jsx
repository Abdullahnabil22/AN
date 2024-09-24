import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <p className="navy text-light mb-5 display-4">404 Not found</p>
        <div className=" d-flex  align-items-center justify-content-around">
          <div className="me-5">
            <img
              src="./popcorn.png"
              alt="404-popcorn"
              width={400}
              height={500}
            />
          </div>
          <div className="d-flex flex-column  text-light con">
            <h1 className="fw-bold ">I have bad news for you</h1>
            <p className="fs-5">
              The page you are looking for might be removed or is temporarily
              unavailable
            </p>
            <button
              className=" all"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
