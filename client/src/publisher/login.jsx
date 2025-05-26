import { useState, useEffect } from "react"


const TestLogin = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(null);
  const [result, setResult] = useState("");

  function handleUpdate(e) {
    // on every input change, the component needs to re-render to show updated user input
    const fieldName = e.target.id;
    const value = e.target.value;

    setData({ ...data, [fieldName]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_LOCAL_LOGIN;
    // state storing result of fetch

    console.log(url);
    setLoading(true);

    // loading state along with loadig spinner
    try {
      const response = await fetch(
        url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: 'cors'
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          const json = await response.json();
          // update to data state when finished. 
          setResult(json);
          setLoading(false);
        }
      });

    } catch (error) {
      console.error(error);
    }
    // navigates to log in screen?
  }

  function LoggedIn({ result }) {
    return (
      <>
        <p>hello {result.user.first_name}</p>
        <div>
          token: {result.token}
        </div>
      </>
    )
  }

  return (

    <div>
      this is the log in screen
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User name</label>
        <input type="text" id="username" onChange={handleUpdate} value={data.username} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handleUpdate} value={data.password} />
        <button type="submit"></button>
      </form>
      {loading ? <p>Loading</p> : (result && result.user.first_name) ? <LoggedIn result={result} /> : null}
    </div>
  )
};

export default TestLogin;
