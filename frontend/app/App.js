import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow fixed top-0 left-0 right-0 z-50">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Telegram Bot
          </h1>
          <div className="space-x-6">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/features" className="hover:text-blue-600">Features</Link>
            <Link to="/how-it-works" className="hover:text-blue-600">How It Works</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        </nav>

        {/* Routes */}
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 bg-gray-50 border-t">
          <p className="text-gray-600">
            © {new Date().getFullYear()} AI Telegram Bot · 
            <Link to="/privacy" className="hover:underline mx-2">Privacy</Link> · 
            <Link to="/terms" className="hover:underline mx-2">Terms</Link>
          </p>
        </footer>
      </div>
    </Router>
  );
}
