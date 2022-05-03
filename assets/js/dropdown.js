let dropdownToggle = document.querySelector('.dropdown-toggle');
let dropdownMenu = document.querySelector('.dropdown-menu');
let clicked = false;

dropdownToggle.addEventListener('click', function (event) {
    if (!clicked) {
        clicked = true;
        dropdownMenu.classList.add('show');
        dropdownMenu.setAttribute('style', 'position: absolute; inset: 10px 30px auto auto; margin: 0px; transform: translate3d(0px, 39px, 0px);');
    } else {
        clicked = false;
        dropdownMenu.classList.remove('show');
        dropdownMenu.removeAttribute('style');
    }
});