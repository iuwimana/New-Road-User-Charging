import React from "react";
import IconCaretsDown from '../../Icon/IconPlusCircle';

export const ExpendableButton = ({ isOpen, toggle }) => {
  return (
    <button
  onClick={toggle}
  style={{
    border: "none",
    background: isOpen ? "#e3f2fd" : "#f8f9fa",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
    boxShadow: isOpen ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
  }}
>

      
<IconCaretsDown
  className="material-symbols-outlined"
  style={{
    transform: `rotate(${isOpen ? 180 : 0}deg) scale(${isOpen ? 1.2 : 1})`,
    transition: "transform 0.3s ease",
    height: 24,
    width: 24,
    color: "#007bff", // better visibility
  }}
>
  expand_more
</IconCaretsDown>

    </button>
  );
};
