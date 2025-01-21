import { customAlphabet } from "nanoid";

export const generateToken = () => {
  const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
  return nanoid();
};

export const getMealCategory = (date) => {
  const hours = new Date(date).getHours();

  if (hours >= 4 && hours < 8) {
    return "Sarapan";
  } else if (hours >= 8 && hours < 12) {
    return "Makan Siang";
  } else if (hours >= 12 && hours < 17) {
    return "Makan Sore";
  } else if (hours >= 17 || hours < 4) {
    return "Makan Malam";
  }
  return ""; // fallback
};
