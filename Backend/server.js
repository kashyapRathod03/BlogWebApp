const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");
const { cacheNoStore } = require("./Middlewares/cache/cacheControl");

// Load environment configuration from Backend/Config/config.env or .env
const envPaths = [
  path.resolve(__dirname, "Config/config.env"),
  path.resolve(__dirname, "../Config/config.env"),
  path.resolve(__dirname, ".env"),
  path.resolve(__dirname, "../.env"),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

connectDatabase();

const app = express();

// Security & Parsing
app.use(express.json());

// Production CORS Configuration
const allowedOrigins = [
  "https://techorcas.blog",
  "https://www.techorcas.blog",
  "https://techorcas.co",
  "https://www.techorcas.co",
  "http://localhost:5173",
  "http://localhost:3000",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ""));
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, or same-origin on Hostinger)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Permissive fallback for staging/preview domains
      return callback(null, true);
    },
    credentials: true,
  })
);

// Lightweight Health Check Route (No DB query, Cache-Control: no-store)
app.get(["/api/health", "/health"], cacheNoStore, (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Mount API & Feature Routes
app.use("/", IndexRoute);

// Serve static uploaded assets from public/ (storyImages, userPhotos)
app.use(express.static(path.join(__dirname, "public")));

// Express Static Serving & SPA Fallback for Hostinger Managed Node.js
const candidateDistPaths = [
  path.resolve(__dirname, "../Frontend/dist"),
  path.resolve(__dirname, "dist"),
  path.resolve(__dirname, "../dist"),
  path.resolve(__dirname, "../Frontend/build"),
];

const distDir = candidateDistPaths.find((p) => fs.existsSync(p));

if (distDir) {
  console.log(`Serving unified production frontend from: ${distDir}`);

  // Serve hashed assets (/assets/*, .js, .css, .woff2) with 1-year immutable cache
  app.use(
    express.static(distDir, {
      maxAge: "1y",
      immutable: true,
      index: false,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          // Serve index.html with no-cache so deployments reflect immediately
          res.setHeader("Cache-Control", "no-cache, must-revalidate");
        } else if (
          filePath.includes("/assets/") ||
          filePath.includes("\\assets\\") ||
          /\.(js|css|woff2|webp|png|jpg|jpeg|svg)$/.test(filePath)
        ) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );

  // Catch-all SPA fallback route for React Router URLs (/article/*, /dashboard, etc.)
  app.get("*", (req, res, next) => {
    if (
      req.path.startsWith("/api") ||
      req.path.startsWith("/auth") ||
      req.path.startsWith("/story") ||
      req.path.startsWith("/user") ||
      req.path.startsWith("/comment") ||
      req.path.startsWith("/storyImages") ||
      req.path.startsWith("/userPhotos")
    ) {
      return next();
    }

    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.sendFile(path.join(distDir, "index.html"));
  });
}

// Error Handler
app.use(customErrorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV || "development"}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Logged Error : ${err}`);
});
