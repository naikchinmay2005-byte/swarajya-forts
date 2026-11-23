(() => {
    const duration = 4000;
    let navigating = false;

    const overlay = document.createElement("div");
    overlay.className = "page-transition";
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "assertive");
    overlay.setAttribute("aria-label", "जय भवानी, जय शिवाजी");
    overlay.innerHTML = `
        <div class="page-transition-content">
            <svg class="page-transition-flag" viewBox="0 0 120 150" aria-hidden="true">
                <path class="page-transition-pole" d="M25 142V12"/>
                <path class="page-transition-cloth" d="M29 17h75L75 48l29 31H29z"/>
            </svg>
            <p lang="mr">जय भवानी&nbsp;&nbsp;जय शिवाजी</p>
        </div>`;
    document.body.appendChild(overlay);

    function navigateTo(url) {
        const destination = new URL(url, window.location.href);
        const current = new URL(window.location.href);
        if (destination.origin !== current.origin) {
            window.location.assign(destination.href);
            return;
        }

        navigating = true;
        overlay.classList.add("is-visible");
        window.setTimeout(() => {
            window.location.assign(destination.href);
        }, duration);
    }

    window.swarajyaNavigate = navigateTo;

    document.addEventListener("click", (event) => {
        const link = event.target.closest("a[href]");
        if (!link || navigating || event.defaultPrevented || event.button !== 0 ||
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
            link.target && link.target !== "_self" || link.hasAttribute("download")) return;

        const destination = new URL(link.href, window.location.href);
        const current = new URL(window.location.href);
        if (destination.origin !== current.origin ||
            destination.pathname === current.pathname &&
            destination.search === current.search) return;

        event.preventDefault();
        navigateTo(destination.href);
    });
})();
