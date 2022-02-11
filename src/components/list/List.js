import { useRef, useState, useEffect } from "react";
import React from "react";
import ListItem from "./ListItem";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListModal from "./modal/ListModal";
const List = ({ title, handleClick, list }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [modalSelected, setModalSelected] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const [windowSize, setWindowSize] = useState("");
  const listRef = useRef();
  const modalMovieRef = useRef(null);
  const modalMovieLgRef = useRef(null);

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

  const sliderClick = (direction) => {
    setIsMoved(true);

    let distance = listRef.current.getBoundingClientRect().x - 10;

    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${110 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-110 + distance}px)`;
    }
  };

  const modalClick = (e) => {
    const target = e.target;

    if (target.matches(".list-item")) {
      if (windowSize.width < "800") {
        setModalSelected(e.target.getAttribute("id"));
        setTimeout(() => {
          modalMovieRef.current.style.display = "flex";
        }, 100);
      } else {
        setModalSelected(e.target.getAttribute("id"));
        setTimeout(() => {
          modalMovieLgRef.current.style.display = "flex";
        }, 100);
      }
    }
    if (
      target.matches("#movie-cancel-lg") ||
      target.matches("#movie-cancel-lg path")
    ) {
      modalMovieLgRef.current.style.display = "none";
    }
    if (
      target.matches(".movie-cancel") ||
      target.matches(".movie-cancel path")
    ) {
      modalMovieRef.current.style.display = "none";
    }
  };

  return (
    <>
      <section className="list-container">
        <h2 style={{ margin: "1vh 0px" }}>{title}</h2>
        <div className="wrapper">
          <ArrowBackIosIcon
            className="slider-arrow slider-arrow-left"
            onClick={() => sliderClick("left")}
            style={{ display: !isMoved && "none" }}
            sx={{ color: "white" }}
          />
          <div className="list-content" ref={listRef}>
            {list.content.length > 0 ? (
              list.content.map((item, i) => (
                <>
                  <ListItem key={item} movie={item} modalClick={modalClick} />
                </>
              ))
            ) : (
              <>
                <ListItem movie="Oops no movies" />
              </>
            )}
          </div>
          <ArrowForwardIosIcon
            onClick={() => sliderClick("right")}
            className="slider-arrow slider-arrow-right"
            sx={{ color: "white" }}
          />
        </div>
      </section>

      <ListModal
        key={modalSelected}
        id={modalSelected}
        modalRef={modalMovieRef}
        click={modalClick}
        modalLgRef={modalMovieLgRef}
      />
    </>
  );
};

export default List;
