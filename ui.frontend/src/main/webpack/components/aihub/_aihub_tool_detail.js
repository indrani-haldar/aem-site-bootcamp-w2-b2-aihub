(function () {
    // Fills the hero from catalog cards or home teasers (query params from _aitoolcard.js).
    function init() {
        var hero = document.querySelector(".cmp-aitoolhero");
        var params = new URLSearchParams(window.location.search);
        if (!hero || !params.get("name")) {
            return;
        }

        var name = params.get("name");
        var title = hero.querySelector(".cmp-aitoolhero__title");
        var category = hero.querySelector(".cmp-aitoolhero__category");
        var description = hero.querySelector(".cmp-aitoolhero__description");
        var img = hero.querySelector(".cmp-aitoolhero__image img");

        if (title) {
            title.textContent = name;
        }
        if (category && params.get("category")) {
            category.textContent = params.get("category");
        }
        if (description && params.get("description")) {
            description.textContent = params.get("description");
        }
        if (img) {
            // Only same-site asset paths are accepted
            var src = params.get("image");
            if (src && src.charAt(0) === "/" && src.charAt(1) !== "/") {
                img.setAttribute("src", src);
            }
            img.setAttribute("alt", name);
        }

        var crumb = document.querySelector(".cmp-breadcrumb__item--active [itemprop='name']");
        if (crumb) {
            crumb.textContent = name;
        }
        document.title = name;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
