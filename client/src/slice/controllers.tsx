export default async function postRequest(path: string, payload: object) {
  try {
    const res = await fetch("https://denaurlen-i0lp.onrender.com" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    return error;
  }
}
