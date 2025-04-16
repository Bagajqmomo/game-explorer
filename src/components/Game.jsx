import React from "react";
import { Link } from "react-router-dom";

const platformIcons = {
  pc: "../src/assets/images/window.png",
  playstation: "../src/assets/images/ps.png",
  xbox: "../src/assets/images/xbox.png",
  ios: "../src/assets/images/mobile.png",
  android: "../src/assets/images/android.png",
};

const Game = ({ game }) => {
  const platforms = game.parent_platforms || [];

  return (
    <Link to={`games/${game.id}`}>
      <div className="bg-card h-full rounded-xl shadow-card overflow-hidden flex flex-col">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-[180px] object-cover rounded-md"
        />
        <div className="p-5 pb-5 flex flex-col gap-2">
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
          <h3 className="text-2xl text-light font-semibold">{game.name}</h3>
          <p className="text-sm text-gray-500">Rating: {game.rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default Game;
