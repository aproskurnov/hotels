let btns = document.getElementsByClassName('js-like-button');
Object.values(btns).map(function(e, i, a){
    e.addEventListener('click', function(){
        e.classList.toggle('like-button_checked')
    })
});