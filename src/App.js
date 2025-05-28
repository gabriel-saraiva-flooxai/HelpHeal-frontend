import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import VacancyList from "./pages/Vacancies/List.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
import CreateVacancy from "./pages/Hospital/CreateVacancy.jsx";
import MyHospital from "./pages/Hospital/MyHospital.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/vacancies" element={<VacancyList />} />
        <Route path="/hospital/vacancies/new"
          element={
            <AuthGuard allowedRoles={['admin', 'internal_user']}>
              <CreateVacancy />
            </AuthGuard>} />
        <Route path="/hospital/vacancies"
          element={
            <AuthGuard allowedRoles={['admin', 'internal_user']}>
              <MyHospital />
            </AuthGuard>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
