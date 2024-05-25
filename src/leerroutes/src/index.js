import { LeerrouteWorkspace } from "./components/LeerrouteWorkspace.js";

// Check if exports is defined (Node.js environment)
if (typeof exports !== "undefined") {
  exports.LeerrouteWorkspace = LeerrouteWorkspace;
}

// Check if customElements is defined (browser environment)
if (typeof customElements !== "undefined") {
  customElements.define("leerroute-workspace", LeerrouteWorkspace);
}
