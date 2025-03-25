import React, { useState, useEffect } from "react";
import MiniCalendar from "./MiniCalendar";
import AddEvent from "./AddEvent";

const Calendar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2025-03-25");
  const [events, setEvents] = useState({});

  // Fetch events from json-server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");
        if (!response.ok) throw new Error("Network issue");

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle menu and event form
  const toggleMenu = () => setShowMenu((prev) => !prev);
  const toggleEventForm = () => setShowEventForm((prev) => !prev);

  // Handle date selection
  const selectDate = (date) => {
    setSelectedDate(date);
    setShowMenu(false);
  };

  // Add event (POST request)
  const addEvent = async (newEvent) => {
    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        setEvents((prev) => ({
          ...prev,
          [newEvent.date]: [...(prev[newEvent.date] || []), updatedEvent],
        }));
      }
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-[375px] md:w-[500px] lg:w-[720px] h-[90vh] max-h-[720px] bg-white shadow-lg rounded-lg relative">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button className="text-lg" onClick={toggleMenu}>☰</button>
          <div className="text-sm font-medium">{selectedDate}</div>
          <div className="flex items-center gap-2">
            <button className="text-blue-500">🔍</button>
            <button className="text-blue-500" onClick={toggleEventForm}>➕</button>
          </div>
        </div>

        {/* Mini Calendar */}
        {showMenu && (
          <MiniCalendar
            selectedDate={selectedDate}
            events={events}
            selectDate={selectDate}
          />
        )}

        {/* Add Event Form */}
        {showEventForm && (
          <AddEvent addEvent={addEvent} closeForm={() => setShowEventForm(false)} />
        )}

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-4 p-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
            <div key={index} className="border-b last:border-b-0 p-4 text-gray-700">
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
