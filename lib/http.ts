export const encodeObj = (object = {}): Record<string, any> => {
	const result = {};
	Object.entries(object).forEach((item) => {
		if (typeof item[1] === 'string') {
			result[item[0]] = encodeURIComponent(item[1]);
		} else {
			result[item[0]] = item[1];
		}
	});
	return result;
};

export const encodeObjToStr = (object = {}, usePrefix = true) => {
	object = encodeObj(object);
	const queries = Object.keys(object)
		.map((key) => `${key}=${object[key]}`)
		.join('&');
	return usePrefix ? `?${queries}` : queries;
};

export const decodeObj = (object = {}): Record<string, any> => {
	const result = {};
	Object.entries(object).forEach((item) => {
		if (typeof item[1] === 'string') {
			result[item[0]] = decodeURIComponent(item[1]);
		} else {
			result[item[0]] = item[1];
		}
	});
	return result;
};
