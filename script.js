const path = window.location.pathname.toLowerCase();

if (path.includes("login.html")) {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const loginToggle = document.getElementById("login-toggle");
    const signupToggle = document.getElementById("signup-toggle");

    loginToggle.addEventListener("click", () => {
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        loginToggle.classList.add("active");
        signupToggle.classList.remove("active");
    });

    signupToggle.addEventListener("click", () => {
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        signupToggle.classList.add("active");
        loginToggle.classList.remove("active");
    });

    function validateEmail(input) {
        const message = input.parentElement.querySelector(".validation-message");
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        input.classList.toggle("invalid", !valid);
        message.textContent = valid ? "" : "Enter a valid email address.";
        return valid;
    }

    ["login-email", "signup-email"].forEach((id) => {
        document.getElementById(id).addEventListener("input", (event) => validateEmail(event.target));
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateEmail(document.getElementById("login-email"))) return;
        window.swarajyaNavigate("index.html");
    });

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateEmail(document.getElementById("signup-email"))) return;
        window.swarajyaNavigate("index.html");
    });
}

if (path.includes("index.html") || path.endsWith("/chinmay naik/") || path.endsWith("/chinmay naik")) {
    const fortsData = [
        { name: "Raigad", location: "Raigad District, Maharashtra", type: "hill", image: "images/Raigad.jpg", map: [18.23, 73.44], summary: "The crowning jewel of the Maratha Empire and the capital during the reign of Chhatrapati Shivaji Maharaj." },
        { name: "Shivneri", location: "Junnar, Pune District", type: "hill", image: "images/Shivneri.jpg", map: [19.20, 73.86], summary: "The birthplace of Chhatrapati Shivaji Maharaj, whose childhood was shaped within these hill fort walls." },
        { name: "Pratapgad", location: "Satara District, Maharashtra", type: "hill", image: "images/Pratapgad.jpg", map: [17.94, 73.58], summary: "The fort where the legendary Battle of Pratapgad against Afzal Khan reshaped the politics of the Deccan." },
        { name: "Sinhagad", location: "Pune District, Maharashtra", type: "hill", image: "images/Sinhagad.jpg", map: [18.37, 73.76], summary: "Immortalised by Tanaji Malusare's 1670 victory and Shivaji Maharaj's remembrance: The fort is won, but the lion is lost." },
        { name: "Panhala", location: "Kolhapur District, Maharashtra", type: "hill", image: "images/Panhala.jpg", map: [16.81, 74.11], summary: "A vast hill fort where Shivaji Maharaj endured a siege before escaping toward Vishalgad at Pavan Khind." },
        { name: "Rajgad", location: "Pune District, Maharashtra", type: "hill", image: "images/Rajgad.jpg", map: [18.25, 73.68], summary: "The first capital of the Maratha Empire for nearly two decades, recognised by its three fortified plateaus." },
        { name: "Torna", location: "Pune District, Maharashtra", type: "hill", image: "images/Torna.jpg", map: [18.28, 73.62], summary: "The first fort captured by Shivaji Maharaj in 1646, marking the beginning of his campaign for Swarajya." },
        { name: "Purandar", location: "Pune District, Maharashtra", type: "hill", image: "images/purandar.JPG", map: [18.28, 73.97], summary: "A formidable hill fort associated with Murarbaji Deshpande's sacrifice and the 1665 Treaty of Purandar." },
        { name: "Sindhudurg", location: "Malvan, Konkan Coast", type: "sea", image: "images/sindhudurg.jpg", map: [16.04, 73.46], summary: "A 17th-century island fortress built to protect the Maratha coast and establish naval strength." },
        { name: "Vijaydurg", location: "Sindhudurg District, Konkan", type: "sea", image: "images/vijaydurg.jpg", map: [16.56, 73.33], summary: "One of the strongest coastal forts, used as a major naval base for the Maratha fleet." },
        { name: "Lohagad", location: "Pune District, Maharashtra", type: "hill", image: "images/lohagad.jpg", map: [18.71, 73.48], summary: "A strategic treasury fort famed for its scorpion-tail-shaped Vinchu Kata bastion." },
        { name: "Vishalgad", location: "Kolhapur District, Maharashtra", type: "hill", image: "images/Vishalgad.jpg", map: [16.82, 74.00], summary: "The destination of Shivaji Maharaj's escape from Panhala, secured by Baji Prabhu's stand at Pavan Khind." },
        { name: "Salher", location: "Nashik District, Maharashtra", type: "hill", image: "images/Salher.jpg", map: [20.72, 73.95], summary: "The site of a major Maratha victory over Mughal forces in 1672, strengthening Maratha prestige." },
        { name: "Mulher", location: "Nashik District, Maharashtra", type: "hill", image: "images/mulher.jpg", map: [20.77, 74.07], summary: "Part of the historic Salher-Mulher strongholds that guarded the strategic Baglan region." },
        { name: "Suvarnadurg", location: "Ratnagiri District, Konkan", type: "sea", image: "images/suvarnadurg.jpg", map: [17.85, 73.09], summary: "A Konkan sea fort used for shipbuilding and repair by the Maratha naval force." },
        { name: "Janjira", location: "Murud, Raigad District, Maharashtra", type: "sea", image: "images/Janjira.jpg", imageCredit: "Photo: Sagar Jadhav / Wikimedia Commons, CC BY-SA 3.0", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Fort_Janjira_Unconquered.JPG", map: [18.299589, 72.964425], summary: "The island stronghold of the Siddis, built off Murud on the Konkan coast. Its sea walls resisted repeated attempts to capture it and made Janjira one of the region's most formidable coastal forts." },
        { name: "Khanderi", location: "Off the coast of Alibag", type: "sea", image: "images/Khanderi.jpg", map: [18.70, 72.82], summary: "An island outpost built to counter the naval power of the Siddis of Janjira." },
        { name: "Padmadurg", location: "Near Murud, Raigad District", type: "sea", image: "images/Padmadurg.jpg", map: [18.28, 72.97], summary: "Also called Kasa Fort, built on a rocky sea outpost to challenge the Siddis of Janjira." },
        { name: "Daulatabad", location: "Daulatabad, Chhatrapati Sambhajinagar District", type: "hill", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Daulatabad_Fort_vrvbajel0924_%28468%29.jpg/960px-Daulatabad_Fort_vrvbajel0924_%28468%29.jpg", imageCredit: "Photo: Vinayaraj / Wikimedia Commons, CC BY-SA 4.0", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Daulatabad_Fort_vrvbajel0924_(468).jpg", map: [19.943, 75.215], summary: "The formidable hill citadel of Devagiri, later called Daulatabad, served successive Deccan powers and is famed for its layered defences and dramatic setting." },
        { name: "Harishchandragad", location: "Malshej region, Ahilyanagar District", type: "hill", image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Entry_gate_Harishchandra_Gad.jpg", imageCredit: "Photo: NileshBedre / Wikimedia Commons, CC BY-SA 4.0", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Entry_gate_Harishchandra_Gad.jpg", map: [19.389, 73.778], summary: "An ancient Sahyadri hill fort known for its temples, caves, Taramati peak, and the dramatic cliff face called Konkan Kada." },
        { name: "Ratangad", location: "Ratanwadi, Ahilyanagar District", type: "hill", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Ratangad_Ganesh_Darwaja.jpg/960px-Ratangad_Ganesh_Darwaja.jpg", imageCredit: "Photo: Jitu Vide / Wikimedia Commons, CC BY-SA 4.0", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Ratangad_Ganesh_Darwaja.jpg", map: [19.50, 73.70], summary: "A high Sahyadri fort overlooking the Bhandardara region, Ratangad is noted for its rock-cut Ganesh Darwaja and distinctive natural rock cleft." },
        { name: "Ajinkyatara", location: "Satara, Maharashtra", type: "hill", image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Ajinkyatara_fort_in_Satara.jpg", imageCredit: "Photo: Phadke09 / Wikimedia Commons, CC BY-SA 4.0", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Ajinkyatara_fort_in_Satara.jpg", map: [17.686, 73.993], summary: "The hill fort above Satara became a strategic centre in Maratha history and gives a commanding view of the city and surrounding valleys." },
        { name: "Vasota", location: "Koyna Wildlife Sanctuary, Satara District", type: "hill", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Vasota_fort_Maharashtra.jpg/960px-Vasota_fort_Maharashtra.jpg", imageCredit: "Photo: Amolmore8999 / Wikimedia Commons, CC0", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Vasota_fort_Maharashtra.jpg", map: [17.737, 73.743], summary: "Also known as Vyaghragad, Vasota is a remote forest fort in the Koyna region, remembered for its rugged setting and strategic role in Maratha-era conflicts." }
    ];

    const grid = document.querySelector(".forts-grid");
    const search = document.getElementById("fort-search");
    const chips = document.querySelectorAll(".filter-chip");
    const count = document.getElementById("visible-count");
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal-content");
    const mapRoot = document.getElementById("fort-map");
    const mapStatus = document.getElementById("map-status");
    const mapIndex = document.getElementById("fort-map-index");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let filter = "all";

    function render() {
        const term = search.value.trim().toLowerCase();
        const visible = fortsData.filter((fort) => {
            const matchesFilter = filter === "all" || fort.type === filter;
            const matchesSearch = `${fort.name} ${fort.location}`.toLowerCase().includes(term);
            return matchesFilter && matchesSearch;
        });

        count.textContent = visible.length;
        grid.innerHTML = visible.length ? visible.map((fort) => {
            const index = String(fortsData.indexOf(fort) + 1).padStart(2, "0");
            return `
                <article class="fort-card" tabindex="0" role="button" aria-label="View ${fort.name}" data-name="${fort.name}">
                    <div class="fort-card-image" style="background-image:url('${fort.image}')"></div>
                    <span class="fort-card-index">${index}</span>
                    <div class="card-content">
                        <h3>${fort.name}</h3>
                        <p class="location">${fort.location}</p>
                        <span class="card-arrow" aria-hidden="true">↗</span>
                    </div>
                </article>`;
        }).join("") : `<p class="no-results">No forts match this search.</p>`;
    }

    function renderMap() {
        fortsData.forEach((fort, index) => {
            const item = document.createElement("li");
            const button = document.createElement("button");
            button.type = "button";
            button.className = "map-index-item";
            button.dataset.name = fort.name;
            button.innerHTML = `<span class="index-number">${String(index + 1).padStart(2, "0")}</span><span class="index-fort-name">${fort.name}</span><span class="index-type">${fort.type === "sea" ? "Sea" : "Hill"}</span>`;
            item.appendChild(button);
            mapIndex.appendChild(item);
        });

        if (!window.L) {
            mapStatus.textContent = "The live map could not load. Check your internet connection and reload this page.";
            mapStatus.classList.remove("hidden");
            return;
        }

        const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>';
        const map = L.map(mapRoot, { scrollWheelZoom: false, zoomControl: true }).setView([18.15, 73.55], 7);
        L.tileLayer(tileUrl, { attribution: tileAttribution, maxZoom: 19 }).addTo(map);
        const mainForts = fortsData;
        const markerGroup = L.markerClusterGroup ? L.markerClusterGroup({
            maxClusterRadius: 38,
            showCoverageOnHover: false,
            spiderfyOnMaxZoom: true,
            iconCreateFunction(cluster) {
                return L.divIcon({
                    className: "fort-cluster-icon",
                    html: `<span class="fort-cluster">${cluster.getChildCount()}</span>`,
                    iconSize: [42, 42],
                    iconAnchor: [21, 21]
                });
            }
        }) : L.layerGroup();
        const bounds = [];
        mainForts.forEach((fort) => {
            const number = String(fortsData.indexOf(fort) + 1).padStart(2, "0");
            const icon = L.divIcon({
                className: "fort-map-icon",
                html: `<span class="map-pin map-pin-${fort.type}">${number}</span>`,
                iconSize: [34, 34],
                iconAnchor: [17, 17]
            });
            const marker = L.marker(fort.map, { icon, title: fort.name, alt: `${fort.name} fort` });
            marker.bindPopup(`<div class="map-popup"><strong>${fort.name}</strong><span>${fort.location}</span><button type="button" class="map-popup-open" data-name="${fort.name}">View fort story ↗</button></div>`);
            markerGroup.addLayer(marker);
            bounds.push(fort.map);
        });
        markerGroup.addTo(map);
        map.fitBounds(bounds, { padding: [34, 34], maxZoom: 8 });

        window.setTimeout(() => {
            map.invalidateSize();
        }, 100);

        let tileErrors = 0;
        const statusTimeout = window.setTimeout(() => {
            if (tileErrors > 0) {
                mapStatus.textContent = "Some map tiles did not load. Check your internet connection.";
                mapStatus.classList.remove("hidden");
            }
        }, 5000);
        map.on("tileload", () => {
            tileErrors = Math.max(0, tileErrors - 1);
            if (tileErrors === 0) mapStatus.classList.add("hidden");
        });
        map.on("tileerror", () => {
            tileErrors++;
            if (tileErrors >= 4) {
                mapStatus.textContent = "Map tiles could not load. Check your internet connection.";
                mapStatus.classList.remove("hidden");
            }
        });
        window.addEventListener("beforeunload", () => window.clearTimeout(statusTimeout), { once: true });
    }

    function showModal(fort) {
        const animate = !reducedMotion.matches;
        const fortInfo = window.fortDetails[fort.name];
        const photoCredit = fort.imageCredit
            ? `<a class="photo-credit" href="${fort.imageCreditUrl}" target="_blank" rel="noopener noreferrer">${fort.imageCredit}</a>`
            : "";
        modal.innerHTML = `
            <button class="modal-close-btn" type="button" aria-label="Close details">×</button>
            <div class="modal-heading">
                <div class="modal-header">
                    <p class="photo-eyebrow">FORT PHOTO STORY</p>
                    <h1 id="modal-title">${fort.name}</h1>
                    <p class="location">${fort.location}</p>
                </div>
            </div>
            <div class="fort-detail-layout">
                <section class="photo-story" aria-label="Photograph of ${fort.name}">
                    <div class="photo-frame${animate ? " photo-motion" : ""}">
                        <img class="fort-photo" src="${fort.image}" alt="${fort.name} fort" fetchpriority="high">
                        <div class="photo-shade"></div>
                        <div class="photo-caption">
                            <span class="photo-tag">${fort.type === "sea" ? "Sea fort" : "Hill fort"}</span>
                            <p>${fort.name} <span>·</span> ${fort.location}</p>
                            ${photoCredit}
                        </div>
                    </div>
                    <div class="photo-controls">
                        <span><i aria-hidden="true"></i> A view of the real fort</span>
                        <button class="motion-toggle" type="button" aria-pressed="${animate}">${animate ? "Pause motion" : "Play motion"}</button>
                    </div>
                </section>
                <section class="modal-body">
                    <p class="modal-label">${fort.type === "sea" ? "Coastal sentinel" : "Hill stronghold"}</p>
                    <h2>A story in stone</h2>
                    <p>${fort.summary}</p>
                    <div class="fort-fact">
                        <span class="fact-icon">${fort.type === "sea" ? "≈" : "⌂"}</span>
                        <div><strong>${fort.type === "sea" ? "Sea fort" : "Hill fort"}</strong><span>${fort.type === "sea" ? "Guarding the Konkan coast" : "Watching over the Sahyadri hills"}</span></div>
                    </div>
                </section>
            </div>
            <section class="fort-expanded-info" aria-label="More about ${fort.name}">
                <details>
                    <summary>Read more about ${fort.name}</summary>
                    <p class="fort-info-paragraph">${fortInfo.join(" ")}</p>
                    <p class="fort-info-note">A concise visitor guide; some historic interpretations may vary between sources.</p>
                </details>
            </section>`;
        overlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";

        const closeButton = modal.querySelector(".modal-close-btn");
        const photoFrame = modal.querySelector(".photo-frame");
        const motionButton = modal.querySelector(".motion-toggle");
        closeButton.addEventListener("click", hideModal);
        motionButton.addEventListener("click", () => {
            const isPlaying = motionButton.getAttribute("aria-pressed") === "true";
            photoFrame.classList.toggle("photo-motion", !isPlaying);
            motionButton.setAttribute("aria-pressed", String(!isPlaying));
            motionButton.textContent = isPlaying ? "Play motion" : "Pause motion";
        });
        closeButton.focus();
    }

    function hideModal() {
        overlay.classList.add("hidden");
        document.body.style.overflow = "";
    }

    grid.addEventListener("click", (event) => {
        const card = event.target.closest(".fort-card");
        if (card) {
            const fort = fortsData.find((item) => item.name === card.dataset.name);
            if (fort) showModal(fort);
        }
    });
    grid.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            const card = event.target.closest(".fort-card");
            if (card) {
                event.preventDefault();
                const fort = fortsData.find((item) => item.name === card.dataset.name);
                if (fort) showModal(fort);
            }
        }
    });
    function openFortByName(name) {
        const fort = fortsData.find((item) => item.name === name);
        if (fort) showModal(fort);
    }
    document.addEventListener("click", (event) => {
        const mapStoryButton = event.target.closest(".map-popup-open");
        if (mapStoryButton) openFortByName(mapStoryButton.dataset.name);
    });
    mapIndex.addEventListener("click", (event) => {
        const button = event.target.closest(".map-index-item");
        if (button) openFortByName(button.dataset.name);
    });
    overlay.addEventListener("click", (event) => { if (event.target === overlay) hideModal(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !overlay.classList.contains("hidden")) hideModal(); });
    search.addEventListener("input", render);
    chips.forEach((chip) => chip.addEventListener("click", () => {
        chips.forEach((item) => item.classList.remove("active"));
        chip.classList.add("active");
        filter = chip.dataset.filter;
        render();
    }));
    document.getElementById("logout-btn").addEventListener("click", () => { window.swarajyaNavigate("landing.html"); });
    render();
    renderMap();
    const requestedFort = new URLSearchParams(window.location.search).get("fort");
    if (requestedFort) openFortByName(requestedFort);
}
