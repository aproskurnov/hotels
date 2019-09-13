let btns = document.querySelectorAll('.js-like-button');
Object.values(btns).map(function(v){
    v.addEventListener('click', function(){
        v.classList.toggle('like-button_checked')
    })
});