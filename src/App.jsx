import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthContext";

import GlobalStyled from "./global/globalStyled";
import Companies from "./pages/Companies";
import CreateCompany from "./pages/CreateCompany";
import CreateUser from "./pages/CreateUser";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyled />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />

          <Route
            path="/companies"
            element={
              <PrivateRoute>
                <Companies />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-company"
            element={
              <PrivateRoute>
                <CreateCompany />
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-user"
            element={
              <PrivateRoute>
                <CreateUser />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
