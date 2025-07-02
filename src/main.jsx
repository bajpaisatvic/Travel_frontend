import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Tours from "./components/Services/Tours.jsx";
import TourDetails from "./components/Services/TourDeatils.jsx";
import Login from "./components/Login.jsx";
import { AuthProvider, useAuth } from "./contexts/authContext.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import PrivateAdminRoute from "./PrivateAdminRoute.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
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
        element={
          <PrivateAdminRoute>
            <AdminPanel />
          </PrivateAdminRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>
);
