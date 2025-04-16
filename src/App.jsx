import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-dark">
            <Home />
          </div>
        }
      />
      <Route
        path="/games/:id"
        element={
          <div className="min-h-screen bg-dark">
            <GameDetails />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
