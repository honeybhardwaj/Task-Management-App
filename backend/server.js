const app = require("./app");
const cors = require("cors");
app.use(cors({
  origin: process.env.FRONTEND_URL, // Add frontend URL later
  credentials: true
}));
const allowedOrigins = [
  "http://localhost:3000",
  "https://task-management-app-ten-teal.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));