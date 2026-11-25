(function () {
    var DETAIL_PAGE = "ai-tool-details-page.html";

    function inAuthorEditor() {
        try {
            return !!(window.parent !== window && window.parent.Granite && window.parent.Granite.author);
        } catch (e) {
            return false;
        }
    }

    function text(el) {
        return el ? el.textContent.trim() : "";
    }

    function buildUrl(card) {
        var isTeaser = card.matches(".cmp-teaser");
        var img = card.querySelector(isTeaser ? ".cmp-teaser__image img" : ".ai-tool-card__icon img");
        var category = card.querySelector(isTeaser ? ".cmp-teaser__description" : ".ai-tool-card__category");
        var params = new URLSearchParams({
            toolId: card.getAttribute("data-tool-id") || (isTeaser ? card.id : ""),
            name: text(card.querySelector(isTeaser ? ".cmp-teaser__title" : ".ai-tool-card__title")),
            description: text(card.querySelector(isTeaser ? ".cmp-teaser__description" : ".ai-tool-card__description")),
            category: category ? category.getAttribute("data-category") || text(category) : "",
            image: img ? img.getAttribute("src") : ""
        });

        // Home, catalog and detail pages share the same language folder.
        var base = window.location.pathname.replace(/[^/]*$/, "");
        return base + DETAIL_PAGE + "?" + params.toString();
    }

    function go(card) {
        if (!inAuthorEditor()) {
            window.location.href = buildUrl(card);
        }
    }

    function init() {
        document.querySelectorAll(".aitoolcard .ai-tool-card").forEach(function (card) {
            card.setAttribute("role", "link");
            card.setAttribute("tabindex", "0");
            card.addEventListener("click", function () {
                go(card);
            });
            card.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    go(card);
                }
            });
        });

        if (!inAuthorEditor()) {
            document.querySelectorAll("#aihub-home-teaser .cmp-teaser").forEach(function (teaser) {
                var url = buildUrl(teaser);
                var links = teaser.querySelectorAll("a");
                if (links.length) {
                    links.forEach(function (link) {
                        link.setAttribute("href", url);
                    });
                } else {
                    var link = document.createElement("a");
                    link.className = "cmp-teaser__link";
                    link.setAttribute("href", url);
                    while (teaser.firstChild) {
                        link.appendChild(teaser.firstChild);
                    }
                    teaser.appendChild(link);
                }
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
