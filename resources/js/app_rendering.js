import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiginIn from "./views/template1/SignIn";
import AdminLogin from "./views/template2/AdminLogin";
import SiginUp from "./views/template1/SignUp";
import Activate from "./views/template1/Activate";
import Contact from "./views/template1/Contact";
// TO USE THIS DASHBOARD, CHANGE THE WEB ROUTE BLADE TO REACT_DASHBOARD
import Dashboard from "./views/template2/Dashboard";
import AdminDashboard from "./views/template2/AdminDashboard";
//import Dashboard from "./views/template1/Dashboard2";
import { GenericMethodProvider } from "./context/GenericMethodContext";
import { MenuMethodProvider } from "./context/MenuMethodContext";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { AuthProvider } from './context/AuthContext';
// import { ExternalScripts } from './utils/ExternalScripts';

function App() {
    // ExternalScripts();
    return (
        <>
            <AuthProvider>
                <ProtectedRoute>
                    <GenericMethodProvider>
                        <MenuMethodProvider>
                            <BrowserRouter>
                                <Routes>

                                    {/* <Route path="/signin" element={<SiginIn />} />
                                 */}
                                    <Route path="/admin/*" element={<AdminDashboard />} />
                                    <Route path="/dashboard/*" element={<Dashboard />} />
                                    <Route path="/signin" element={<SiginIn />} />
                                    <Route path="/adminlogin" element={<AdminLogin />} />
                                    <Route path="/signup" element={<SiginUp />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/activate/*" element={<Activate />} />
                                </Routes>
                            </BrowserRouter>
                        </MenuMethodProvider>
                    </GenericMethodProvider>
                </ProtectedRoute>
            </AuthProvider>


        </>
    );
}
export default App;
