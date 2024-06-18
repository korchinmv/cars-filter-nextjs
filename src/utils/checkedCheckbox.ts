export const checkedCheckbox = (data: string[] | undefined, value: string) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === value) {
        return true;
      } else {
        return false;
      }
    }
  }
};
