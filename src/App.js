import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import VacancyList from "./pages/Vacancies/List.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/vacancylist" element={<VacancyList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
