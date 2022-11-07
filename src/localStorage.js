const storage = window.localStorage

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch(e) {
    console.error(e)
  }
}

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);

    if(!storedValue) return defaultValue;


    const parsedValue = JSON.parse(storedValue);
    return parsedValue;

  } catch(e) {
    console.error(e);
    return defaultValue;
  }
}

export const removeItem = (key) => {
  storage.removeItem(key)
}