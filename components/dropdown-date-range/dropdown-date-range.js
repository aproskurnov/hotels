import flatpickr from "flatpickr"
import { Russian } from "flatpickr/dist/l10n/ru.js"
require("flatpickr/dist/flatpickr.min.css");

function genButtons( fOk, fCancel){
    let controlContainer = document.createElement("div");
    let wCancel = document.createElement('h3');
    let cancel = document.createElement('a' );
    cancel.innerHTML = 'очистить';
    cancel.classList.add('flatpickr-btn-cancel');
    wCancel.appendChild(cancel);

    let wOk = document.createElement('h3');
    let ok = document.createElement('a' );
    ok.innerHTML = 'применить';
    ok.classList.add('flatpickr-btn-ok');
    wOk.appendChild(ok);

    ok.addEventListener('click', fOk);
    cancel.addEventListener('click', fCancel);

    controlContainer.appendChild(wCancel);
    controlContainer.appendChild(wOk);
    controlContainer.className = "flatpickr-controls";
    return controlContainer;
}

let prevArrow = "<svg width=\"17\" height=\"18\" viewBox=\"0 0 17 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "<path d=\"M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z\" fill=\"#BC9CFF\"/>\n" +
    "</svg>";
let nextArrow = "<svg width=\"17\" height=\"18\" viewBox=\"0 0 17 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "<path d=\"M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z\" fill=\"#BC9CFF\"/>\n" +
    "</svg>\n";


let singleSettings = {
    "mode": "range",
    "locale": Russian,
    "closeOnSelect": false,
    "prevArrow": prevArrow,
    "nextArrow": nextArrow,
    "onReady":function(selectedDates, dateStr, instance){

        let fOk = function(){
            if (instance.selectedDates.length > 1){
                let dates = instance.selectedDates.map((date, index)=>{
                    let months = ['янв', 'фев', 'мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
                    return flatpickr.formatDate(date, 'j') + ' ' + months[date.getMonth()];

                });
                dateStr = dates[0];
                dateStr += (dates.length > 1)?(" - "+dates[1]):"";
                instance.element.firstElementChild.firstElementChild.innerHTML = dateStr;
                instance.close();
            }
        };
        let fCancel = function(){
            instance.clear();
        };

        let btnsContainer = genButtons( fOk, fCancel );
        instance.rContainer.appendChild(btnsContainer);

    },
    "dateFormat": "d.m.Y"
};

let splittedSettings =  {
    "mode": "range",
    "locale": Russian,
    "closeOnSelect": false,
    "prevArrow": prevArrow,
    "nextArrow": nextArrow,
    "onReady":function(selectedDates, dateStr, instance){

        let fOk = function(){
            if (instance.selectedDates.length > 1){
                let e = instance.element.closest('.js-dropdown-date-range_splitted').querySelectorAll('.js-dropdown__select');
                e.item(0).firstElementChild.firstElementChild.innerHTML = instance.formatDate(instance.selectedDates[0], instance.config.dateFormat);
                e.item(1).firstElementChild.firstElementChild.innerHTML = instance.formatDate(instance.selectedDates[1], instance.config.dateFormat);
                instance.close();
            }
        };
        let fCancel = function(){
            let e = instance.element.closest('.js-dropdown-date-range_splitted').querySelectorAll('.js-dropdown__select');
            Object.values(e).map(function(v, i){
                v.firstElementChild.firstElementChild.innerHTML = 'ДД.ММ.ГГГГ';
            });
            instance.clear();
        };

        let btnsContainer = genButtons( fOk, fCancel );
        instance.rContainer.appendChild(btnsContainer);

    },
    "dateFormat": "d.m.Y"
};


let doubleSettings = {
    "locale": Russian,
    "closeOnSelect": false,
    "prevArrow": prevArrow,
    "nextArrow": nextArrow,
    "onReady":function(selectedDates, dateStr, instance){

        let fOk = function(){
            dateStr = instance.formatDate(instance.selectedDates[0], instance.config.dateFormat);
            instance.element.firstElementChild.firstElementChild.innerHTML = dateStr;
            instance.close();
        };
        let fCancel = function(){
            instance.element.firstElementChild.firstElementChild.innerHTML = 'ДД.ММ.ГГГГ';
            instance.clear();
        };

        let btnsContainer = genButtons( fOk, fCancel );
        instance.rContainer.appendChild(btnsContainer);

},
    "dateFormat": "d.m.Y"
};

let e = document.querySelectorAll('.js-dropdown-date-range_single .js-dropdown__select');
Object.values(e).map(function(v, i){
    flatpickr(v, singleSettings);
});

e = document.querySelectorAll('.js-dropdown-date-range_splitted .js-dropdown__select');
Object.values(e).map(function(v, i){
    flatpickr(v, splittedSettings);
});

e = document.querySelectorAll('.js-dropdown-date-range_double .js-dropdown__select');
Object.values(e).map(function(v, i){
    flatpickr(v, doubleSettings);
});