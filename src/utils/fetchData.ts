export const fetchData = async (path: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}${path}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
