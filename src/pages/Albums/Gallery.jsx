import React from "react";

const Gallery = ({ photos }) => {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-2">
        {photos.map((photo, i) => {
          return (
            <div key={i} className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img
                  className="mask mask-square"
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                />
              </figure>
              <div className="card-body items-center">
                <h2 className="card-title text-center">{photo.title}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
