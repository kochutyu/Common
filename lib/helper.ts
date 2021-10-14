export function isFileSizeValid(file: File, maxFileSizeInMB: number) {
	return file && file.size / 1024 / 1024 <= maxFileSizeInMB;
}

export function updateUrlParameter(uri, key, value) {
	// remove the hash part before operating on the uri
	const i = uri.indexOf('#');
	const hash = i === -1 ? '' : uri.substr(i);
	uri = i === -1 ? uri : uri.substr(0, i);

	const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
	const separator = uri.indexOf('?') !== -1 ? '&' : '?';

	if (!value) {
		// remove key-value pair if value is empty
		uri = uri.replace(new RegExp('([?&]?)' + key + '=[^&]*', 'i'), '');
		if (uri.slice(-1) === '?') {
			uri = uri.slice(0, -1);
		}
		// replace first occurrence of & by ? if no ? is present
		if (uri.indexOf('?') === -1) {
			uri = uri.replace(/&/, '?');
		}
	} else if (uri.match(re)) {
		uri = uri.replace(re, '$1' + key + '=' + value + '$2');
	} else {
		uri = uri + separator + key + '=' + value;
	}
	return uri + hash;
}

export function inEnumValues(enumObject: object = {}, values: string | string[]): boolean {
	const enumValues = Object.values(enumObject);
	if (Array.isArray(values)) {
		for (const type of values) {
			if (!enumValues.includes(type)) {
				return false;
			}
		}
	} else {
		if (!enumValues.includes(values)) {
			return false;
		}
	}
	return true;
}

export function getEnumKeyValueToArray(enumObject: object = {}, omitValues: string[] = []): string[] {
	const result = Object.keys(enumObject).map((key) => enumObject[key]);

	if (omitValues && Array.isArray(omitValues) && omitValues.length) {
		return result.filter((value) => !omitValues.includes(value));
	}

	return result;
}

export function sortObjectArrayByKeyValue(value: any[], key = 'name', lastIndexValue?: string | number) {
	if (!value || !Array.isArray(value)) {
		return value;
	}

	const sortedValue = value.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));

	if (lastIndexValue) {
		moveArrayItemToLastIndex(value, key, lastIndexValue);
	}

	return sortedValue;
}

export function sortArrayValues(value: [], lastIndexValue?: string | number) {
	if (!value || !Array.isArray(value)) {
		return value;
	}

	const sortedValue = value.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));

	if (lastIndexValue) {
		moveArrayItemToLastIndex(value, '', lastIndexValue);
	}

	return sortedValue;
}

export function moveArrayItemToLastIndex(value: any[], key: string, lastIndexValue: string | number) {
	if (!value || !Array.isArray(value)) {
		return value;
	}

	if (lastIndexValue) {
		value.push(
			...value.splice(
				value.findIndex((val) => {
					const item = key ? val[key] : val;
					return (
						item === lastIndexValue ||
						(typeof item === 'string' && String(item).toLowerCase() === lastIndexValue)
					);
				}),
				1
			)
		);
	}

	return value;
}

export function changeLanguageUrl(url: string, currentLanguageCode: string, newLanguageCode: string) {
	let urlSegments = url.split('/');
	const languageSegmentIndex = urlSegments.indexOf(currentLanguageCode);

	if (languageSegmentIndex === 0 || (languageSegmentIndex === 1 && urlSegments[0] === '')) {
		urlSegments = urlSegments
			.slice(0, languageSegmentIndex)
			.concat([newLanguageCode, ...urlSegments.slice(languageSegmentIndex + 1)]);
	} else {
		if (languageSegmentIndex === -1) {
			const injectionIndex = urlSegments[0] === '' ? 1 : 0;
			urlSegments = urlSegments
				.slice(0, injectionIndex)
				.concat(newLanguageCode, urlSegments.slice(injectionIndex));
		}
	}

	url = urlSegments.join('/').replace(/\/+/g, '/');

	const lastSlashIndex = url.lastIndexOf('/');
	if (lastSlashIndex > 0 && lastSlashIndex === url.length - 1) {
		url = url.slice(0, -1);
	}

	return url;
}

export function removeLanguageCodeFromUrl(url: string, languageCode: string) {
	let urlSegments = url.split('/');
	const languageSegmentIndex = urlSegments.indexOf(languageCode);

	if (languageSegmentIndex === 0 || (languageSegmentIndex === 1 && urlSegments[0] === '')) {
		urlSegments = urlSegments.slice(0, languageSegmentIndex).concat(urlSegments.slice(languageSegmentIndex + 1));
	}

	url = urlSegments.join('/');

	return url;
}

export function enumToSelectOptions(value: object) {
	return Object.keys(value).map((key) => ({
		id: key,
		text: value[key],
	}));
}

export function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}
