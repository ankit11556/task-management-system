import Navbar from "./components/Navbar";
import AppRoute from "./routes/AppRoute";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div >
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
         <Toaster />
      <AppRoute></AppRoute>
      </div>
    </div>
  );
}

export default App;
