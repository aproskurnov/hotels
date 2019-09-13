let btns = document.querySelectorAll('.js-radio-button');
Object.values(btns).map(function(v){
    v.addEventListener('click', function(){
        v.querySelector('.js-radio-button__input').checked = true;
    })
});