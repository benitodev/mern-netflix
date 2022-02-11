export const Modal = ({ modal, handleClick, content, setSelectGenre }) => {
  return (
    <div className="categories" style={{ overflowY: "scroll" }} ref={modal}>
      <ul>
        {content &&
          content.map((item, i) => (
            <li
              key={i}
              onClick={(e) => {
                setSelectGenre(e.target.innerText);
              }}
            >
              {item}
            </li>
          ))}
      </ul>
      <div className="categories-close" onClick={handleClick}>
        <div
          style={{
            position: "relative",
            width: "inherit",
            height: "inherit",
          }}
        >
          <span
            style={{
              color: "black",
              fontSize: "38px",
              position: "absolute",
              top: "15px",
              left: "30px",
            }}
          >
            x
          </span>
        </div>
      </div>
    </div>
  );
};
