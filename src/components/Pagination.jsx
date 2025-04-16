import React from "react";
import nextImg from "../assets/images/next.png";
import prevImg from "../assets/images/prev.png";

const Pagination = ({ next, previous, onPageChange }) => {
  const handlePrevious = () => {
    if (previous) {
      onPageChange({ fullUrl: previous });
    }
  };

  const handleNext = () => {
    if (next) {
      onPageChange({ fullUrl: next });
    }
  };

  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <button
        onClick={handlePrevious}
        className="p-4  rounded-full bg-primary hover:bg-tertiary text-light cursor-pointer"
        disabled={!previous}
      >
        <img src={prevImg} className="max-h-5" />
      </button>
      <button
        onClick={handleNext}
        className="p-4 rounded-full bg-primary  hover:bg-tertiary text-light cursor-pointer"
        disabled={!next}
      >
        <img src={nextImg} className="max-h-5" />
      </button>
    </div>
  );
};

export default Pagination;
