"use client";
import React, { useState } from "react";

const SegmentedControl = () => {
  const [selected, setSelected] = useState("Income");

  return (
    <div className="my-4 w-full">
      <div className="inline-flex w-full rounded-full border border-gray-300 bg-gray-100 p-1">
        <button
          className={`px-4 py-2 rounded-full focus:outline-none transition-all duration-300 ${
            selected === "Income" ? "bg-white shadow" : ""
          }`}
          onClick={() => setSelected("Income")}
        >
          Income
        </button>
        <button
          className={`px-4 py-2 rounded-full focus:outline-none transition-all duration-300 ${
            selected === "Expense" ? "bg-white shadow" : ""
          }`}
          onClick={() => setSelected("Expense")}
        >
          Expense
        </button>
      </div>
    </div>
  );
};

export default SegmentedControl;
