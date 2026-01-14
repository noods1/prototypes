import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Import Keystone Design Tokens (commented out - not available in build)
// import "@fe-infra/keystone-design-tokens/index.css";
// import "@fe-infra/keystone-design-tokens/root.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
