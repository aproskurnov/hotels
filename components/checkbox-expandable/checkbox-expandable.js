let collection = document.getElementsByClassName('js-checkbox-expandable');
Object.values(collection).map(function(v){
    let el = v.getElementsByClassName('js-checkbox-expandable__title').item(0);
    el.addEventListener('click', function(){
        v.classList.toggle('checkbox-expandable_expanded');
    })
});