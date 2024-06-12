import MovieCard from "../components/MovieCard";
import { IconButton, Typography, dialog } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import useMovies from "../services/movies";
import { useLocation } from "react-router-dom";
import API_URL from "../config";

const MoviesPage = ({ currentRoute, setCurrentRoute }) => {
  // Get the movies from the API
  setCurrentRoute("/");
  const [activePage, setActivePage] = useState(1);

  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(8);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  function createRouteChangeHandler() {
    let lastRoute = null;
    let count = 0;

    return function (currentRoute) {
      if (currentRoute !== lastRoute) {
        lastRoute = currentRoute;
        count++;
      }

      return count;
    };
  }

  const handleRouteChange = createRouteChangeHandler();
  const location = useLocation();

  useEffect(() => {
    const newCount = handleRouteChange(location.pathname);
    setCount(newCount);
  }, [location.pathname]);

  useEffect(() => {
    useMovies(activePage, resultsPerPage, setMovies, setPages, setTotal);
  }, [activePage, resultsPerPage, currentRoute]);

  const next = () => {
    if (activePage === pages) return;
    setActivePage(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;
    setActivePage(activePage - 1);
  };

  const handleDelete = async (id) => {
    if (confirm("Seguro que quieres borrar esta pelicula") === false) return;
    try {
      await axios.delete(
        `${API_URL}/movies/${id}`
      );
      alert("Pelicula borrada");
      useMovies(activePage, resultsPerPage, setMovies, setPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 gap-x-2 md:grid-cols-2 lg:grid-cols-4 min-h-[85vh]">
        {/* Map the movies here MAX 8 */}
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            setCurrentRoute={setCurrentRoute}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      {pages > 1 && (
        <div className="m-auto mb-16 mt-16">
          <div className="flex items-center gap-8">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={prev}
              disabled={activePage === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
            </IconButton>
            <Typography color="white" className="font-normal text-white">
              Pagina <strong className="text-white">{activePage}</strong> de{" "}
              <strong className="text-white">{pages}</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={next}
              disabled={activePage === 10}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
};
export default MoviesPage;
