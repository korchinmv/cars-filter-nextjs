export const getLocalStorage = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const data = localStorage.getItem(name);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
};
