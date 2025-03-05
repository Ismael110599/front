import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Layout from "./layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/content/Welcome";
import Service from "./pages/content/Service";
import AboutUs from "./pages/content/AboutUs";
import Register from "./pages/content/registers";
import Caregivers from "./pages/content/Caregivers";
import ProfileCaregiver from "./pages/content/perfileCaregiver";
import Login from "./pages/content/Login";
import { AuthProvider } from "./context/AuthContext"; //

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Main />
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

function Main() {
    const location = useLocation();
    const excludedRoutes = ["/perfil-cuidador"];

    const showNavbarAndFooter = !excludedRoutes.includes(location.pathname);

    return (
        <Layout>
            {showNavbarAndFooter && <Navbar />}
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/servicio" element={<Service />} />
                <Route path="/nosotros" element={<AboutUs />} />
                <Route path="/cuidadores" element={<Caregivers />} />
                <Route path="/perfil-cuidador" element={<ProfileCaregiver />} />
                <Route path="/convertirse-en-cuidador" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            {showNavbarAndFooter && <Footer />}
        </Layout>
    );
}

export default App;
