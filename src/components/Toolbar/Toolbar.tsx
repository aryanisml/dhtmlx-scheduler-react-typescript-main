import React from "react";
import "./Toolbar.css";

function Toolbar(props: any): JSX.Element {
    const { timeFormatState, handleTimeFormatStateChange } = props;

    return (
        <div className="tool-bar">
            <div className="time-format-section">
                <label className="time-format-chkbx">
                    Time format:
                    <input
                        type="checkbox"
                        checked={timeFormatState}
                        onChange={handleTimeFormatStateChange} />
                    <div className="chkbx-text"></div>
                </label>
            </div>
        </div>
    );
}

export default Toolbar;
