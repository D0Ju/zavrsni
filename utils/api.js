export const fetcherSwr = (...args) => fetch(...args).then((res) => res.json());
const fetcher = (...args) => {
	return fetch(...args).then((res) => {
		return res.json();
	});
};
export default fetcher;
export const ApiKey = process.env.NEXT_PUBLIC_APIKEY;
