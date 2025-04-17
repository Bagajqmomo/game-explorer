// pages/Home.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchGames } from "../features/games/gamesSlice";

import Header from "../components/Header";
import Game from "../components/Game";
import Pagination from "../components/Pagination";
import noData from "../assets/images/no-data.png";

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const {
    items: games,
    status,
    nextPageUrl,
    prevPageUrl,
    currentPage,
  } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ search: searchTerm, page: 1 }));
  }, [dispatch, searchTerm]);

  const handlePageChange = ({ fullUrl }) => {
    dispatch(fetchGames({ fullUrl }));
  };

  return (
    <div className="py-16">
      <Header />

      {/* Loading */}
      {status === "loading" && (
        <div className="container m-auto min-h-[90vh] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}

      {/* Error */}
      {status === "failed" && (
        <p className="text-red-500 text-center mt-8">Failed to load games.</p>
      )}

      {/* Game List */}
      {status === "succeeded" && (
        <section className="container m-auto">
          <h2 className="text-light text-3xl font-bold mb-8">Game List</h2>

          {games.length === 0 ? (
            <div className="flex flex-col gap-6 justify-center items-center min-h-[90vh]">
              <img src={noData} alt="No Data" className="max-w-[88px]" />
              <p className="text-gray-400 text-center mt-8 text-lg">
                No games found. Try a different search.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5">
                {games.map((game) => (
                  <Game key={game.id} game={game} />
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
