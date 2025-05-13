import { useState } from "react"



const TestLogin = () => {
  const [data, setData] = useState({ username: "", password: "" });

  function handleUpdate(e) {
    // on every input change, the component needs to re-render to show updated user input

    const fieldName = e.target.id;
    const value = e.target.value;

    setData({ ...data, [fieldName]: value });
  }

  function handleSubmit(e) {
    // handle the submission. and fetching stuff from server?
    e.preventDefault();
    console.log(data);
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
    </div>
  )
};

export default TestLogin;
