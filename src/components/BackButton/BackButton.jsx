import { Link, useLocation } from 'react-router-dom';

export default function BackButton() {
  const { state } = useLocation();
  return (
    state?.from && (
      <Link to={state.from}>
        <button type="button">
          <span>← Go back</span>
        </button>
      </Link>
    )
  );
}
