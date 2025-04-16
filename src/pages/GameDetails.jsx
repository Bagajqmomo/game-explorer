import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameDetails } from "../features/games/gameDetailsSlice";
import prevImg from "../assets/images/prev.png";
import Header from "../components/Header";

const platformIcons = {
  pc: "../src/assets/images/window.png",
  playstation: "../src/assets/images/ps.png",
  xbox: "../src/assets/images/xbox.png",
  ios: "../src/assets/images/mobile.png",
  android: "../src/assets/images/android.png",
};

const GameDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameDetails.item);
  const status = useSelector((state) => state.gameDetails.status);
  const platforms = game?.parent_platforms || [];

  useEffect(() => {
    dispatch(fetchGameDetails(id));
  }, [dispatch, id]);

  return (
    <div className="py-16">
      <Header
        onSearch={(term) => {
          // Navigate back to home with query param
          navigate(`/?search=${encodeURIComponent(term)}`);
        }}
      />
      {status === "loading" && (
        <div className="container m-auto min-h-[90vh] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
      {status === "failed" && (
        <p className="text-red-500">Failed to load games.</p>
      )}
      {status === "succeeded" && (
        <section className="container m-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex gap-4 mb-6 items-center cursor-pointer"
          >
            <img src={prevImg} className="max-h-5" />
            <span className="text-light font-semibold leading-5 text-xl">
              Back
            </span>
          </button>
          <img
            src={game.background_image}
            alt={game.name}
            className="mb-8 rounded-lg w-full object-cover max-h-[700px]"
          />
          <div className="flex gap-6 items-center mb-4 flex-wrap">
            <h1 className="text-4xl text-light font-bold">{game.name}</h1>
            <div className="flex gap-2">
              {platforms.map(({ platform }) => {
                const icon = platformIcons[platform.slug];
                return icon ? (
                  <img
                    key={platform.id}
                    src={icon}
                    alt={platform.name}
                    className="w-5 h-5"
                    title={platform.name}
                  />
                ) : null;
              })}
            </div>
          </div>
          <p className="text-lg mb-2 text-gray-400">Rating: {game.rating}</p>
          <p className="text-lg mb-2 text-gray-400">
            Released: {game.released}
          </p>
          <p className="text-base text-gray-300">{game.description_raw}</p>
        </section>
      )}
    </div>
  );
};

export default GameDetails;
