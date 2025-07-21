const app = require("./app");
const cors = require("cors");
app.use(cors({
  origin: process.env.FRONTEND_URL, // Add frontend URL later
  credentials: true
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));