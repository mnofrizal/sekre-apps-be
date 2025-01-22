import { customAlphabet } from "nanoid";

export const generateToken = () => {
  const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
  return nanoid();
};

export const getMealCategory = (date) => {
  const hours = new Date(date).getHours();

  // Breakfast 4 AM - 11:59 AM WIB (21:00 - 04:59 UTC)
  if (hours >= 4 && hours < 12) {
    return "Sarapan";
  }
  // Lunch 12 PM - 2 PM WIB (05:00 - 07:00 UTC)
  else if (hours >= 12 && hours < 14) {
    return "Makan Siang";
  }
  // Afternoon meal 2 PM - 6 PM WIB (07:00 - 11:00 UTC)
  else if (hours >= 14 && hours < 18) {
    return "Makan Sore";
  }
  // Dinner 7 PM - 4 AM WIB (12:00 - 21:00 UTC)
  else if (hours >= 19 || hours < 4) {
    return "Makan Malam";
  }
  return ""; // fallback
};
