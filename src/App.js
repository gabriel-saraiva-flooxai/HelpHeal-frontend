import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import VacancyList from "./pages/Vacancies/List.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import VacancyCreate from "./pages/Vacancies/New.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/vacancies" element={<VacancyList />} />
        <Route path="/vacancies/new" element={<VacancyCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
