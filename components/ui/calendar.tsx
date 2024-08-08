import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const Calendar = () => {
  return (
    <div className="p-4 rounded-lg  shadow-lg">
      <DayPicker />
    </div>
  );
};
