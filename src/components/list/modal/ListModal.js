import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
const ListModal = ({ modalRef, modalLgRef, click, id }) => {
  const [movie, setMovie] = useState({});
  const [desc, setDesc] = useState("");
  const [descLg, setDescLg] = useState("");
  const buttonStaticStyle = {
    marginRight: "10px",
    width: "30px",
    height: "30px",
  };
  useEffect(() => {
    if (id !== false) {
      const getMovie = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3001/api/movies/${id}
            `,
            {
              headers: {
                token:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVuaXRva2EiLCJpZCI6IjYxZGM4MDUyZTM0OWMwODkxZDY5MThmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTg2NzE1Mn0.QbA5zncaHuO_Smmqf19A6aDpoaF1f5HNTm6QnA_iYdY",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
          const item = await res.data;
          setMovie(item);
          if (item !== undefined) {
            const movieDesc =
              item.desc.split(" ").slice(0, 15).join(" ") + "...";
            const movieLgDesc =
              item.desc.split(" ").slice(0, 25).join(" ") + "...";
            setDescLg(movieLgDesc);
            setDesc(movieDesc);
          }
        } catch (err) {
          console.log("error!!!!");
        }
      };
      getMovie();
    }
  }, [id, movie.desc]);
  return (
    <>
      <article className="list-modal none" onClick={click} ref={modalRef}>
        <div className="list-modal-header">
          <img src={movie.img} className="movie-image" alt="" />
          <section className="movie-info">
            <div className="movie-info-title">
              <h4>{movie.title}</h4>{" "}
              <CancelIcon
                className="movie-cancel"
                sx={{ color: "white" }}
              ></CancelIcon>
            </div>
            <div>
              <small>{movie.year}</small> <small>+16</small>{" "}
              <small>2 Temporada</small>
            </div>
            <p>{desc && desc}</p>
          </section>
        </div>
        <div className="list-modal-options">
          <div className="list-modal-play">
            <PlayArrowIcon />
            <span>play</span>
          </div>
          <ArrowDownwardIcon sx={{ color: "white" }} />
          <PlayArrowIcon sx={{ color: "white" }} />
        </div>
        <hr />
        <div className="list-modal-feature">
          <div>
            <InfoIcon sx={{ color: "white" }} />
            <span
              style={{
                marginLeft: "5px",
                color: "rgb(230,230,230)",
                letterSpacing: "1px",
              }}
            >
              Episodes
            </span>
          </div>
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </div>
      </article>

      <article className="list-modal-lg none" onClick={click} ref={modalLgRef}>
        <section className="list-modal-header">
          <div className="list-image">
            <img src={movie.img} className="movie-image" alt="" />
            <div
              style={{
                position: "absolute",
                top: "0",
                height: "55vh",
                width: "100%",
                background: "linear-gradient(to top,#000000,#bf393900 50%)",
              }}
            ></div>
            <CancelIcon
              id="movie-cancel-lg"
              sx={{ color: "white" }}
            ></CancelIcon>

            <div className="list-modal-options">
              <article style={{ display: "flex", alignItems: "center" }}>
                <div className="list-modal-play-lg">
                  <PlayArrowIcon />
                  <span>play</span>
                </div>
                <AddCircleIcon
                  sx={{ color: "white" }}
                  style={buttonStaticStyle}
                />
                <ThumbUpAltIcon
                  sx={{ color: "white" }}
                  style={buttonStaticStyle}
                />
                <ThumbDownIcon
                  sx={{ color: "white" }}
                  style={buttonStaticStyle}
                />
              </article>
              <div style={{ marginRight: "30px" }}>
                <VolumeOffIcon sx={{ color: "white" }} />
              </div>
            </div>
          </div>
          <section className="movie-info">
            <div className="movie-info-title">
              <div>
                <h4>{movie.year}</h4>
                <h4>16+</h4>
                <h4>2 seasons</h4>
              </div>
              <section>
                <p style={{ width: "100%", margin: "0" }}>{descLg && descLg}</p>
              </section>
            </div>
            <div className="movie-info-more">
              <small>Cast:</small>
              <small>Genres:</small>
              <small>This title is: </small>
            </div>
          </section>
        </section>
        <hr />
        <div className="list-modal-feature">
          <div>
            <InfoIcon sx={{ color: "white" }} />
            <span
              style={{
                marginLeft: "5px",
                color: "rgb(230,230,230)",
                letterSpacing: "1px",
              }}
            >
              Episodes
            </span>
          </div>
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </div>
      </article>
    </>
  );
};

export default ListModal;
