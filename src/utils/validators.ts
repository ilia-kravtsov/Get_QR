export const isValidURL = (url: string): boolean => {
	const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i;
	return regex.test(url);
};