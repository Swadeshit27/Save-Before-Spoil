import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Wrapper from "./layout/Wrapper";
import { CssSyntaxError } from "postcss";
import CsvUploader from "./pages/CsvUploader";

function App() {
  return (
    <div className="w-full min-h-screen ">
      <Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <Dashboard />
            </Wrapper>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<CsvUploader />} />
      </Routes>
    </div>
  );
}

export default App;
