import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import GlobalStyled from "./global/globalStyled";

import Assets from "./pages/Assets";
import Companies from "./pages/Companies";
import CreateAsset from "./pages/CreateAsset";
import CreateCompany from "./pages/CreateCompany";
import CreateUnity from "./pages/CreateUnity";
import CreateUser from "./pages/CreateUser";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Units from "./pages/Units";
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

          <Route
            path="/company/:id"
            element={
              <PrivateRoute>
                <Units />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-unit"
            element={
              <PrivateRoute>
                <CreateUnity />
              </PrivateRoute>
            }
          />

          <Route
            path="/:id/create-asset"
            element={
              <PrivateRoute>
                <CreateAsset />
              </PrivateRoute>
            }
          />

          <Route
            path="/asset/:id"
            element={
              <PrivateRoute>
                <Assets />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
