export const fetchData = async (path: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}${path}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return { success: data };
  } catch (error) {
    return { error: `Failed to fetch data: ${error}` };
  }
};
