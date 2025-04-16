import React, { useState } from "react";
import { fetchGames } from "../features/games/gamesSlice";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    onSearch(searchTerm);
    setSearchTerm(""); // Optional: clear after search
  };

  return (
    <div className="container m-auto mb-16">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <Link to="/">
          <img src={logo} className=" max-h-[66px] " />
        </Link>

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
