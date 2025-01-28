import React, { useState, useEffect } from "react";

// List of time zones
const timeZones = [
  { label: "Local Time", value: "local" },
  { label: "UTC", value: "UTC" },
  { label: "New York (EST)", value: "America/New_York" },
  { label: "London (GMT)", value: "Europe/London" },
  { label: "Tokyo (JST)", value: "Asia/Tokyo" },
];

const TimeApp = () => {
  const [time, setTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState("local");
  const [is24Hour, setIs24Hour] = useState(false);

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time based on user preferences
  const getFormattedTime = () => {
    const options = {
      timeZone: timeZone === "local" ? undefined : timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !is24Hour,
    };

    return time.toLocaleTimeString(undefined, options);
  };

  // Format date for display
  const getFormattedDate = () => {
    const options = {
      timeZone: timeZone === "local" ? undefined : timeZone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return time.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Enhanced Time App</h1>

      {/* Display Time */}
      <div className="text-6xl font-mono mb-4">{getFormattedTime()}</div>

      {/* Display Date */}
      <div className="text-lg text-gray-500 mb-6">{getFormattedDate()}</div>

      {/* Time Zone Selector */}
      <select
        className="px-4 py-2 mb-4 rounded-lg border border-gray-300"
        value={timeZone}
        onChange={(e) => setTimeZone(e.target.value)}
      >
        {timeZones.map((zone) => (
          <option key={zone.value} value={zone.value}>
            {zone.label}
          </option>
        ))}
      </select>

      {/* 12-hour / 24-hour Toggle */}
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => setIs24Hour(!is24Hour)}
      >
        Switch to {is24Hour ? "12-hour" : "24-hour"} Format
      </button>
    </div>
  );
};

export default TimeApp;
