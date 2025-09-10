export async function apiFetch(
  url,
  token = null,
  body = null,
  method = "GET",
  headers = { "Content-Type": "application/json" },
) {
  const options = {
    method,
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    mode: "cors",
  };

  if (body && method.toUpperCase() !== "GET") {
    options.body = JSON.stringify(body);
  }

  try {
    console.log("url: ", url);

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.status);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error("Fetch error:", err);
    return err;
  }
}

export function clientHostName() {
  if (import.meta.env.MODE === "development") {
    return window.location.hostname + ":" + window.location.port;
  }
  return window.location.hostname;
}

export function serverHostName() {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000";
  }
  return import.meta.env.VITE_REMOTE_HOST;
}
