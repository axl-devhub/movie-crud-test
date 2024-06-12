import axios from "axios";
import API_URL from "../config";

const useMovies = async (page, size, setMovies, setPages, setTotal) => {
  try {
    const response = await axios.get(
      `${API_URL}/movies?page=${page}&size=${size}`
    );

    if (response.data.items) {
      setMovies(response.data.items);
      console.log("The movies", response.data.items);
      setPages && setPages(response.data.pages);
      setTotal && setTotal(response.data.total);
    }
  } catch (error) {
    console.error(error);
  }
};

export default useMovies;