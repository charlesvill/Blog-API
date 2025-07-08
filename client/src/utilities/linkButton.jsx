import { useNavigate } from "react-router-dom"

export function LinkButton({ url, text }) {
  const navigate = useNavigate();

  function handleNav() {
    navigate(url);
  }

  return (
    <button onClick={handleNav}>
      {text}
    </button>
  );
}

