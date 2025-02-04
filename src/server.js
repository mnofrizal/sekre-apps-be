import express from "express";
import cors from "cors";
import morgan from "morgan";
import prisma from "./lib/prisma.js";
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";
import { FRONTEND_URL, WA_URL } from "./utils/constants.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Trust proxy (needed for Cloudflare)
app.set("trust proxy", true);

// Middleware
app.use(cors());
app.use(morgan("dev"));

// Body parsing with raw body access
app.use(
  express.json({
    limit: "10mb",
    strict: true,
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Log all requests
app.use((req, res, next) => {
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
  console.log("Raw Body:", req.rawBody?.toString());
  console.log("Parsed Body:", req.body);
  console.log("Content-Type:", req.get("content-type"));
  console.log("CF-Connecting-IP:", req.get("cf-connecting-ip"));
  next();
});

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
