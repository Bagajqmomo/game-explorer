// components/Header.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

  return (
    <div className="container m-auto mb-16">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="max-h-[66px]" />
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex gap-4 w-full justify-center"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a game..."
            className="w-full px-4 py-2 border rounded-3xl search"
          />
        </form>
      </div>
    </div>
  );
};

export default Header;
