import { useParams } from 'react-router-dom';
import { fetchCast } from '../../services/fetchMovies';
import { useEffect, useState } from 'react';
import Cast from 'components/Cast/Cast';

export default function CastPage() {
  const { movieId } = useParams(null);
  const [actors, setActors] = useState();

  useEffect(() => {
    fetchCast(movieId).then(data => {
      const cast = data.data.cast;
      setActors(cast);
    });
  }, [movieId]);

  return actors && <Cast actors={actors} />;
}
