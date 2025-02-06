document.addEventListener('DOMContentLoaded', function() {
    var menu = document.getElementById('menu');
    var navbar = document.querySelector('.navbar');

    menu.addEventListener('click', function() {
        this.classList.toggle('fa-times');
        navbar.classList.toggle('nav-toggle');
    });
});
