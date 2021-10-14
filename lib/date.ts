const DATE_FORMAT_ISO8601_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})(\d{2})/;
const DATE_TIMEZONE_REGEX = /([+\-]\d{2})(\d{2})$/;

/**
 * Calculating days between start and end days
 * @param start
 * @param end
 */
export function calculatingDays(start, end) {
	return Math.round((endDate(end).getTime() - startDate(start).getTime()) / (24 * 60 * 60 * 1000));
}

/**
 * @param value
 */
export function isValidDate(value) {
	return value instanceof Date && !isNaN(value.getTime());
}

/**
 * @param value
 */
export function convertValueToDate(value): Date {
	let date = value;
	if (!(value instanceof Date)) {
		// Fix: Unable to parse +0000 timezone in Safari and IE
		if (DATE_FORMAT_ISO8601_REGEX.test(value)) {
			value = value.replace(DATE_TIMEZONE_REGEX, '$1:$2');
		}

		date = new Date(value);
	}

	return date;
}

export function convertValueToShortGmtDate(value): string {
	let date = convertValueToDate(value).toString();
	const index = date.indexOf(' (');

	if (index) {
		date = date.substr(0, index);
	}
	return date;
}

export function checkTimezone(timezone: string): string {
	return timezone === '' || /^\+\d{4}$/.test(timezone) ? timezone : '+0000';
}

export function convertDateToISO8601(value, timezone?: string): string {
	if (!value) {
		return '';
	}

	timezone = checkTimezone(timezone);
	const dateToStr = convertValueToDate(value);
	return `${convertDateToStr(dateToStr)}${toFormat(dateToStr.getHours())}:${toFormat(
		dateToStr.getMinutes()
	)}:${toFormat(dateToStr.getSeconds())}${timezone}`;
}

export function convertDateToISO8601WithFilter(value, time: string, timezone?: string): string {
	if (!value) {
		return '';
	}
	timezone = checkTimezone(timezone);
	return `${convertDateToStr(convertValueToDate(value))}${time}${timezone}`;
}

function convertDateToStr(value: Date): string {
	return `${value.getFullYear()}-${toFormat(value.getMonth() + 1)}-${toFormat(value.getDate())}T`;
}

function toFormat(n: number): string {
	return ('0' + n).slice(-2);
}

export function startDate(start?: string | number) {
	let date = now();
	if (start) {
		date = convertValueToDate(start);
	}
	return new Date(date.setHours(0, 0, 0, 0));
}

export function endDate(end?: string | number) {
	let date = now();
	if (end) {
		date = convertValueToDate(end);
	}
	return new Date(date.setHours(23, 59, 59, 59));
}

export function now() {
	return new Date();
}

export function getEndDateByAddingMonths(noOfMonths: number, start?: Date | string | number) {
	const date = start ? new Date(start) : now();
	const day = date.getDate();
	let end = date.setMonth(date.getMonth() + (noOfMonths - 1));
	// Fix for leap year
	if (date.getDate() !== day) {
		end = date.setDate(0);
	}
	return endDate(end);
}

export function calculatingDaysDiff(start, end) {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	return Math.ceil(Math.abs((start - end) / oneDay));
}

export function isDateSameDay(dateOne, dateTwo) {
	return (
		dateOne.getFullYear() === dateTwo.getFullYear() &&
		dateOne.getMonth() === dateTwo.getMonth() &&
		dateOne.getDate() === dateTwo.getDate()
	);
}

export function calculatingHoursDiff(start, end) {
	return Math.abs(end.getTime() - start.getTime()) / 36e5;
}

function timezoneOffsetPad(number) {
	return (number < 10 ? '0' : '') + number;
}

export function getTimezoneOffset() {
	const offset = now().getTimezoneOffset();

	return (
		(offset < 0 ? '+' : '-') +
		timezoneOffsetPad(Math.floor(Math.abs(offset / 60))) +
		timezoneOffsetPad(Math.abs(offset % 60))
	);
}

export function isISO8601DateFormat(value: string): boolean {
	return DATE_FORMAT_ISO8601_REGEX.test(value);
}

export function dateWithoutMilliseconds(date: Date): string {
	return date.toISOString().slice(0, -5) + 'Z';
}
