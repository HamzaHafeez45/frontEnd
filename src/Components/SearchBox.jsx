import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className="form-control my-2 border border-dark"
      name="query"
      type="text"
      placeholder="Search here...  (By name)"
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  );
};

export default SearchBox;
