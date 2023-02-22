const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default fetcher;

export const ApiKey = process.env.NEXT_PUBLIC_APIKEY;
