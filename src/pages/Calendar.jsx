import React from "react";

const Calendar = () => {
  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const Navbar = ()=> {
    console.log("navbar is open");
  }
   
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[375px] h-[720px] bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button className="text-lg" onClick = {()=>{Navbar()}}>☰</button>
          <div className="text-sm font-medium">01-07 Jan 2022</div>
          <div className="flex items-center gap-2">
            <button className="text-blue-500">📅</button>
            <button className="text-blue-500">🔍</button>
            <button className="text-blue-500">⟳</button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-rows-7 gap-y-4 p-4">
          {days.map((day, index) => (
            <div
              key={index}
              className="border-b last:border-b-0 p-4 text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>
        <div>
          
        </div>

      </div>
    </div>
  );
};

export default Calendar;
