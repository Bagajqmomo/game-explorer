import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "../features/games/gamesSlice";
import logo from "../assets/images/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchGames({ search: searchTerm, page: 1 }));
    setSearchTerm(""); // Clear the search term after submission
  };

  return (
    <div className="container m-auto mb-16">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <img src={logo} className=" max-h-[66px] " />

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex gap-4 w-full justify-center"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a game..."
            className="w-full px-4 py-2 border rounded-3xl  search"
          />
        </form>
      </div>
    </div>
  );
};

export default Header;
