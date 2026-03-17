import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/events.tsx";
import PricingPage from "@/pages/modules.tsx";
import GuestListPage from "@/pages/GuestListPage";
import LogIn from "@/pages/LogIn.tsx";
import SignUp from "@/pages/SignUp.tsx";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/events" />
      <Route element={<PricingPage />} path="/modules" />
      <Route element={<GuestListPage />} path="/guests" />
      <Route element={<LogIn />} path="/login" />
      <Route element={<SignUp />} path="/signup" />
    </Routes>
  );
}

export default App;
