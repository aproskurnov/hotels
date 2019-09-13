import {pluralize} from '../../src/lib/utils'

let chart = document.querySelector('.js-chart');
let data;
if (chart){
     data = JSON.parse(chart.getAttribute('data'));
}

let titles = document.querySelectorAll('.js-chart__list-element');
Object.values(titles).map((v,i)=>{

    let el = data[i];
    let circle = document.querySelector('.js-chart__circle'+i);

    let center = document.querySelector('.js-chart__center');
    let centerVotes = center.querySelector('.js-chart__votes');
    let centerText = center.querySelector('.js-chart__votes-text');

    v.addEventListener('mouseover', ()=>{
        changeLength(el, circle, 55, 10);
        center.classList.toggle('chart__center_'+i);

        centerVotes.innerHTML = el.votes;
        centerText.innerHTML = pluralize(el.votes, 'голос', '', 'а', 'ов');
    });

    v.addEventListener('mouseout', ()=>{
        changeLength(el, circle, 58, 4);
        center.classList.toggle('chart__center_'+i);

        centerVotes.innerHTML = "";
        centerText.innerHTML = "";
    });
});

function changeLength(el, circle, r, w) {
    if (el.votes){
        let length = 2 * Math.PI * r;
        let strokeDashoffset = length - el.percent * length;

        circle.setAttribute('r', r);
        circle.setAttribute('stroke-width', w);
        circle.setAttribute('stroke-dasharray', length);
        circle.setAttribute('stroke-dashoffset', strokeDashoffset);
    }
}
