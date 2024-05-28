import React from "react";
import { TextField } from "@mui/material";

function SearchComponent({ search, setSearch }) {
  return (
    <input
    id="search"
    name="search"
    type="text"
    value={search}
    onChange={(e)=>{setSearch(e.target.value)}}
    className="form-input w-full p-2 border-2 rounded border-current bg-transparent text-emerald-300 m-3"
    placeholder="Search Sonet"
    required
  />
  );
}

export default SearchComponent;
