import { useEffect, useState } from "react";
import axios from "axios";

const ListItem = ({ movie, modalClick }) => {
  const [dataMovie, setDataMovie] = useState({});

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/movies/${movie}
            `,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVuaXRva2EiLCJpZCI6IjYxZGM4MDUyZTM0OWMwODkxZDY5MThmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTg2NzE1Mn0.QbA5zncaHuO_Smmqf19A6aDpoaF1f5HNTm6QnA_iYdY",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const item = res.data;
        setDataMovie(item);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, [movie]);

  return (
    <>
      <div id={movie} onClick={modalClick} className="list-item">
        <img
          src={dataMovie.imgSm}
          className="list-item-image"
          alt={dataMovie.title}
        />
      </div>
    </>
  );
};

export default ListItem;
