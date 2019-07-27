import IMask from 'imask';
import moment from "moment";

const momentFormat = 'DD.MM.YYYY';
let mFields = document.getElementsByClassName('input-field_masked');
for( let f of mFields ){

    let e = f.getElementsByClassName('input-field__input')[0];
    let momentMask = IMask(e, {
        mask: Date,
        pattern: momentFormat,
        lazy: false,
        min: new Date(1970, 0, 1),
        max: new Date(2030, 0, 1),


        format: function (date) {
            return moment(date).format(momentFormat);
        },
        parse: function (str) {
            return moment(str, momentFormat);
        },

        blocks: {
            YYYY: {
                mask: IMask.MaskedRange,
                from: 1970,
                to: 2030,
                placeholderChar: 'Г',
            },
            MM: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                placeholderChar: 'М',
            },
            DD: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 31,
                placeholderChar: 'Д',
            },
        }
    });

}
