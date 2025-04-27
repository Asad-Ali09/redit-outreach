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
import ChatPage from "./pages/ChatPage";
import ChatNotificationBadge from "./components/ChatNotificationBadge";
import { AnimatePresence } from "framer-motion";
import OutreachDetailPage from "./pages/OutreachDetailPage";
import LoginSuccessPage from "./pages/LoginSuccessPage";
import OutreachRunPage from "./pages/OutreachRunPage";

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <NavigationBar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/success" element={<LoginSuccessPage />} />
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
              <Route
                path="/outreaches/:id"
                element={
                  <PrivateRoute>
                    <OutreachDetailPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/outreaches/:id/run"
                element={
                  <PrivateRoute>
                    <OutreachRunPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        {isAuthenticated && <ChatNotificationBadge />}
      </div>
    </Router>
  );
}

export default App;
