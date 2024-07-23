import React from "react";
import IconCaretsDown from '../../Icon/IconPlusCircle';

export const ExpendableButton = ({ isOpen, toggle }) => {
  return (
    <button onClick={toggle}>
      
<IconCaretsDown className="material-symbols-outlined"
style={{
  transform: `rotate(${isOpen ? 180 : 0}deg)`,
  transition: "all 0.25s",
  height: 65,
  width: 85,
  backgroundcolor: "white",
}}>


        expand_more
      </IconCaretsDown>
    </button>
  );
};
