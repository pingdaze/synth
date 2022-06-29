const uniqBy = <T>(arr: T[], key: keyof T) => [
    ...new Map(arr.map((item) => [item[key], item])).values(),
  ];
  
  export { uniqBy };
  