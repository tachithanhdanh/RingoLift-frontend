// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  } else if (obj !== null && typeof obj === "object" && obj.constructor === Object) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const snakeKey = key
        .replace(/(([a-z])(?=[A-Z][a-zA-Z])|([A-Z])(?=[A-Z][a-z]))/g, "$1_")
        .toLowerCase();
      acc[snakeKey] = toSnakeCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj !== null && typeof obj === "object" && obj.constructor === Object) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const camelKey = key
        .toLowerCase()
        .replace(/([-_][a-z])/g, (ltr) => ltr.toUpperCase().replace(/[-_]/, ""));
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
