let elements = document.querySelectorAll('.js-header__menu-element_parent');
Object.values(elements).map(function(v,i){
    v.addEventListener('click', function(e){
        v.classList.toggle('header__menu-element_expanded');
    })
});


document.addEventListener('click', function(e) {
    elements = document.querySelectorAll('.js-header__menu-element_parent.header__menu-element_expanded');
    Object.values(elements).map(function(v,i){
        if (!v.contains(e.target)){
            v.classList.remove('header__menu-element_expanded');
        }
    });
});

elements = document.querySelectorAll('.js-header__menu-expand-button');
Object.values(elements).map(function(v,i){
    v.addEventListener('click', function(e) {
        v.classList.toggle('header__menu-expand-button_expanded');
        v.closest('.js-header__interface').querySelector('.js-header__menu').classList.toggle('header__menu_expanded');
    });
});

document.addEventListener('click', function(e) {
    elements = document.querySelectorAll('.js-header__menu.header__menu_expanded');
    Object.values(elements).map(function(v,i){
        let btn = document.querySelector('.js-header__menu-expand-button');

        if (!v.contains(e.target) && !(btn.contains(e.target))){
            v.classList.remove('header__menu_expanded');
        }
    });
});