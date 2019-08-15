import Glide from '@glidejs/glide'

let sliders = document.querySelectorAll('.glide');
Object.values(sliders).map(function(v, i){
    new Glide(v,{
        type: 'carousel',
        perView: 1,
        focusAt: 'center',
        classes: {
            direction: {
                ltr: 'glide_ltr',
                rtl: 'glide_rtl'
            },
            slider: 'glide_slider',
            carousel: 'glide_carousel',
            swipeable: 'glide_swipeable',
            dragging: 'glide_dragging',
            cloneSlide: 'glide__slide_clone',
            activeNav: 'glide__bullet_active',
            activeSlide: 'glide__slide_active',
            disabledArrow: 'glide__arrow_disabled'
        }
    }).mount();
});

