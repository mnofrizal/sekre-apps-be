import { customAlphabet } from "nanoid";

export const generateToken = () => {
  const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
  return nanoid();
};

export const getMealCategory = (date) => {
  const hours = new Date(date).getHours();

  // Breakfast 6 AM WIB (23:00 UTC previous day)
  if (hours >= 23 || hours < 5) {
    return "Sarapan";
  }
  // Lunch 12 PM WIB (5:00 UTC)
  else if (hours >= 5 && hours < 9) {
    return "Makan Siang";
  }
  // Afternoon meal 4 PM WIB (9:00 UTC)
  else if (hours >= 9 && hours < 17) {
    return "Makan Sore";
  }
  // Dinner 11:59 PM WIB (16:59 UTC)
  else if (hours >= 17 && hours < 23) {
    return "Makan Malam";
  }
  return ""; // fallback
};
