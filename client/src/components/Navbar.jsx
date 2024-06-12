import { Card, Button } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentRoute, setCurrentRoute }) => {
  return (
    <div className="flex min-w-[96vw] flex-col-reverse mb-12 items-center justify-between gap-4 self-start md:flex-row">
      <Card className="h-max w-max border border-blue-gray-50 py-4 px-5 shadow-lg shadow-blue-gray-900/5">
        <code className=" text">
          Movie Crud <strong>Axel Cuevas</strong>
        </code>
      </Card>
      <Card className="h-max w-max borde bg-gray-900 shadow-lg shadow-blue-gray-900/5">
        {currentRoute === "/" ? (
        <Link to={"/add"}>
          <Button className=" bg-golden-yellow text-custom-gray-100 transition-colors hover:text-gray-600" size="lg" onClick={() => {setCurrentRoute("/add")}}>
            Nueva Pelicula
          </Button>
        </Link>
        ) : (
          <Link to="/">
            <Button className=" bg-golden-yellow text-custom-gray-100 transition-colors hover:text-gray-600" size="lg" onClick={() => {setCurrentRoute("/")}}>
              Regresar
            </Button>
          </Link>
        )}
      </Card>
    </div>
  );
};

export default Navbar;