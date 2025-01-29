import { useEffect, useState } from "react";
import { formatToIndiaISO } from "../../../../../../Constants/calculateKM";

export const DateFormatModal = () => {
  const [date, setDate] = useState(new Date());
  const [minimumDate, setMinimumDate] = useState(new Date());
  const [isDateTimeData, setIsDateTimeData] = useState("");
  const [normalDateFormat, setNormalDateFormat] = useState(null);

  // function and state to open and close modal
  const [isTimeModalOpenClose, setIsTimeModalOpenClose] = useState(false);
  const onTimeModalOpenCloseHandler = () => {
    setIsTimeModalOpenClose(!isTimeModalOpenClose);
  };

  // limiting the modal for maximunm date
  const maximumDate = new Date(minimumDate);
  maximumDate.setDate(minimumDate.getDate() + 6);

  const calculateNextInterval = () => {
    const now = date; // Use the selected date from state
    let currentMinutes = now.getMinutes();
    console.log(currentMinutes);

    let nextTime = new Date(now); // Start with the selected date

    // Apply minute intervals based on the current time
    if (currentMinutes === 0) {
      nextTime.setMinutes(15);
    } else if (currentMinutes >= 1 && currentMinutes <= 15) {
      nextTime.setMinutes(30);
    } else if (currentMinutes >= 16 && currentMinutes <= 30) {
      nextTime.setMinutes(45);
    } else if (currentMinutes >= 31 && currentMinutes <= 45) {
      nextTime.setHours(nextTime.getHours() + 1);
      nextTime.setMinutes(0);
    } else if (currentMinutes >= 46 && currentMinutes <= 59) {
      nextTime.setHours(nextTime.getHours() + 1);
      nextTime.setMinutes(15);
    }

    nextTime.setSeconds(0);
    console.log(nextTime.getHours());

    setMinimumDate(nextTime); // Set the minimum date based on calculated time
  };
  useEffect(() => {
    if (isTimeModalOpenClose) {
      calculateNextInterval(); // Recalculate when modal is opened
    }
  }, [isTimeModalOpenClose]); // Runs only when modal is toggled open

  // Trigger recalculation of minimumDate whenever the user picks a new time
  useEffect(() => {
    if (date) {
      calculateNextInterval(); // Recalculate when date is updated by user
    }
  }, [date]); // Runs whenever date state changes

  const onHandleTimeValueHandler = (date) => {
    const formattedIndiaTime = formatToIndiaISO(date);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      weekday: "short",
    };

    const formattedDate = date.toLocaleDateString("en-GB", options);
    setIsDateTimeData(formattedIndiaTime);
    setNormalDateFormat(formattedDate);
  };

  const setNewDate = (date) => {
    setMinimumDate(date);
    onHandleTimeValueHandler(date);
  };

  return {
    setNewDate,
    normalDateFormat,
    minimumDate,
    maximumDate,
    onTimeModalOpenCloseHandler,
    isTimeModalOpenClose,
    date,
    isDateTimeData,
    setMinimumDate,
    setDate,
  };
};
