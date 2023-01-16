import { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container } from 'components/Container/Container';
import Loader from 'components/Loader/Loader';
import BackButton from 'components/BackButton/BackButton';
import MovieCard from 'components/MovieCard/MovieCard';

import { fetchMoviesById } from '../../services/fetchMovies';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchMoviesById(movieId).then(data => {
        const {
          id,
          backdrop_path,
          title,
          release_date,
          popularity,
          overview,
          genres,
        } = data.data;
        const object = {
          id,
          backdrop_path,
          title,
          release_date,
          popularity,
          overview,
          genres,
        };
        setMovie(object);
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  return (
    <>
      {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
      <>
        {isLoading && <Loader color={'#3f51b5'} size={32} />}
        <BackButton />
        <Container>{movie && <MovieCard movie={movie} />}</Container>
        <Outlet />
      </>
    </>
  );
}
