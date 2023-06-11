import ChatContextProvider from "./context/ChatContextProvider";
import UsersContextProvider from "./context/UsersContextProvider";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/LoginAndSignUp/autoNavigate/ProtectedRoute";
import LoginAutoNavigate from "./components/LoginAndSignUp/autoNavigate/LoginAutoNavigate";

import {
  DefaultPage,
  LoginPage,
  SignUpPage,
  HomePage,
} from "./pages/export-pages";

import "./style/styles-import";

function App() {
  return (
    <ChatContextProvider>
      <UsersContextProvider>
        <div className="h-[100vh] w-[100vw] bg-[#1F6F8B] overflow-hidden">
          <Routes>
            <Route element={<LoginAutoNavigate />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="/SignUp" element={<SignUpPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/Home" element={<HomePage />} />
            </Route>
            <Route path="*" element={<DefaultPage />} />
          </Routes>
        </div>{" "}
      </UsersContextProvider>
    </ChatContextProvider>
  );
}

export default App;
