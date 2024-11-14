export const handleDateConversion = (date: number): string => {
	const dtFormat = new Intl.DateTimeFormat('en-GB', {
		timeStyle: 'medium',
		timeZone: 'UTC'
	});

	return dtFormat.format(new Date(date * 1000));
};

export const handleTimeCalculation = (dateArray: number[]) => {
	const dtFormat = new Intl.DateTimeFormat('en-GB', {
		timeStyle: 'medium',
		timeZone: 'UTC'
	});
};
