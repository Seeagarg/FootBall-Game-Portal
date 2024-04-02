import React from "react";

const LastMatchesResults = ({data}) => {
  return (
    <div >
      {data == "W" ? (
        <div className="rounded-lg p-2 bg-green-500"> W </div>
      ) : data == "L" ? (
        <div className="rounded-lg p-2 bg-red-500"> L </div>
      ) : (
        <div className="rounded-lg p-2 bg-black"> D </div>
      )}
    </div>
  );
};

export default LastMatchesResults;
