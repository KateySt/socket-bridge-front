import React from "react";

const Stars = ({score, outOf = 10, starsCount = 5}: { score: number, outOf?: number, starsCount?: number }) => {
  const rating = Math.round((score / outOf) * starsCount);
  return (
    <div className="flex gap-1 text-yellow-400 text-xl">
      {Array.from({length: starsCount}, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default Stars;