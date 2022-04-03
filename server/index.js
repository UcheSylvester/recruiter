import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// create app
const app = express();

const port = process.env.PORT || 3000;

// connect to database
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to database"));

app.listen(port, () => console.log(`Server is listening on port ${port}`));
