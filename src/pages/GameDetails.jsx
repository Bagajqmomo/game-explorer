import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameDetails } from "../features/games/gameDetailsSlice";
import prevImg from "../assets/images/prev.png";
import Header from "../components/Header";
import platformIcons from "../utils/platformIcons";

const GameDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item: game, status } = useSelector((state) => state.gameDetails);

  useEffect(() => {
    if (id) dispatch(fetchGameDetails(id));
  }, [dispatch, id]);

  console.log("Game object:", game);
  console.log("Status:", status);

  return (
    <div className="py-16">
      <Header />
      {status === "loading" && (
        <div className="min-h-[90vh] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}

      {status === "failed" && (
        <p className="text-red-500 text-center mt-8">Failed to load game.</p>
      )}

      {status === "succeeded" && game ? (
        <section className="container m-auto">
          <button
            on
            onClick={() => navigate(-1)}
            className="flex gap-4 mb-6 items-center cursor-pointer"
          >
            <img src={prevImg} className="max-h-5" />
            <span className="text-light font-semibold leading-5 text-xl">
              Back
            </span>
          </button>

          {game.background_image && (
            <img
              src={game.background_image}
              alt={game.name}
              className="mb-6 rounded-lg shadow-lg"
            />
          )}
          <div className="flex gap-6 items-center mb-4 flex-wrap">
            <h1 className="text-4xl text-light font-bold">{game.name}</h1>
            <div className="flex gap-4 flex-wrap">
              {game.platforms?.map((p) => {
                const slug = p.platform?.slug;
                const icon = platformIcons[slug];
                return icon ? (
                  <img key={slug} src={icon} alt={slug} className="w-5 h-5" />
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
      ) : (
        <span className="text-4xl text-light">No content</span>
      )}
    </div>
  );
};

export default GameDetails;
