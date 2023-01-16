import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'components/Container/Container';
import MovieGallery from 'components/MovieGallery/MovieGallery';
import { fetchMovies } from '../../services/fetchMovies';
import Loader from 'components/Loader/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchMovies().then(data => {
        const mappedMovies = data.data.results.map(({ id, title }) => ({
          id,
          title,
        }));
        setMovies(mappedMovies);
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
      <Container>
        {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
        <h1>Trending today</h1>
        <MovieGallery movies={movies} prevLocation={location} />
        <ToastContainer autoClose={3000} />
      </Container>
    </>
  );
};

export default HomePage;
