/**
 * Asynchronously applies a function to each element of an array in parallel.
 *
 * @template T - The type of elements in the input array.
 * @template U - The type of elements in the resulting array.
 * @param {T[]} arr - The input array.
 * @param {(value: T, index: number) => Promise<U>} f - The function to apply to each element.
 * @param {number} [n=Infinity] - The maximum number of parallel executions.
 * @param {boolean} [inPlace=false] - If true, modifies the input array in place.
 * @returns {Promise<U[]>} - A promise that resolves to an array of results.
 */
const parallelMap = async <T, U extends T>(
  arr: T[],
  f: (value: T, index: number) => Promise<U>,
  n: number = Infinity,
  inPlace: boolean = false
): Promise<U[]> => {
  const results: U[] = inPlace ? (arr as U[]) : new Array<U>(arr.length);
  const entries = arr.entries();

  const worker = async () => {
    try {
      for (const [key, val] of entries) {
        results[key] = await f(val, key);
      }
    } catch (error) {
      // Handle the error here, log or throw as appropriate.
      console.error(error);
    }
  };

  await Promise.allSettled(
    Array.from({ length: Math.min(arr.length, n) }, worker)
  );

  return results;
};

/**
 * Asynchronously performs an operation on each element of an array in parallel.
 *
 * @template T - The type of elements in the input array.
 * @param {T[]} arr - The input array.
 * @param {(value: T, index: number) => Promise<void>} f - The operation to perform on each element.
 * @param {number} [n=Infinity] - The maximum number of parallel executions.
 * @returns {Promise<void>} - A promise that resolves when all operations are completed.
 */
const parallelDo = async <T>(
  arr: T[],
  f: (value: T, index: number) => Promise<void>,
  n: number = Infinity
): Promise<void> => {
  const entries = arr.entries();

  const worker = async () => {
    try {
      for (const [key, val] of entries) {
        await f(val, key);
      }
    } catch (error) {
      // Handle the error here, log or throw as appropriate.
      console.error(error);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(arr.length, n) }, worker)
  );
};

export { parallelMap, parallelDo };
