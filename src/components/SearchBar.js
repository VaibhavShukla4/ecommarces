import React from "react";
import { iosSearch } from "react-icons-kit/ionicons/iosSearch";
import { closeRound } from "react-icons-kit/ionicons/closeRound";
import { Icon } from "react-icons-kit";
const SearchBar = ({ setSearchInput, searchInput }) => {
  return (
    <div>
      <input
        onKeyPress={(e) => e.key == "Enter" && setSearchInput(e.target.value)}
        placeholder="Search here"
        id="searchQueryInput"
        className="form-control me-2"
      />

      {searchInput && (
        <Icon
          icon={closeRound}
          onClick={() => {
            setSearchInput("");
            document.getElementById("searchQueryInput").value = "";
          }}
        />
      )}
      <button
        onClick={() =>
          setSearchInput(document.getElementById("searchQueryInput").value)
        }
        aria-label="search user"
      >
        <Icon icon={iosSearch} />
      </button>
    </div>
  );
};

export default SearchBar;
