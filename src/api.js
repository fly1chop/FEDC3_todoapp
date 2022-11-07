import { API_END_POINT } from "./constants.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    if (!res.ok) throw new Error("Unable to fetch API");
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e.message);
  }
};
