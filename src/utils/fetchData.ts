export const fetchData = async (path: string) => {
  const res = await fetch(`${process.env.BASE_URL}${path}`);
  const data = await res.json();
  return data;
};
