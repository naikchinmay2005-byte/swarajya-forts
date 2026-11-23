(() => {
    const playButton = document.getElementById("story-play");
    const pauseButton = document.getElementById("story-pause");
    const stopButton = document.getElementById("story-stop");
    const audio = document.getElementById("story-audio");
    const languageButtons = document.querySelectorAll(".audio-language-button");
    const caption = document.getElementById("audio-caption");
    const status = document.getElementById("audio-status");
    const chapterSelect = document.getElementById("story-chapter");
    const transcriptPanels = document.querySelectorAll(".transcript-language");

    if (!playButton || !pauseButton || !stopButton || !audio || !caption || !status || !chapterSelect) return;

    const narrations = {
        en: {
            label: "English",
            chapters: [
                { title: "A beginning at Shivneri", sentence: "Chhatrapati Shivaji Maharaj was born at Shivneri Fort in 1630." },
                { title: "A vision of Swarajya", sentence: "From the Sahyadri hills, he began building a vision of Swarajya: self-rule shaped by courage, careful planning, and strong forts." },
                { title: "Torna and Rajgad", sentence: "In 1646, the capture of Torna became an early milestone in that journey." },
                { title: "Courage, strategy, and resilience", sentence: "Forts were more than stone walls: they helped protect people, connect regions, and support the growing kingdom." },
                { title: "Raigad and the coronation", sentence: "At Raigad in 1674, Shivaji Maharaj was crowned Chhatrapati. Raigad became the capital of his kingdom." },
                { title: "The final years and death", sentence: "His leadership, maritime vision, and ideals of self-rule continue to inspire generations." }
            ]
        },
        mr: {
            label: "Marathi",
            chapters: [
                { title: "शिवनेरीवरील सुरुवात", sentence: "छत्रपती शिवाजी महाराजांचा जन्म १६३० मध्ये शिवनेरी किल्ल्यावर झाला." },
                { title: "स्वराज्याची संकल्पना", sentence: "सह्याद्रीच्या कुशीतून त्यांनी स्वराज्याची संकल्पना साकार करण्यास सुरुवात केली. धैर्य, दूरदृष्टी आणि भक्कम किल्ले हे त्यांच्या कार्याचे आधार होते." },
                { title: "तोरणा आणि राजगड", sentence: "१६४६ मध्ये तोरणा किल्ल्याचा ताबा मिळवणे हा स्वराज्याच्या प्रवासातील एक महत्त्वाचा प्रारंभिक टप्पा ठरला." },
                { title: "धैर्य, रणनीती आणि जिद्द", sentence: "किल्ले केवळ दगडी भिंती नव्हते; ते लोकांचे संरक्षण, प्रदेशांमधील संपर्क आणि नव्या राज्याच्या उभारणीसाठी महत्त्वाचे होते." },
                { title: "रायगड आणि राज्याभिषेक", sentence: "१६७४ मध्ये रायगडावर शिवाजी महाराजांचा राज्याभिषेक झाला आणि रायगड स्वराज्याची राजधानी बनला." },
                { title: "अखेरची वर्षे आणि निधन", sentence: "त्यांचे नेतृत्व, सागरी दूरदृष्टी आणि स्वराज्याचे विचार आजही अनेक पिढ्यांना प्रेरणा देतात." }
            ]
        }
    };

    let language = "en";
    let chapterIndex = 0;
    let playbackId = 0;
    let paused = false;

    function updateChapterOptions() {
        chapterSelect.replaceChildren();
        narrations[language].chapters.forEach((chapter, index) => {
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = `Chapter ${index + 1}: ${chapter.title}`;
            chapterSelect.appendChild(option);
        });
        chapterSelect.value = String(chapterIndex);
    }

    function setStatus(message) {
        status.textContent = message;
    }

    function updateControls(isPlaying) {
        playButton.disabled = isPlaying;
        pauseButton.disabled = !isPlaying;
        stopButton.disabled = !isPlaying && !paused;
        const playLabel = playButton.querySelector("span:last-child");
        playLabel.textContent = paused ? "Resume" : "Listen";
        playButton.setAttribute("aria-label", paused ? "Resume narration" : "Listen to narration");
        pauseButton.textContent = "Pause";
    }

    function finish(id) {
        if (id !== playbackId) return;
        paused = false;
        updateControls(false);
        setStatus(`Chapter ${chapterIndex + 1} finished. Choose another chapter or listen again.`);
    }

    function playSentence(id) {
        if (id !== playbackId) return;
        const narration = narrations[language];
        if (chapterIndex >= narration.chapters.length) {
            finish(id);
            return;
        }

        const chapter = narration.chapters[chapterIndex];
        caption.textContent = chapter.sentence;
        setStatus(`Playing ${narration.label} narration · Chapter ${chapterIndex + 1} of ${narration.chapters.length}: ${chapter.title}`);
        audio.src = `audio/${language}/${chapterIndex + 1}.mp3`;
        audio.load();
        audio.play().catch(() => {
            if (id !== playbackId) return;
            paused = false;
            updateControls(false);
            setStatus("The audio could not be played. Check your device volume and connection, then press Listen to try again. You can also read the transcript below.");
        });
    }

    audio.addEventListener("ended", () => {
        const id = playbackId;
        finish(id);
    });

    audio.addEventListener("error", () => {
        if (!audio.currentSrc) return;
        paused = false;
        updateControls(false);
        setStatus("The narration audio failed to load. Check your connection, then press Listen to try again. You can also read the transcript below.");
    });

    playButton.addEventListener("click", () => {
        if (paused) {
            audio.play().then(() => {
                paused = false;
                updateControls(true);
                setStatus(`Resuming ${narrations[language].label} narration.`);
            }).catch(() => setStatus("Audio could not resume. Press Listen to try again."));
            return;
        }

        playbackId += 1;
        paused = false;
        updateControls(true);
        playSentence(playbackId);
    });

    pauseButton.addEventListener("click", () => {
        audio.pause();
        paused = true;
        updateControls(false);
        setStatus("Narration paused. Press Resume to continue.");
    });

    stopButton.addEventListener("click", () => {
        playbackId += 1;
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
        chapterIndex = Number(chapterSelect.value);
        paused = false;
        updateControls(false);
        chapterSelect.value = String(chapterIndex);
        caption.textContent = "Your story will appear here as it is read aloud.";
        setStatus(`Chapter ${chapterIndex + 1} selected. Press Listen to start.`);
    });

    chapterSelect.addEventListener("change", () => {
        chapterIndex = Number(chapterSelect.value);
        playbackId += 1;
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
        paused = false;
        updateControls(false);
        caption.textContent = "Your story will appear here as it is read aloud.";
        setStatus(`Chapter ${chapterIndex + 1} selected. Press Listen to start.`);
    });

    languageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            language = button.dataset.language;
            languageButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            transcriptPanels.forEach((panel) => { panel.hidden = panel.dataset.transcript !== language; });
            playbackId += 1;
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
            chapterIndex = Number(chapterSelect.value);
            paused = false;
            updateControls(false);
            updateChapterOptions();
            caption.textContent = "Your story will appear here as it is read aloud.";
            setStatus(`${narrations[language].label} selected. Chapter ${chapterIndex + 1} is ready to play.`);
        });
    });

    updateChapterOptions();
})();
