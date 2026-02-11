import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AIModel from "./pages/AIModel";
import Economics from "./pages/Economics";
import ResearchChat from "./pages/ResearchChat";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-model" element={<AIModel />} />
          <Route path="/economics" element={<Economics />} />
          <Route path="/research-chat" element={<ResearchChat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
