import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";



let range = document.querySelectorAll('.js-slider__element');
Object.values(range).map(function(v){
    noUiSlider.create(v, {
        range:{
            'min': 0,
            'max': 20000
        },
        step: 1000,
        start: [5000, 10000],
        margin: 1000,
        connect: [false, true, false],
    }).on('update', function(values){
        let el = this.target.closest('.js-slider').querySelector('.js-slider__subtitle');
        const ch = '₽';
        el.innerHTML = +values[0] + ch + ' - ' + +values[1] + ch;
    });
});