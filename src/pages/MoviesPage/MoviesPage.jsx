import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Container } from 'components/Container/Container';

import Loader from 'components/Loader/Loader';
import Searchbar from 'components/Searchbar/Searchbar';
import MovieGallery from 'components/MovieGallery/MovieGallery';

import { fetchMoviesByRequest } from 'services/fetchMovies';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchRequest = searchParams.get('query');

  const location = useLocation();

  useEffect(() => {
    if (!searchRequest) {
      return;
    }
    const updateMovies = searchRequest => {
      setIsLoading(true);
      try {
        fetchMoviesByRequest(searchRequest).then(data => {
          if (!data.data.results.length) {
            alert('There is no movies found with that search request');
            return;
          }
          const mappedMovies = data.data.results.map(({ id, title }) => ({
            id,
            title,
          }));
          setMovies([...mappedMovies]);
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (searchRequest !== '') {
      updateMovies(searchRequest);
    }
  }, [searchRequest]);

  const handleSearchSubmit = value => {
    setSearchParams({ query: `${value}` });
  };

  return (
    <Container>
      <Searchbar onSearch={handleSearchSubmit} />
      {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
      {isLoading && <Loader />}
      {movies.length > 0 && (
        <MovieGallery movies={movies} prevLocation={location} />
      )}
    </Container>
  );
}
