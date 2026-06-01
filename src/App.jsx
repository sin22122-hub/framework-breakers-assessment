import Assessment from "./pages/Assessment.jsx";
import FrameworkGuidance from "./pages/FrameworkGuidance.jsx";

export default function App() {
  const path = typeof window !== "undefined" ? window.location.pathname.replace(/\/$/, "") : "";
  if (path === "/framework-guidance") return <FrameworkGuidance />;
  return <Assessment />;
}
