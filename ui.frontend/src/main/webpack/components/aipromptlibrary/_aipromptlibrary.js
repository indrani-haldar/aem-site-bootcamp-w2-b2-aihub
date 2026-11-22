(function () {
    function getPromptText(markup) {
        var parsed = new DOMParser().parseFromString(markup, "text/html");
        return (parsed.body.innerText || parsed.body.textContent || "").trim();
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }

        var textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();

        var copied = document.execCommand("copy");
        document.body.removeChild(textarea);

        if (!copied) {
            return Promise.reject(new Error("Clipboard copy was not permitted."));
        }
        return Promise.resolve();
    }

    document.addEventListener("click", function (event) {
        var target = event.target;
        var button = target && target.closest
            ? target.closest("[data-copy-prompt]")
            : null;

        if (!button) {
            return;
        }

        var text = getPromptText(button.getAttribute("data-prompt-text") || "");
        var label = button.querySelector("[data-copy-label]");

        if (!text) {
            if (label) {
                label.textContent = "Prompt unavailable";
            }
            return;
        }

        copyText(text).then(function () {
            if (label) {
                label.textContent = "Copied!";
                window.setTimeout(function () {
                    label.textContent = "Copy Prompt";
                }, 2000);
            }
        }).catch(function (error) {
            console.error("Could not copy the prompt text.", error);
            if (label) {
                label.textContent = "Copy failed";
                window.setTimeout(function () {
                    label.textContent = "Copy Prompt";
                }, 2000);
            }
        });
    });
}());
