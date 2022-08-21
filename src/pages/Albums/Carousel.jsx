import React from "react";

const Carousel = ({ photos }) => {
  return (
    <>
      <div className="carousel w-full h-96">
        {photos.map((photo, index) => {
          const i = index + 1;
          return (
            <div
              key={i}
              id={`slide${i}`}
              className="carousel-item relative w-full"
            >
              <img
                alt="carousel-img"
                src={photo.url}
                className="w-full"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a
                  href={`#slide${i === 1 ? photos.length : i - 1}`}
                  className="btn btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`#slide${i === photos.length ? 1 : i + 1}`}
                  className="btn btn-circle"
                >
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {photos.map((photo, index) => {
          const i = index + 1;
          return (
            <a key={i} href={`#slide${i}`} className="btn btn-xs">
              {i}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Carousel;
