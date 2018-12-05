const formater = new Intl.DateTimeFormat();
const filter = (date) => {
    date = typeof date !== 'object' ? new Date(date) : date;

    return formater.format(date);
};

export default filter;
