let btns = document.getElementsByClassName('js-radio-button');
Object.values(btns).map(function(btn, i){
    btn.addEventListener('click', function(){
        btn.getElementsByClassName('js-radio-button__input').item(0).checked = true;
    })
});