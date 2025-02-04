import React from 'react';

function ThreeDModel() {
  return (
    <div className="w-full h-[500px]">
      <iframe
        title="DNA Model"
        src="https://sketchfab.com/models/6c223b3beea04cb69b5c531eef8ac88c/embed" // Replace with your Sketchfab embed link
        style={{ border: "none" }}
        width="100%"
        height="100%"
        // allow="autoplay; fullscreen; xr-spatial-tracking"
      />
    </div>
  );
}

export default ThreeDModel;
