import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../services/fetchMovies';
import { useEffect, useState } from 'react';
import Reviwes from 'components/Reviews/Reviews';

export default function ReviwesPage(params) {
  const { movieId } = useParams(null);
  const [reviews, setReviwes] = useState([]);

  useEffect(() => {
    fetchReviews(movieId).then(array => {
      const data = array.data.results;
      setReviwes(data);
    });
  }, [movieId]);

  return reviews.length > 1 ? (
    <Reviwes array={reviews} />
  ) : (
    <h3>We don't have any reviews for this film.</h3>
  );
}
