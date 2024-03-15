export const convertToObject = (propertyString) => {
  const propertyArray = propertyString.split("\n");
  const result = propertyArray.map((property) => {
    const [name, value] = property.replace(/\r$/, "").split(": ");
    return {
      property: name,
      value: value,
    };
  });
  return result;
};
