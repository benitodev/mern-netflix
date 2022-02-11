import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "./Modal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import CheckIcon from "@mui/icons-material/Check";
const Featured = ({
  handleClick,
  modal,
  type,
  modalContent,
  setSelectGenre,
  navbarRef,
  featuredContentRef,
  setDescNavbar,
}) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    try {
      const getRandom = async () => {
        const res = await axios.get(
          `https://immense-chamber-40390.herokuapp.com/api/movies/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVuaXRva2EiLCJpZCI6IjYxZGM4MDUyZTM0OWMwODkxZDY5MThmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTg2NzE1Mn0.QbA5zncaHuO_Smmqf19A6aDpoaF1f5HNTm6QnA_iYdY",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const item = await res.data[0];
        if (item !== undefined) {
          const navbarDesc = item.desc.split(" ").slice(0, 25).join(" ") + ".";

          setDescNavbar(navbarDesc);
        }
        setContent(res.data[0]);
      };

      getRandom();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <>
      <img src={content.img} alt="" />
      <section className="featured-content" ref={featuredContentRef}>
        <div className="featured-info">
          <h1 className="featured-title">{content.title}</h1>
          <div style={{ width: "100%" }}>
            <ul className="featured-genre">
              {/* {content.genre.length > 0
                ? content.genre.map((el) => (
                    <li>
                      <span>{el}</span>
                    </li>
                  ))
                : ""} */}
              <li>
                <span>{content.genre}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="buttons">
          <button className="my-list">
            <CheckIcon sx={{ color: "white" }} />
          </button>
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
      <section className="background-featured"> </section>

      <article className="navbar-second" ref={navbarRef}>
        {type ? (
          <>
            <span onClick={handleClick} id="modal-movie-active">
              {type === "movies" ? "movies" : "series"}
            </span>

            <div>
              <span id="modal-genre-active" onClick={handleClick}>
                Categories
              </span>
            </div>
          </>
        ) : (
          <>
            <Link to="/series">
              <span
                style={{
                  backgroundColor: "#00000096",
                  padding: "2px 3px",
                  borderRadius: "5%",
                }}
              >
                Series
              </span>
            </Link>
            <Link to="/movies">
              <span
                style={{
                  backgroundColor: "#00000096",
                  padding: "2px 3px",
                  borderRadius: "5%",
                }}
              >
                Movies
              </span>
            </Link>
            <div>
              <span id="modal-genre-active" onClick={handleClick}>
                Categories
              </span>
            </div>
          </>
        )}
      </article>
      <Modal
        handleClick={handleClick}
        modal={modal}
        content={modalContent}
        setSelectGenre={setSelectGenre}
      />
    </>
  );
};

export default Featured;
