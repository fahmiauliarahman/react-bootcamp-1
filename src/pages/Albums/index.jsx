import axios from "axios";
import React, { useEffect, useState } from "react";
import Layouts from "../Layouts";
import Carousel from "./Carousel";
import Loading from "../../components/Loading";
import Gallery from "./Gallery";

const Albums = () => {
  const [limit, setLimit] = useState(3);
  const [activeAlbum, setActiveAlbum] = useState(1);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/albums?_limit=10`)
      .then((res) => {
        setAlbums(res.data);
      });
  }, [activeAlbum]);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/albums/${activeAlbum}/photos?_limit=${limit}`
        )
        .then((res) => {
          setPhotos(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
      return () => {
        isCancelled = true;
      };
    }
  }, [activeAlbum, limit]);

  const handleLimit = (e) => {
    if (e === "+") {
      setLimit((prev) => prev + 1);
    } else {
      setLimit((prev) => prev - 1);
    }
  };

  const handleAlbum = (e) => {
    setActiveAlbum(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layouts>
      <div className="flex flex-col lg:flex-row my-3 justify-center lg:justify-between items-center pb-6">
        <div className="w-full  text-center lg:text-left">
          <h1 className="text-4xl font-bold">Albums</h1>
          <i>Showing photos from our best albums.</i>
        </div>
        <div className="flex w-full flex-col md:flex-row justify-center lg:justify-end gap-3">
          <div className="form-control w-full max-w-xs items-center flex flex-col self-center">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Limit Photos</span>
              </label>
            </div>
            <div className="w-full flex items-center">
              {limit > 1 && (
                <button
                  onClick={() => {
                    handleLimit("-");
                  }}
                  className="btn rounded-lg hover:bg-primary hover:border-primary hover:text-primary-content"
                >
                  -
                </button>
              )}
              <p className="inline w-full max-w-xs text-white text-center">
                {limit}
              </p>
              {limit < 10 && (
                <button
                  onClick={() => {
                    handleLimit("+");
                  }}
                  className="btn rounded-lg hover:bg-primary hover:border-primary hover:text-primary-content"
                >
                  +
                </button>
              )}
            </div>
          </div>
          <div className="form-control w-full max-w-xs self-center">
            <label className="label">
              <span className="label-text">Filter Albums</span>
            </label>
            <select
              className="select select-bordered"
              onChange={handleAlbum}
              value={activeAlbum}
            >
              <option disabled>Pick one</option>
              {albums.map((album) => {
                return (
                  <option key={album.id} value={album.id}>
                    {album.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <Carousel photos={photos} />
      <div className="w-full py-5 text-center lg:text-left">
        <h1 className="text-4xl font-bold">List View</h1>
        <i>
          Showing <span className="font-bold text-primary">{limit}</span>{" "}
          contents from selected album.
        </i>
      </div>
      <Gallery photos={photos} />
    </Layouts>
  );
};

export default Albums;
