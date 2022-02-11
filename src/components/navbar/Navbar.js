import React, { useContext, useEffect, useRef, useState } from "react";
import Featured from "./featured/Featured";
import AuthContext from "../../context/AuthContext";
import { logout } from "../../context/AuthActions";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";

const Navbar = ({
  handleClick,
  modal,
  type,
  modalContent,
  setSelectGenre,
  setGohome,
}) => {
  const [isScroll, setIsScroll] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [descNavbar, setDescNavbar] = useState("");
  const [windowSize, setWindowSize] = useState({
    window: undefined,
    height: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const netflixLogoRef = useRef(null);
  const navbarSecondRef = useRef(null);
  const featuredContentRef = useRef(null);
  const containerLg = useRef(null);

  const clickLogo = (e) => {
    console.log(e.target);
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
    if (e.target.matches(".profile-logo-modal-options")) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (windowSize.width >= "800") {
    navbarSecondRef.current.style.display = "none";
    netflixLogoRef.current.style.display = "none";
  } else if (windowSize.width < "800") {
    navbarSecondRef.current.style.display = "flex";
    netflixLogoRef.current.style.display = "inline-block";
  }
  if (windowSize.width >= "1024") {
    containerLg.current.style.display = "flex";
    featuredContentRef.current.style.display = "none";
  } else if (windowSize.width < "1024") {
    containerLg.current.style.display = "none";
    featuredContentRef.current.style.display = "block";
  }

  const clickLogoModal = () => {
    dispatch(logout());
  };

  useEffect(() => {
    window.onscroll = () => {
      const scroll = window.scrollY;

      setIsScroll(scroll === 0 ? false : true);

      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <nav className="navbar">
      <Featured
        featuredContentRef={featuredContentRef}
        navbarRef={navbarSecondRef}
        setSelectGenre={setSelectGenre}
        handleClick={handleClick}
        modal={modal}
        modalContent={modalContent}
        type={type}
        setDescNavbar={setDescNavbar}
      />
      <section
        className={
          isScroll
            ? "background-degradate  container header"
            : "container header"
        }
      >
        <article className="navbar-first">
          <Link to="/">
            <img
              className="netflix-logo"
              src="https://www.svgrepo.com/show/303341/netflix-1-logo.svg"
              alt="netflix-logo-sm"
              ref={netflixLogoRef}
              onClick={() => {
                setGohome(true);
                console.log("hi");
              }}
            />
          </Link>
          {windowSize.width >= "800" && (
            <article className="nav-query">
              <Link to="/">
                <img
                  onClick={() => {
                    setGohome(true);
                    console.log("hi");
                  }}
                  className="netflix-logo"
                  alt="netflix-logo-lg"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
                />
              </Link>

              <div className="nav-query-links">
                {type ? (
                  <>
                    <span
                      onClick={handleClick}
                      id="modal-movie-active"
                      style={{ color: "white", marginLeft: "15px" }}
                    >
                      {type === "movies" ? "movies" : "series"}
                    </span>

                    <div>
                      <span
                        id="modal-genre-active"
                        onClick={handleClick}
                        style={{ color: "white" }}
                      >
                        Categories
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                    <Link to="/series">
                      <span>Series</span>
                    </Link>
                    <Link to="/movies">
                      <span>Movies</span>
                    </Link>
                    <div>
                      <span id="modal-genre-active" onClick={handleClick}>
                        Categories
                      </span>
                    </div>
                  </>
                )}
              </div>
            </article>
          )}
          <div className="center">
            <SearchIcon style={{ marginRight: "2vw" }} id="search-icon" />
            <div
              src="https://occ-0-4799-3933.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41"
              className="profile-logo"
              onClick={clickLogo}
              alt="profile-logo-sm"
            >
              <div
                className={
                  isActive
                    ? "profile-logo-modal flex"
                    : "profile-logo-modal none"
                }
              >
                <div className="profile-logo-modal-options">
                  <span>Settings</span>
                </div>
                <div
                  onClick={clickLogoModal}
                  className="profile-logo-modal-options"
                >
                  <span>Logout</span>
                </div>
                <div className="rombo"></div>
              </div>
            </div>
          </div>
        </article>
      </section>
      {/* desktop */}
      <section className="container header featured-lg" ref={containerLg}>
        <div className="featured-lg-content">
          <p>{descNavbar}</p>
        </div>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon sx={{ color: "black" }} />
            <span style={{ marginLeft: "3px" }}>Play</span>
          </button>
          <button className="more">
            <InfoIcon sx={{ color: "white" }} />
            <span style={{ color: "white" }}>Info</span>
          </button>
        </div>
      </section>
    </nav>
  );
};
export default Navbar;
