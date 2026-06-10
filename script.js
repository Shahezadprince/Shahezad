/* filename: script.js */
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const rootBodyElement = document.body;
    const activeThemePreference = localStorage.getItem('portfolio-ui-theme');
    
    if (activeThemePreference === 'light') {
        rootBodyElement.classList.remove('dark-theme');
        rootBodyElement.classList.add('light-theme');
    } else {
        rootBodyElement.classList.add('dark-theme');
        rootBodyElement.classList.remove('light-theme');
    }

    themeToggleButton.addEventListener('click', () => {
        if (rootBodyElement.classList.contains('dark-theme')) {
            rootBodyElement.classList.remove('dark-theme');
            rootBodyElement.classList.add('light-theme');
            localStorage.setItem('portfolio-ui-theme', 'light');
        } else {
            rootBodyElement.classList.remove('light-theme');
            rootBodyElement.classList.add('dark-theme');
            localStorage.setItem('portfolio-ui-theme', 'dark');
        }
    });

    const structuralSectionNodes = document.querySelectorAll('section[id], header[id]');
    const globalNavLinkElements = document.querySelectorAll('.nav-link');

    const evaluateActiveNavigationNode = () => {
        const verticalScrollPosition = window.scrollY + 120;

        structuralSectionNodes.forEach(currentNode => {
            const nodeTopBound = currentNode.offsetTop;
            const nodeBottomBound = nodeTopBound + currentNode.offsetHeight;
            const nodeIdString = currentNode.getAttribute('id');

            if (verticalScrollPosition >= nodeTopBound && verticalScrollPosition < nodeBottomBound) {
                globalNavLinkElements.forEach(currentLink => {
                    currentLink.classList.remove('active');
                    if (currentLink.getAttribute('href') === `#${nodeIdString}`) {
                        currentLink.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', evaluateActiveNavigationNode);
});
