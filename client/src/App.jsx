import {
  Typography,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";

import Navbar from "./components/Navbar";
import MoviesPage from "./pages/Movies";
import NotFoundPage from "./pages/404";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MovieForm from "./pages/MovieForm";

import { useState } from "react";
export default function App() {
  const [currentRoute, setCurrentRoute] = useState("/");

  return (
    <BrowserRouter>
      <div className="relative flex flex-col min-h-[100vh] w-screen p-8 bg-custom-gray-100">
        <Navbar currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
        <Card className=" bg-gray-900 overflow-scroll" shadow>
          
            <Routes>
              <Route
                path="/"
                element={<MoviesPage setCurrentRoute={setCurrentRoute} currentRoute={currentRoute} />}
              />
              <Route
                path="*"
                element={<NotFoundPage setCurrentRoute={setCurrentRoute} />}
              />
              <Route path="/add" element={<MovieForm setCurrentRoute={setCurrentRoute} task={"add"} />} />
              <Route path="/edit/:id" element={<MovieForm setCurrentRoute={setCurrentRoute} task={"edit"} />} />
              <Route path="/read/:id" element={<MovieForm setCurrentRoute={setCurrentRoute} task={"read"} />} />
            </Routes>

        </Card>
      </div>
    </BrowserRouter>
  );
}
