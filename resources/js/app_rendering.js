import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiginIn from "./views/template1/SignIn";
import AdminLogin from "./views/template2/AdminLogin";
import SiginUp from "./views/template1/SignUp";
import Activate from "./views/template1/Activate";
// TO USE THIS DASHBOARD, CHANGE THE WEB ROUTE BLADE TO REACT_DASHBOARD
import Dashboard from "./views/template2/Dashboard";
import AdminDashboard from "./views/template2/AdminDashboard";

//import Dashboard from "./views/template1/Dashboard2";
import { GenericMethodProvider } from "./context/GenericMethodContext";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <>
            <AuthProvider>
                <ProtectedRoute>
                    <GenericMethodProvider>
                        <BrowserRouter>
                            <Routes>

                                {/* <Route path="/signin" element={<SiginIn />} />
                                 */}
                                <Route path="/admindashboard/*" element={<AdminDashboard />} />
                                <Route path="/dashboard/*" element={<Dashboard />} />
                                <Route path="/signin" element={<SiginIn />} />
                                <Route path="/adminlogin" element={<AdminLogin />} />
                                <Route path="/signup" element={<SiginUp />} />
                                <Route path="/activate/*" element={<Activate />} />
                            </Routes>
                        </BrowserRouter>
                    </GenericMethodProvider>
                </ProtectedRoute>
            </AuthProvider>

        </>
    );
}
export default App;
