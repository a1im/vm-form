import Field from './field';


export default class Form {
    constructor(fields, onSubmit = async () => ({})) {
        this.fields = [];
        this.onSubmit = onSubmit;

        if (!Array.isArray(fields) && typeof fields === 'object' || typeof fields === 'string') {
            fields = [fields];
        }

        if (Array.isArray(fields)) {
            fields.forEach((el) => {
                if (el instanceof Field) {
                    this.fields.push(el);
                } else {
                    throw new Error('Error create input');
                }
            });
        } else {
            throw new Error('Error create form');
        }
    }

    field(name) {
        return typeof name === 'number'
            ? this.fields[name]
            : this.fields.find(el => el.name === name);
    }

    fieldValue(name) {
        return this.field(name).getValue();
    }

    sendData() {
        return this.fields.reduce((res, field) => {
            res[field.name] = field.getValue();

            return res;
        }, {});
    }

    getQueryParams() {
        const newQuery = Object.entries(this.sendData())
            .filter(([, value]) => value)
            .map(([key, value]) => {
                value = encodeURIComponent && encodeURIComponent(value) || value;

                return [key, value].join('=');
            })
            .join('&');

        return (newQuery ? `${newQuery}` : '');
    }
}
