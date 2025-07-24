import { useNavigate } from "react-router-dom"

export function LinkButton({ url, text }) {

console.log("url to redirect to: ", url);

  const navigate = useNavigate();

  function handleNav() {
    navigate(url, { replace: true });
  }

  return (
    <button onClick={handleNav}>
      {text}
    </button>
  );
}

