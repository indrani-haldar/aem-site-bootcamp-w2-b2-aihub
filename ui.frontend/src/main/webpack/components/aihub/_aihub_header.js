(function () {
    var MOBILE_QUERY = "(max-width: 768px)";

    function init(header) {
        var grid = header.querySelector(".aem-Grid");
        var title = header.querySelector(".title");
        if (!grid || !title || header.querySelector(".aihub-header__toggle")) {
            return;
        }

        var toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "aihub-header__toggle";
        toggle.setAttribute("aria-label", "Toggle navigation");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = "<span></span><span></span><span></span>";
        title.insertAdjacentElement("afterend", toggle);

        function setOpen(open) {
            header.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        }

        toggle.addEventListener("click", function () {
            setOpen(!header.classList.contains("is-open"));
        });

        header.addEventListener("click", function (event) {
            if (event.target.closest(".cmp-navigation__item-link")) {
                setOpen(false);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                setOpen(false);
            }
        });

        window.matchMedia(MOBILE_QUERY).addEventListener("change", function (e) {
            if (!e.matches) {
                setOpen(false);
            }
        });
    }

    function ready() {
        var header = document.getElementById("aihub-header");
        if (header) {
            init(header);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", ready);
    } else {
        ready();
    }
})();
