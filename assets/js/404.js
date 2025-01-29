$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Add JavaScript functions to adjust layout dynamically when new content is added
    function adjustLayout() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const observer = new MutationObserver(() => {
                // Adjust layout dynamically
                section.style.minHeight = 'auto';
                section.style.padding = '2rem 9%';
            });
            observer.observe(section, { childList: true, subtree: true });
        });
    }

    window.addEventListener('load', adjustLayout);
    window.addEventListener('resize', adjustLayout);

    // Ensure dynamic adjustments for 404 page content
    function ensureDynamicAdjustments() {
        const page404Section = document.querySelector('.page_404');
        if (page404Section) {
            adjustLayout();
        }
    }

    window.addEventListener('load', ensureDynamicAdjustments);
    window.addEventListener('resize', ensureDynamicAdjustments);

    // Fix any issues or bugs found in the JavaScript
    // Ensure dynamic adjustments for 404 page content
    function ensureDynamicAdjustments() {
        const page404Section = document.querySelector('.page_404');
        if (page404Section) {
            adjustLayout();
        }
    }

    window.addEventListener('load', ensureDynamicAdjustments);
    window.addEventListener('resize', ensureDynamicAdjustments);
});
