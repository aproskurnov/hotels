import {pluralize} from '../../src/lib/utils'

document.addEventListener('click', function(e) {
    let elements = document.querySelectorAll('.js-dropdown.dropdown_expanded');
    Object.values(elements).map(function(v){
        if (!v.contains(e.target)){
            v.classList.remove('dropdown_expanded');
        }
    });
});

var dropdowns = document.querySelectorAll('.js-dropdown_expandable');
Object.values(dropdowns).map((v)=>{
    let el = v.querySelector('.js-dropdown__select');
    el.addEventListener('click', function(e){
        let content = el.querySelector('.js-dropdown__content');
        if(!content.contains(e.target)){
            v.classList.toggle('dropdown_expanded')
        }
    })
});

function calcVal(dropdown){
    let vals = dropdown.querySelectorAll('.js-dropdown-item__value');
    let count = 0;
    Object.values(vals).map((v)=>{
        count += +v.innerHTML;
    });
    return count;
}

function recalcBedroom(dropdown){
    let vals = dropdown.querySelectorAll('.js-dropdown-item__value');
    let c = 1;
    let count = 0;
    let res = "";
    let total = 0;
    Object.values(vals).map((v)=>{
        count = +v.innerHTML;
        total += count;
        switch (c) {
            case 1:
                res += count + ' ' + pluralize(count, 'спал', 'ьня', 'ьни', 'ен');
                break;
            case 2:
                res += ', ';
                res += count + ' ' + pluralize(count, 'кроват', 'ь', 'и', 'ей');
                break;
            case 3:
                res += ', ';
                res += count + ' ' + pluralize(count, 'ванн', 'ая комната', 'ых комнаты', 'ых комнат');
                break;
        }
        c++;
    });
    if (total > 0){
        res = res.substr(0, 20) + '...';
        dropdown.querySelector('.js-dropdown__value').innerHTML = res;
    }else{
        dropdown.querySelector('.js-dropdown__value').innerHTML = 'Не задано';
    }
}

//controls
let minuses = document.querySelectorAll('.js-dropdown-item__minus .js-round-button');
Object.values(minuses).map((v)=>{
    v.addEventListener('click', function(e){
        e.preventDefault();
        if (!v.classList.contains('round-button_disabled')){
            let i = --v.parentNode.nextSibling.innerHTML;
            if (i === 0){
                v.classList.add('round-button_disabled');
            }

            let dropdown = v.closest('.js-dropdown.dropdown_bedroom');
            if (dropdown){
                recalcBedroom(dropdown);
            }
        }

    })
});

let pluses = document.querySelectorAll('.js-dropdown-item__plus .js-round-button');
Object.values(pluses).map((v)=>{
    v.addEventListener('click', function(e){
        e.preventDefault();
        if (!v.classList.contains('round-button_disabled')){
            let i = ++v.parentNode.previousSibling.innerHTML;
            if (i > 0){
                v.parentNode.previousSibling.previousSibling.firstChild.classList.remove('round-button_disabled');
            }

            let dropdown = this.closest('.dropdown.dropdown_bedroom');
            if (dropdown){
                recalcBedroom(dropdown);
            }
        }
    })
});

//buttons
let oks = document.querySelectorAll('.js-dropdown-link_ok .js-button');
Object.values(oks).map((v)=>{
    v.addEventListener('click', function(e){
        e.preventDefault();
        let dropdown = this.closest('.js-dropdown');
        let count = calcVal(dropdown);

        if (count > 0){
            dropdown.querySelector('.js-dropdown__value').innerHTML = count + ' ' + pluralize(count, 'Гост', 'ь','я', 'ей');
            dropdown.querySelector('.js-dropdown-link_cancel').classList.remove('dropdown-link_disabled')
        }
        dropdown.classList.toggle('dropdown_expanded');
    })
});

let cancels = document.querySelectorAll('.js-dropdown-link_cancel .js-button');
Object.values(cancels).map((v)=>{
    v.addEventListener('click', function(e){
        e.preventDefault();
        let dropdown = this.closest('.js-dropdown');
        let vals = dropdown.querySelectorAll('.js-dropdown-item__value');
        for( let v of vals){
            v.innerHTML = 0;
        }
        vals = dropdown.querySelectorAll('.js-dropdown-item__minus');
        for( let v of vals){
            v.firstChild.classList.add('round-button_disabled');
        }

        dropdown.querySelector('.js-dropdown__value').innerHTML = "Сколько гостей";
        this.parentElement.classList.add('dropdown-link_disabled');

    })
});