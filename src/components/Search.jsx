import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(async () => {}, [searchInput]);

  //   const handleSearchInputChange = (event) => {
  //     const searchValue = event.target.value;
  //     searchInput(searchValue);
  //     debounceSearch(value);
  //   };

  return (
    <div>
      <input
        type="search"
        placeholder="Enter Location"
        value={searchInput}
        onChange={(event) => searchInput(event.target.value)}
      />
    </div>
  );
};

export default Search;
