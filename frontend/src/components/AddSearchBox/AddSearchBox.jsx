import React from "react";

function AddSearchBox({type}) {
  
  return (
    <div>
      <input
        type="text"
        placeholder={`Search ${type}...`}
        className="w-full p-2 rounded border border-gray-300"
      />
    </div>
  );
}

export default AddSearchBox;
