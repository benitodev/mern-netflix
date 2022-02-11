import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import List from "../list/List";
import Navbar from "../navbar/Navbar";
import Footer from "./Footer";

const contentModal = [
  { id: 1, name: "Series" },
  { id: 2, name: "Movies" },
  { id: 3, name: "Categories" },
];

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectGenre, setSelectGenre] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [goHome, setGohome] = useState(false);
  //list categories
  useEffect(() => {
    const callCategories = async () => {
      const res = await axios.get(
        "https://immense-chamber-40390.herokuapp.com/api/lists/categories",
        {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVuaXRva2EiLCJpZCI6IjYxZGM4MDUyZTM0OWMwODkxZDY5MThmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTg2NzE1Mn0.QbA5zncaHuO_Smmqf19A6aDpoaF1f5HNTm6QnA_iYdY",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      [...new Set(res.data.map((e) => e.genre))].forEach((gene) => {
        setGenre((genre) => [...genre, gene]);
      });
    };
    callCategories();
  }, []);

  //list random/types/genre
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `https://immense-chamber-40390.herokuapp.com/api/lists${
            type ? "?type=" + type : ""
          }${selectGenre ? "?genre=" + selectGenre : ""} `,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVuaXRva2EiLCJpZCI6IjYxZGM4MDUyZTM0OWMwODkxZDY5MThmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTg2NzE1Mn0.QbA5zncaHuO_Smmqf19A6aDpoaF1f5HNTm6QnA_iYdY",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getRandomLists();
  }, [type, selectGenre]);
  const modal = useRef(null);
  //list go to home
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        if (goHome) {
          const res = await axios.get(
            "https://immense-chamber-40390.herokuapp.com/api/lists",
            {
              headers: {
                token:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVuaXRva2EiLCJpZCI6IjYxZGM4MDUyZTM0OWMwODkxZDY5MThmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTg2NzE1Mn0.QbA5zncaHuO_Smmqf19A6aDpoaF1f5HNTm6QnA_iYdY",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
          setGohome(false);
          setLists(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRandomLists();
  }, [goHome]);

  const handleClick = (e) => {
    const target = e.target;
    const modalCategories = modal.current;
    if (target.matches("#modal-genre-active")) {
      modalCategories.classList = "is-active";

      setModalContent(genre);
    }
    if (target.matches("#modal-movie-active")) {
      modalCategories.classList = "is-active";
      setModalContent(contentModal);
    }
    if (target.matches(".categories-close")) {
      modalCategories.classList.add("none");
      setModalContent(null);
    }
  };

  return (
    <div className="home">
      <Navbar
        handleClick={handleClick}
        modalContent={modalContent}
        modal={modal}
        type={type}
        setGohome={setGohome}
        setSelectGenre={setSelectGenre}
      />
      <main className="main-content">
        {lists.length > 0 ? (
          lists.map((movie, i) => (
            <List
              key={movie._id}
              title={movie.title}
              handleClick={handleClick}
              list={movie}
            />
          ))
        ) : (
          <p>Oops no movies</p>
        )}
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Home;
