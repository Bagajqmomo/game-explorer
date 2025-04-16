import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "../features/games/gamesSlice";
import Pagination from "../components/pagination";
import Header from "../components/Header";
import Game from "../components/Game";

import noData from "../assets/images/no-data.png";

const Home = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.items);
  const status = useSelector((state) => state.games.status);
  const nextPageUrl = useSelector((state) => state.games.nextPageUrl);
  const prevPageUrl = useSelector((state) => state.games.prevPageUrl);
  const currentPage = useSelector((state) => state.games.currentPage);

  // Fetch initial data when the component is mounted
  useEffect(() => {
    dispatch(fetchGames({ search: "", page: 1 }));
  }, [dispatch]);

  const handlePageChange = ({ fullUrl }) => {
    dispatch(fetchGames({ fullUrl }));
  };

  return (
    <div className="py-16">
      <Header
        onSearch={(term) => dispatch(fetchGames({ search: term, page: 1 }))}
      />
      {/* Status Messages */}
      {status === "loading" && (
        <div className="container m-auto min-h-[90vh] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
      {status === "failed" && (
        <p className="text-red-500">Failed to load games.</p>
      )}

      {/* Pagination Controls */}
      {status === "succeeded" && (
        <section className="container m-auto">
          <h2 className="text-light text-3xl font-bold mb-8">Game List</h2>
          {games.length === 0 ? (
            <div className="flex flex-col gap-6 justify-center items-center min-h-[90vh]">
              <img src={noData} className="max-w-[88px]" />
              <p className="text-gray-400 text-center mt-8 text-lg">
                No games found. Try a different search.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  2xl:grid-cols-5">
                {games.map((game) => (
                  <Game game={game} key={game.id} />
                ))}
              </div>
              <Pagination
                onPageChange={handlePageChange}
                next={nextPageUrl}
                previous={prevPageUrl}
                currentPage={currentPage}
              />
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;
