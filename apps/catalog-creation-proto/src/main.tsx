import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Import Keystone Design Tokens (commented out - not available in build)
// import "@fe-infra/keystone-design-tokens/index.css";
// import "@fe-infra/keystone-design-tokens/root.css";
import "./index.css";

// Error handling for app rendering
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
} else {
  try {
    createRoot(rootElement).render(<App />);
  } catch (error) {
    console.error("Error rendering app:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: red;">
        <h1>Error loading app</h1>
        <p><strong>Error:</strong> ${error instanceof Error ? error.message : String(error)}</p>
        <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error instanceof Error ? error.stack : ''}</pre>
      </div>
    `;
  }
}
