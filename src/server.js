import express from "express";
import cors from "cors";
import morgan from "morgan";
import prisma from "./lib/prisma.js";
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";
import { FRONTEND_URL, WA_URL } from "./utils/constants.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", routes);

// Error handling
app.use(errorHandler);

// Graceful shutdown
const shutdown = async () => {
  try {
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WhatsApp URL: ${WA_URL}`); // Print the WhatsApp URL to the console);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});
