export async function apiFetch(
  url,
  method = "GET",
  headerKey = "Content-Type",
  headerProperty = "application/json"
) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        [headerKey]: headerProperty,
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export function clientHostName() {
  if(import.meta.env.MODE === "development"){
    return window.location.hostname + ":" + window.location.port;
  } 
  return window.location.hostname;
}

export function serverHostName() {
  if(import.meta.env.MODE === "development"){
    return "http://localhost:5000";
  }
}

