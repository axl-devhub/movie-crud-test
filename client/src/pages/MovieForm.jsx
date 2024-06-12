import {
  Button,
  Input,
  Typography,
  Textarea,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const MovieForm = ({ task, setCurrentRoute }) => {
  const navigate = useNavigate();

  if (!task) {
    setCurrentRoute("/404");
    return null;
  }

  if (task === "read") {
    setCurrentRoute("/read");
  }

  if (task === "add") {
    setCurrentRoute("/add");
  }

  if (task === "edit") {
    setCurrentRoute("/edit");
  }

  const { id } = useParams();

  if (task !== "add" && !id) {
    setCurrentRoute("/404");
    return null;
  }
  const [movie, setMovie] = useState({});
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [rating, setRating] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const [year, setYear] = useState(0);
  const [director, setDirector] = useState("");
  const [budget, setBudget] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (id) {
      try {
        fetch(`${API_URL}/movies/${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data) {
              setMovie(data); // Set the movie data
            } else {
              setCurrentRoute("/404");
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, [id]);

  useEffect(() => {
    if (movie) {
      setTitle(movie.title || "");
      setSinopsis(movie.sinopsis || "");
      setRating(movie.rating || 0);
      setYear(movie.year || 0);
      setDirector(movie.director || "");
      setBudget(movie.budget || 0);
      setRevenue(movie.revenue || 0);
      if (movie.image)
        setImageURL(`${API_URL}/${movie.image}`);
      else setImageURL(null);
    }
  }, [movie]); // Depend on 'movie' so the effect runs whenever 'movie' changes

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageURL(reader.result);
    };

    setImage(file);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log({
        title,
        sinopsis,
        rating,
        image,
        year,
        director,
        budget,
        revenue,
      });
  
      const movieUpload = {
        title,
        sinopsis,
        rating,
        year,
        director,
        budget,
        revenue,
      };
  
      const formData = new FormData();
      formData.append("movie", JSON.stringify(movieUpload));
      if (image)
        formData.append("image", image);
      console.log(formData);

      if (task === "add") {
      try {
        fetch(`${API_URL}/movies`, {
          method: "POST",
          // Remove the Content-Type header
          body: formData,
        }).then((response) => {
          console.log(response);
          if (response.ok) {
            console.log("Movie added");
            alert("Pelicula agregada con exito!");
            setTitle("");
            setSinopsis("");
            setRating(0);
            setYear( 0);
            setDirector("");
            setBudget(0);
            setRevenue( 0);
            setImage(null);
            setImageURL(null);
          } else {
            console.log("Error adding movie");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    else if (task === "edit") {
      try {
        fetch(`${API_URL}/movies/${movie.id}`, {
          method: "PUT",
          body: formData,
        }).then((response) => {
          console.log(response);
          if (response.ok) {
            alert("Pelicula editada con exito!");
            navigate("/");
          } else {
            console.log("Error editing movie");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" m-20 flex flex-row w-[90vw] gap-10 overflow-x-hidden">
          <div className="w-3/4 justify-around flex-col">
            <Card className=" bg-gray-900 gap-y-12 gap-x-5 ">
              <Typography variant="h5" color="white">
                {task === "add"
                  ? "Agregar"
                  : task === "edit"
                  ? "Editar"
                  : "Info de"}{" "}
                Pelicula
              </Typography>
              <Input
                variant="static"
                required
                readOnly={task === "read"}
                type="text"
                placeholder="Rambo"
                label="TItulo"
                color="white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                variant="static"
                type="text"
                required
                readOnly={task === "read"}
                placeholder="Joe Russel"
                label="Director"
                color="white"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
              <Textarea
                label="Sinopsis"
                value={sinopsis}
                required
                readOnly={task === "read"}
                onChange={(e) => setSinopsis(e.target.value)}
                variant="static"
                color="yellow"
                className=" text-gray-50"
                maxLength={230} // Set maximum length to 230
              />
              <div className=" flex gap-10 flex-row ">
                <Input
                  variant="static"
                  type="number"
                  required
                  readOnly={task === "read"}
                  min={1895}
                  placeholder="2015"
                  label="Año"
                  color="white"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  max={new Date().getFullYear()} // Set maximum value to the current year
                />
                <Input
                  variant="static"
                  type="number"
                  required
                  placeholder="4.87"
                  readOnly={task === "read"}
                  label="Rating"
                  color="white"
                  min={0.0}
                  max={5.0}
                  step={0.1}
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <div className=" flex flex-row gap-10 ">
                <Input
                  variant="static"
                  type="number"
                  required
                  readOnly={task === "read"}
                  label="Presupuesto"
                  color="white"
                  step={1000}
                  min={0}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <Input
                  variant="static"
                  type="number"
                  required
                  readOnly={task === "read"}
                  min={0}
                  label="Recaudacion"
                  color="white"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>
            </Card>
          </div>
          <div className=" w-1/4 flex-col ml-12">
            <Card className={task === "read" ? "h-full w-auto" : "h-3/4 w-auto"}>
              <img
                className="h-full w-auto rounded-lg object-cover"
                src={
                  imageURL
                    ? imageURL
                    : "public/animated-plus-white-line-ui-icon-440491.gif"
                }
                alt="Add image"
              />
            </Card>
            {task != "read" && (
              <div className=" mt-20">
                <Input
                  type="file"
                  accept="image/*"
                  required={task === "add"}
                  color="white"
                  disabled={task === "read"}
                  label="Upload Image"
                  onChange={handleImageUpload}
                ></Input>
              </div>
            )}
          </div>
        </div>
        {task != "read" && (
          <Button
            className=" bg-golden-yellow text-custom-gray-100 transition-colors hover:text-gray-600 w-full"
            size="lg"
            type="submit"
          >
            Guardar Cambios
          </Button>
        )}
      </form>
    </>
  );
};

export default MovieForm;
