import { useState } from "react";

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

import { Link } from "react-router-dom";
import API_URL from "../config";

const MovieCard = ({ movie, handleDelete, handleEdit, setCurrentRoute }) => {
  return (
    <div>
      <Card className="w-full m-2 max-w-[25rem] max-h-[45rem] shadow-lg bg-custom-gray-50">
        <CardHeader floated={false}>
          <img
            src={API_URL + "/" + movie.image}
            alt="Movie Image"
          />
          <div className=" absolute inset-0 h-full w-full" />
          {/* <IconButton
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-4 right-4 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton> */}
        </CardHeader>
        <CardBody className="min-h-48">
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="white" className="font-medium">
              {movie.title}
            </Typography>
            <Typography
              color="white"
              className="flex items-center gap-1.5 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-5 w-5 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              {movie.rating.toFixed(1)}
            </Typography>
          </div>
          <Typography
            className=" opacity-85"
            color="white"
            style={{ textWrap: "balance+" }}
          >
            {movie.sinopsis}
          </Typography>
        </CardBody>
        <CardFooter className="pt-3 flex">
          <div className="group m-auto inline-flex flex-wrap items-center gap-3">
            {/* EDIT */}
            <Link to={`/edit/${movie.id}`}>
              <Tooltip content="Editar Pelicula">
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-800 p-3 text-gray-50 transition-colors hover:border-gray-900/10 hover:bg-cyan-700 hover:!opacity-100 group-hover:opacity-70">
                  <IconButton
                    size="sm"
                    color="white"
                    variant="text"
                    className="h-6 w-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </IconButton>
                </span>
              </Tooltip>
            </Link>
            {/* VER MAS */}
            <Link
              to={`/read/${movie.id}`}
              onClick={() => setCurrentRoute("/read")}
            >
              <Tooltip content="Ver mas">
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-800 p-3 text-gray-50 transition-colors hover:border-gray-900/10 hover:bg-golden-yellow hover:!opacity-100 group-hover:opacity-70">
                  <IconButton
                    size="sm"
                    color="white"
                    variant="text"
                    className="h-6 w-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                  </IconButton>
                </span>
              </Tooltip>
            </Link>
            {/* DELETE */}
            <Tooltip content="Eliminar Pelicula">
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-800 p-3 text-gray-50 transition-colors hover:border-gray-900/10 hover:bg-red-600 hover:!opacity-100 group-hover:opacity-70">
                <IconButton
                  size="sm"
                  color="white"
                  variant="text"
                  className="h-6 w-6"
                  onClick={() => handleDelete(movie.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MovieCard;
