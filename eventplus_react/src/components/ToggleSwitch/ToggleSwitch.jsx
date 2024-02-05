import React from 'react';
import "./ToggleSwitch.css";

const ToggleSwitch = ({manipulationFunction = null, toggleActive = false}) => { 
      return (
        <>
          <input type="checkbox" id="switch-check" className="toggle__switch-check" />
    
          <label className={`toggle ${toggleActive ? "toggle--active" : ""}`} htmlFor="switch-check" onClick={manipulationFunction}>
            <div className={`toggle__switch ${toggleActive ? "toggle__switch--active" : ""}`}></div>
          </label>
        </>
      );
};

export default ToggleSwitch;