function pluralize(count, base, singular, plural1, plural2) {
    return count + ' ' + base + ( ( count = (count %= 100) > 20 ? count % 10 : count ) === 0 || count > 4 ? plural2 : count > 1 ? plural1 : singular );
}


var selects = document.getElementsByClassName('dropdown__select');
for (let el of selects){
    el.addEventListener('click', function(){
        let p = this.parentNode;
        if (p.classList.contains('dropdown_expand')){
            p.classList.remove('dropdown_expand');
        }else{
            p.classList.add('dropdown_expand')
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
                res += pluralize(n, 'спал', 'ьня', 'ьни', 'ен');
                break;
            case 2:
                res += ', ';
                res += pluralize(n, 'кроват', 'ь', 'и', 'ей');
                break;
            case 3:
                res += ', ';
                res += pluralize(n, 'ванн', 'ая комната', 'ых комнаты', 'ых комнат');
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
    el.addEventListener('click', function(){
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
    el.addEventListener('click', function(){
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
    })
}

//buttons
let ok = document.getElementsByClassName('dropdown-link_ok');
for( let el of ok ){
    el.addEventListener('click', function(){
        let dropdown = this.closest('.dropdown');
        let count = calcVal(dropdown);

        if (count > 0){
            dropdown.getElementsByClassName('dropdown__value').item(0).innerHTML = pluralize(count, 'Гост', 'ь','я', 'ей');
            dropdown.getElementsByClassName('dropdown-link_cancel').item(0).classList.remove('dropdown-link_disabled')
        }
    })
}

let cancel = document.getElementsByClassName('dropdown-link_cancel');
for( let el of cancel ){
    el.addEventListener('click', function(){
        let dropdown = this.closest('.dropdown');
        let vals = dropdown.getElementsByClassName('dropdown-item__value');
        let count = 0;
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