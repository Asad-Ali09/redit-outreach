"use client";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OutreachListPage from "./pages/OutreachListPage";
import OutreachCreatePage from "./pages/OutreachCreatePage";
import { AnimatePresence } from "framer-motion";

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <NavigationBar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/products"
                element={
                  <PrivateRoute>
                    <ProductListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <PrivateRoute>
                    <ProductEditPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/outreaches"
                element={
                  <PrivateRoute>
                    <OutreachListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/outreaches/create"
                element={
                  <PrivateRoute>
                    <OutreachCreatePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
