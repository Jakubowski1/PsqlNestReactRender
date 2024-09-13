import React from "react";

export default function MovingGradientBackground({ children }) {
  return (
    <div>
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <div
        style={{
          background:
            "linear-gradient(270deg, #a6c1ff, #d9e8ff, #f0f8ff, #e0ccff)",
          backgroundSize: "400% 400%",
          animation: "gradientAnimation 15s ease infinite",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
