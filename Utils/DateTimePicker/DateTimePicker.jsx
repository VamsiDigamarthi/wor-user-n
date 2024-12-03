import React, { useState } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const DateTimePicker = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  // Days (1-31)
  const days = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  // Months (1-12)
  const months = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));
  // Years (let's say 2020 to 2030)
  const years = Array.from({ length: 11 }, (_, i) => ({
    label: `${2020 + i}`,
    value: 2020 + i,
  }));

  // Hours (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => ({
    label: i < 10 ? `0${i}` : `${i}`,
    value: i,
  }));

  // 15-minute intervals (00, 15, 30, 45)
  const minutes = [
    { label: "00", value: 0 },
    { label: "15", value: 15 },
    { label: "30", value: 30 },
    { label: "45", value: 45 },
  ];
  return (
    <View style={{ padding: 20 }}>
      <Text>Select Date</Text>

      {/* Day Picker */}
      <RNPickerSelect
        onValueChange={(value) => setSelectedDay(value)}
        items={days}
        placeholder={{ label: "Select Day", value: null }}
      />

      {/* Month Picker */}
      <RNPickerSelect
        onValueChange={(value) => setSelectedMonth(value)}
        items={months}
        placeholder={{ label: "Select Month", value: null }}
      />
      {/* Year Picker */}
      <RNPickerSelect
        onValueChange={(value) => setSelectedYear(value)}
        items={years}
        placeholder={{ label: "Select Year", value: null }}
      />

      <Text>Select Time</Text>

      {/* Hour Picker */}
      <RNPickerSelect
        onValueChange={(value) => setSelectedHour(value)}
        items={hours}
        placeholder={{ label: "Select Hour", value: null }}
      />

      {/* Minute Picker */}
      <RNPickerSelect
        onValueChange={(value) => setSelectedMinute(value)}
        items={minutes}
        placeholder={{ label: "Select Minute", value: null }}
      />
      {/* Display selected date and time */}
      <Text style={{ marginTop: 20 }}>
        Selected Date: {selectedDay !== null ? selectedDay : "--"}/{" "}
        {selectedMonth !== null ? selectedMonth : "--"}/{" "}
        {selectedYear !== null ? selectedYear : "--"}
      </Text>
      <Text>
        Selected Time: {selectedHour !== null ? selectedHour : "--"}:{" "}
        {selectedMinute !== null ? selectedMinute : "--"}
      </Text>
    </View>
  );
};

export default DateTimePicker;
