import App from "./App";
import "./index.css";
const { createRoot } = require("react-dom/client");

const el = document.getElementById("root");

const root = createRoot(el);

root.render(<App />);
