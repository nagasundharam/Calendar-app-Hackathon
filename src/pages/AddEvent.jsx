import { useState } from "react";

const AddEvent = () => {   // ✅ Accept props
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventColor, setEventColor] = useState("blue");

  const handleAddEvent = async () => {
    if (!eventDate || !eventName || !eventTime) return;

    const newEvent = {
      time: eventTime,
      name: eventName,
      color: eventColor
    };

    try {
      // ✅ Fetch existing events
      const response = await fetch("http://localhost:5000/events");
      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();

    // ✅ Ensure 'events' property exists
    if (!data.events) {
        data.events = {};
      }

      // ✅ Check if the date exists, if not, initialize it
      if (!data.events[eventDate]) {
        data.events[eventDate] = [];
      }

      // ✅ Add the new event to the array
      data.events[eventDate].push(newEvent);
      // ✅ Send updated events back to the server
      const updateResponse = await fetch("http://localhost:5000/events", {
        method: "PUT",   // Use PUT to update the entire object
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!updateResponse.ok) throw new Error("Failed to update events");

      console.log("Event added successfully!");

    

    } catch (error) {
      console.error("Failed to add event:", error);
    }

    // Clear form
    setEventDate("");
    setEventName("");
    setEventTime("");
    setEventColor("blue");
  };

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] bg-white shadow-md p-4 rounded-lg z-20">
      <h2 className="text-lg font-bold mb-3">➕ Add Event</h2>

      {/* Form Fields */}
      <div className="mb-3">
        <label className="block text-gray-700">Date:</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Time:</label>
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Color:</label>
        <select
          value={eventColor}
          onChange={(e) => setEventColor(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-md"
          onClick={() => setShowEventForm(false)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddEvent}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
