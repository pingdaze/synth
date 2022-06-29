export function pick<T>(obj: T, keys: (keyof T)[]) {
    return keys
      .map((k) => (k in obj ? { [k]: obj[k] } : {}))
      .reduce((res, o) => Object.assign(res, o), {});
  }
  