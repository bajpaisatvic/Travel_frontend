import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Tours from "./components/Services/Tours.jsx";
import TourDetails from "./components/Services/TourDeatils.jsx";
import Login from "./components/Login.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import { AuthProvider, useAuth } from "./contexts/authContext.jsx";
import NotFound from "./components/NotFound.jsx"; // 404 Page
import { Navigate } from "react-router-dom";

function MainRouter() {
  const { isAdmin } = useAuth();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}
      >
        <Route
          index
          element={
            <>
              <Home />
              <About />
              <Contact />
            </>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="services/tours" element={<Tours />} />
        <Route path="services/tours/:packageId" element={<TourDetails />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <MainRouter />
    </StrictMode>
  </AuthProvider>
);
