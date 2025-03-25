import { useState,useEffect } from "react";

const  MiniCalendar= (props) => {
    
    const [selectedDate,selectDate] = useState("")
 

    const [events,setEvent] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/events");
          
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
  
          const result = await response.json();
          console.log(result);
         
          setEvent(result.events);
          
        } catch (error) {
          console.error("Error fetching data:", error);
          
        }
      };
  
      fetchData();
    }, []);
    return (
        <div className="absolute left-0 top-16  w-[280px] bg-white shadow-md p-4 rounded-lg z-10">
            <h2 className="text-lg font-bold mb-3">January</h2>
            <div className="grid grid-cols-7 text-center text-sm gap-1">
              {["m", "t", "w", "t", "f", "s", "s"].map((d, i) => (
                <div key={i} className="font-bold">{d}</div>
              ))}
              {[...Array(31)].map((_, i) => {
                const date = `2025-03-${String(i + 1).padStart(2, "0")}`;
                return (
                  <button
                    key={i}
                    onClick={() => selectDate(date)}
                    className={`p-1 rounded-2xl hover:bg-blue-100 ${
                      date === selectedDate ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="p-4">
          <h2 className="text-lg font-bold mb-2">📅 Events on {selectedDate}</h2>
          {events[selectedDate] ? (
            events[selectedDate].map((event, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-3 p-2 rounded-md shadow-sm"
                style={{ borderLeft: `4px solid ${event.color}` }}
              >
                <div>
                  <span className={`text-${event.color}-500 font-medium`}>
                    {event.name}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{event.time}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No events scheduled</p>
          )}
        </div>

          </div>
      );
}
 
export default MiniCalendar;