import {pluralize} from '../../src/lib/utils'

document.addEventListener('click', function(e) {
    elements = document.querySelectorAll('.js-dropdown.dropdown_expanded');
    Object.values(elements).map(function(v){
        if (!v.contains(e.target)){
            v.classList.remove('dropdown_expanded');
        }
    });
});

var dropdowns = document.querySelectorAll('.js-dropdown_expandable');
for (let d of dropdowns){
    let el = d.getElementsByClassName('js-dropdown__select').item(0);
    el.addEventListener('click', function(e){
        let content = el.querySelector('.js-dropdown__content');
        if(!content.contains(e.target)){
            d.classList.toggle('dropdown_expanded')
        }
    })
}

function calcVal(dropdown){
    let vals = dropdown.getElementsByClassName('dropdown-item__value');
    let count = 0;
    for( var v of vals){
        count += Number(v.innerHTML);
    }
    return count;
}

function recalcBedroom(dropdown){
    let vals = dropdown.getElementsByClassName('dropdown-item__value');
    let c = 1;
    let count = 0;
    let res = "";
    for( let v of vals){
        let n = Number(v.innerHTML);
        count += n;
        switch (c) {
            case 1:
                res += count + ' ' + pluralize(n, 'спал', 'ьня', 'ьни', 'ен');
                break;
            case 2:
                res += ', ';
                res += count + ' ' + pluralize(n, 'кроват', 'ь', 'и', 'ей');
                break;
            case 3:
                res += ', ';
                res += count + ' ' + pluralize(n, 'ванн', 'ая комната', 'ых комнаты', 'ых комнат');
                break;
        }
        c++;
    }
    if (count > 0){
        res = res.substr(0, 20) + '...';
        dropdown.getElementsByClassName('dropdown__value').item(0).innerHTML = res;
    }else{
        dropdown.getElementsByClassName('dropdown__value').item(0).innerHTML = 'Не задано';
    }
}

//controls
let minus = document.getElementsByClassName('dropdown-item__minus');
for( let el of minus ){
    el.addEventListener('click', function(e){
        e.preventDefault();
        let btn = this.firstChild;
        if (!btn.classList.contains('round-button_disabled')){
            let i = --this.nextSibling.innerHTML;
            if (i === 0){
                btn.classList.add('round-button_disabled');
            }

            let dropdown = this.closest('.dropdown');
            if (dropdown.classList.contains('dropdown_bedroom')){
                recalcBedroom(dropdown);
            }
        }

    })
}

let plus = document.getElementsByClassName('dropdown-item__plus');
for( let el of plus ){
    el.addEventListener('click', function(e){
        e.preventDefault();
        let btn = this.firstChild;
        if (!btn.classList.contains('round-button_disabled')){
            let i = ++this.previousSibling.innerHTML;
            if (i > 0){
                this.previousSibling.previousSibling.firstChild.classList.remove('round-button_disabled');
            }

            let dropdown = this.closest('.dropdown');
            if (dropdown.classList.contains('dropdown_bedroom')){
                recalcBedroom(dropdown);
            }
        }
        return false;
    })
}

//buttons
let ok = document.getElementsByClassName('dropdown-link_ok');
for( let el of ok ){
    el.addEventListener('click', function(e){
        e.preventDefault();
        let dropdown = this.closest('.dropdown');
        let count = calcVal(dropdown);

        if (count > 0){
            dropdown.getElementsByClassName('dropdown__value').item(0).innerHTML = count + ' ' + pluralize(count, 'Гост', 'ь','я', 'ей');
            dropdown.getElementsByClassName('dropdown-link_cancel').item(0).classList.remove('dropdown-link_disabled')
        }
        dropdown.classList.toggle('dropdown_expanded');
    })
}

let cancel = document.getElementsByClassName('dropdown-link_cancel');
for( let el of cancel ){
    el.addEventListener('click', function(e){
        e.preventDefault();
        let dropdown = this.closest('.dropdown');
        let vals = dropdown.getElementsByClassName('dropdown-item__value');
        for( let v of vals){
            v.innerHTML = 0;
        }
        vals = dropdown.getElementsByClassName('dropdown-item__minus');
        for( let v of vals){
            v.firstChild.classList.add('round-button_disabled');
        }

        dropdown.getElementsByClassName('dropdown__value').item(0).innerHTML = "Сколько гостей";
        this.classList.add('dropdown-link_disabled');

    })
}