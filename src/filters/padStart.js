const filter = (value, num = 2) => value = (value || '').toString().padStart(num, '0');

export default filter;
