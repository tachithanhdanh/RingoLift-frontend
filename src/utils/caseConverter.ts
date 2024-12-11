// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  } else if (obj !== null && obj.constructor === Object) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(obj).reduce((acc: any, key: string) => {
      // https://stackoverflow.com/a/77731548
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
  } else if (obj !== null && obj.constructor === Object) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(obj).reduce((acc: any, key: string) => {
      // https://stackoverflow.com/a/73436689
      const camelKey = key
        .toLowerCase()
        .replace(/([-_][a-z])/g, (ltr) => ltr.toUpperCase())
        .replace(/[^a-zA-Z]/g, "");
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
