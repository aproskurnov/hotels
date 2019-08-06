let collection = document.getElementsByClassName('js-checkbox-expandable');
Object.values(collection).map(function(val, idx, arr){
    let el = val.getElementsByClassName('js-checkbox-expandable__title').item(0);
    el.addEventListener('click', function(){
        val.classList.toggle('checkbox-expandable_expanded');
    })
});