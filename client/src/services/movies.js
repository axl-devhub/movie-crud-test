import axios from "axios";
import API_URL from "../config";

const useMovies = async (page, size, setMovies, setPages, setTotal) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/Movies?pageNumber=${page}&pageSize=${size}`
    );

    if (response.data.items) {
      setMovies(response.data.items);
      console.log("The movies", response.data.items);
      setPages && setPages(response.data.totalPages);
      setTotal && setTotal(response.data.totalItems);
    }
  } catch (error) {
    console.error(error);
  }
};

export default useMovies;