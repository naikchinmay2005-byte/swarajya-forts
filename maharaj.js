(() => {
    const mapRoot = document.getElementById("life-map");
    const stopList = document.getElementById("life-stop-list");
    const detail = document.getElementById("life-stop-detail");
    const status = document.getElementById("life-map-status");

    if (!mapRoot || !stopList || !detail || !status) return;

    const stops = [
        {
            name: "Shivneri",
            coordinates: [19.20, 73.86],
            year: "1630",
            title: "A beginning in the hills",
            description: "Shivaji Maharaj was born at Shivneri Fort, near Junnar in present-day Pune district.",
            mapLabel: "Birthplace · Junnar"
        },
        {
            name: "Torna",
            coordinates: [18.28, 73.62],
            year: "1646",
            title: "The first stronghold",
            description: "The capture of Torna is remembered as an early milestone in Shivaji Maharaj’s campaign to establish Swarajya.",
            mapLabel: "Early Swarajya milestone"
        },
        {
            name: "Raigad",
            coordinates: [18.23, 73.44],
            year: "1674 · 1680",
            title: "Capital and final resting place",
            description: "Shivaji Maharaj was crowned at Raigad in 1674 and died there in 1680. The fort became the capital of his kingdom.",
            mapLabel: "Coronation · Capital"
        }
    ];

    let activeIndex = 0;
    let map;
    const markers = [];
    const buttons = [];

    function renderDetail(stop) {
        detail.innerHTML = `
            <span class="life-stop-year">${stop.year}</span>
            <h3>${stop.title}</h3>
            <p>${stop.description}</p>
            <a class="life-stop-story-link" href="index.html?fort=${encodeURIComponent(stop.name)}#forts">
                View ${stop.name} fort story <span aria-hidden="true">↗</span>
            </a>`;
    }

    function selectStop(index, moveMap = true) {
        activeIndex = index;
        const stop = stops[index];
        buttons.forEach((button, buttonIndex) => {
            const active = buttonIndex === index;
            button.setAttribute("aria-current", String(active));
            markers[buttonIndex].getElement()?.classList.toggle("is-active", active);
        });
        renderDetail(stop);
        if (moveMap && map) map.flyTo(stop.coordinates, 8, { duration: 0.6 });
    }

    stops.forEach((stop, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "life-stop-button";
        button.setAttribute("aria-current", "false");
        button.innerHTML = `
            <span class="life-stop-number">${String(index + 1).padStart(2, "0")}</span>
            <span><strong>${stop.name}</strong><small>${stop.year}</small></span>
            <span class="life-stop-arrow" aria-hidden="true">↗</span>`;
        button.addEventListener("click", () => selectStop(index));
        stopList.appendChild(button);
        buttons.push(button);
    });

    if (!window.L) {
        status.textContent = "The interactive map could not load. Check your internet connection and reload this page.";
        status.classList.remove("hidden");
        renderDetail(stops[activeIndex]);
        return;
    }

    map = L.map(mapRoot, { scrollWheelZoom: false, zoomControl: true }).setView([18.7, 73.65], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
        maxZoom: 19
    }).addTo(map);

    stops.forEach((stop, index) => {
        const icon = L.divIcon({
            className: "",
            html: `<span class="life-map-marker">${index + 1}</span>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17]
        });
        const marker = L.marker(stop.coordinates, { icon, title: `${stop.name}: ${stop.mapLabel}` })
            .bindPopup(`<div class="life-map-popup"><strong>${stop.name} · ${stop.year}</strong><span>${stop.mapLabel}</span></div>`)
            .addTo(map);
        marker.on("click", () => selectStop(index, false));
        markers.push(marker);
    });

    map.fitBounds(L.latLngBounds(stops.map((stop) => stop.coordinates)), { padding: [40, 40] });
    map.on("tileerror", () => {
        status.textContent = "Map tiles could not load. Check your internet connection.";
        status.classList.remove("hidden");
    });
    map.on("tileload", () => status.classList.add("hidden"));
    renderDetail(stops[activeIndex]);
    selectStop(activeIndex, false);
    window.setTimeout(() => map.invalidateSize(), 100);
})();
