import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const { id, poster_path, title, release_date, vote_average, overview, genres } =
    movie;

  const voteScore = vote_average.toFixed(1) * 10;
  
  const location = useLocation();

  return (
    <>
      <div className={styles['card__info--general']}>
        <div className={styles['img__wrapper']}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={250}
          />
        </div>
        <div className={styles['details__wrapper']}>
          <h2>
            <span>{title}</span>
            <span>({getRelizeYear(release_date)})</span>
          </h2>
          <p> User score: {getUserScore(voteScore)} %</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{getGenresNames(genres)}</p>
        </div>
      </div>
      <div className={styles['card__info--additional']}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={`/movies/${id}/cast`} state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`/movies/${id}/reviews`} state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

function getRelizeYear(date) {
  const today = new Date(date);
  return today.getFullYear();
}

function getUserScore(data) {
  return Math.round(data);
}

function getGenresNames(data) {
  return data.map(({ name }) => name).join(', ');
}
