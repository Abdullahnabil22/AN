import { useContext } from "react";
import { langContext } from "../Contexts/lang";

function Footer() {
  const { lang, setLang } = useContext(langContext);

  return (
    <>
      <section className="border-top border-1">
        <footer className="text-center text-white bg-black">
          <div className="container p-4 pb-0">
            <section className="">
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">
                  {lang === "ar" ? "انضم لنا مجانا" : "Register for free "}
                </span>
                <button
                  data-mdb-ripple-init
                  type="button"
                  className="btn btn-outline-light btn-rounded fw-bold"
                >
                  {lang === "ar" ? "!سجل الان" : "Sign up!"}
                </button>
              </p>
            </section>
          </div>

          <div className="text-center p-3 bg-black">
            <span className="me-2">© 2024 Copyright:</span>
            <a
              className="text-white text-decoration-none fw-bold"
              href="https://Nabil.com/"
            >
              Nabil.com
            </a>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
