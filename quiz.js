(() => {
    const questions = [
        {
            question: "Which fort is known as the birthplace of Shivaji Maharaj?",
            options: ["Shivneri", "Raigad", "Panhala", "Vijaydurg"],
            answer: 0,
            explanation: "Shivaji Maharaj was born at Shivneri Fort in 1630."
        },
        {
            question: "At which fort was Shivaji Maharaj crowned in 1674?",
            options: ["Torna", "Raigad", "Purandar", "Sinhagad"],
            answer: 1,
            explanation: "Raigad became the capital, and the coronation took place there in 1674."
        },
        {
            question: "Which fort did Shivaji Maharaj capture in 1646?",
            options: ["Torna", "Janjira", "Salher", "Lohagad"],
            answer: 0,
            explanation: "Torna is remembered as an early milestone in the campaign for Swarajya."
        },
        {
            question: "Which sea fort stands off the coast of Malvan?",
            options: ["Purandar", "Sindhudurg", "Rajgad", "Vasota"],
            answer: 1,
            explanation: "Sindhudurg is an island fort off Malvan on the Konkan coast."
        },
        {
            question: "What is the historic name of Daulatabad Fort?",
            options: ["Kondhana", "Rairi", "Devagiri", "Khelna"],
            answer: 2,
            explanation: "Daulatabad was historically known as Devagiri or Deogiri."
        },
        {
            question: "Which fort is famous for its scorpion-tail-shaped Vinchu Kata ridge?",
            options: ["Lohagad", "Pratapgad", "Ajinkyatara", "Harishchandragad"],
            answer: 0,
            explanation: "Lohagad's Vinchu Kata is a long, fortified ridge shaped like a scorpion's tail."
        },
        {
            question: "Which fort is associated with Tanaji Malusare's 1670 victory?",
            options: ["Sinhagad", "Vishalgad", "Ratangad", "Salher"],
            answer: 0,
            explanation: "The 1670 retaking of Sinhagad is associated with Tanaji Malusare."
        },
        {
            question: "Which fort overlooks Satara city?",
            options: ["Ajinkyatara", "Khanderi", "Torna", "Padmadurg"],
            answer: 0,
            explanation: "Ajinkyatara rises above Satara and offers views over the city."
        },
        {
            question: "Which fort is also known as Vyaghragad?",
            options: ["Vasota", "Janjira", "Purandar", "Mulher"],
            answer: 0,
            explanation: "Vasota is also known by the name Vyaghragad."
        },
        {
            question: "Which sea fort resisted repeated attempts to capture it and was held by the Siddis?",
            options: ["Janjira", "Suvarnadurg", "Khanderi", "Sindhudurg"],
            answer: 0,
            explanation: "Janjira was held by the Siddis and became known for its resilient island defences."
        },
        {
            question: "Which fort is known for the dramatic cliff called Konkan Kada?",
            options: ["Harishchandragad", "Raigad", "Panhala", "Vijaydurg"],
            answer: 0,
            explanation: "Konkan Kada is the dramatic curved cliff on Harishchandragad."
        },
        {
            question: "Which fort was part of Shivaji Maharaj's escape route from the siege of Panhala?",
            options: ["Vishalgad", "Daulatabad", "Salher", "Khanderi"],
            answer: 0,
            explanation: "Shivaji Maharaj escaped from Panhala toward Vishalgad; the stand at Pavan Khind helped secure the route."
        },
        {
            question: "Which sea fort is also called Kasa Fort?",
            options: ["Padmadurg", "Janjira", "Vijaydurg", "Suvarnadurg"],
            answer: 0,
            explanation: "Padmadurg, near Murud, is also known as Kasa Fort."
        },
        {
            question: "Which fort served as an early capital before Raigad?",
            options: ["Rajgad", "Ajinkyatara", "Purandar", "Daulatabad"],
            answer: 0,
            explanation: "Rajgad served as a major centre and early capital of Shivaji Maharaj's kingdom."
        },
        {
            question: "The Treaty of Purandar was concluded in which year?",
            options: ["1646", "1659", "1665", "1674"],
            answer: 2,
            explanation: "The Treaty of Purandar was concluded in 1665."
        },
        {
            question: "Which fort is a remote stronghold in the forested Koyna region?",
            options: ["Vasota", "Shivneri", "Purandar", "Ajinkyatara"],
            answer: 0,
            explanation: "Vasota lies in the forested Koyna region of Satara district."
        }
    ];

    const questionCount = 10;
    const card = document.getElementById("quiz-card");
    let round = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;

    function shuffle(items) {
        const result = items.slice();
        for (let index = result.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
        }
        return result;
    }

    function renderShell() {
        card.innerHTML = `
            <div class="quiz-topline"><span id="quiz-counter"></span><span id="quiz-score"></span></div>
            <div class="quiz-progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${questionCount}" aria-valuenow="0"><div class="quiz-progress-fill"></div></div>
            <h2 class="quiz-question" id="quiz-question"></h2>
            <div class="quiz-options" id="quiz-options"></div>
            <p class="quiz-feedback" id="quiz-feedback" role="status"></p>
            <button class="quiz-next" id="quiz-next" type="button" disabled>Choose an answer</button>`;
    }

    function updateProgress() {
        const completed = answered ? currentIndex + 1 : currentIndex;
        card.querySelector(".quiz-progress").setAttribute("aria-valuenow", String(completed));
        card.querySelector(".quiz-progress-fill").style.width = `${(completed / questionCount) * 100}%`;
    }

    function renderQuestion() {
        answered = false;
        const item = round[currentIndex];
        card.querySelector("#quiz-counter").textContent = `Question ${currentIndex + 1} of ${questionCount}`;
        card.querySelector("#quiz-score").textContent = `Score: ${score}`;
        card.querySelector("#quiz-question").textContent = item.question;
        const feedback = card.querySelector("#quiz-feedback");
        feedback.textContent = "";
        feedback.className = "quiz-feedback";
        const nextButton = card.querySelector("#quiz-next");
        nextButton.disabled = true;
        nextButton.textContent = "Choose an answer";
        const optionsRoot = card.querySelector("#quiz-options");
        optionsRoot.replaceChildren();

        item.options.forEach((option, optionIndex) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "quiz-option";
            button.dataset.optionIndex = String(optionIndex);
            button.textContent = option;
            optionsRoot.appendChild(button);
        });
        updateProgress();
    }

    function selectAnswer(optionIndex) {
        if (answered) return;
        answered = true;
        const item = round[currentIndex];
        card.querySelectorAll(".quiz-option").forEach((button, index) => {
            button.disabled = true;
            if (index === item.answer) button.classList.add("is-correct");
            else if (index === optionIndex) button.classList.add("is-wrong");
        });

        const correct = optionIndex === item.answer;
        if (correct) score += 1;
        const feedback = card.querySelector("#quiz-feedback");
        feedback.textContent = `${correct ? "That’s right! " : "Not quite. "} ${item.explanation}`;
        feedback.classList.add(correct ? "is-correct" : "is-wrong");
        card.querySelector("#quiz-score").textContent = `Score: ${score}`;
        const nextButton = card.querySelector("#quiz-next");
        nextButton.disabled = false;
        nextButton.textContent = currentIndex === questionCount - 1 ? "See my score" : "Next question";
        updateProgress();
    }

    function showResults() {
        const message = score === questionCount
            ? "A perfect run! You know your forts brilliantly."
            : score >= 7
                ? "Wonderful work—you know these forts well."
                : score >= 4
                    ? "Good effort! Explore the fort stories and try another round."
                    : "Every explorer starts somewhere. Visit the fort archive, then try again.";
        card.innerHTML = `
            <div class="quiz-result">
                <span class="quiz-result-score">${score}<small> / ${questionCount}</small></span>
                <h2>${message}</h2>
                <p>You explored questions about forts across Maharashtra. Ready to take the challenge again?</p>
                <button class="quiz-restart" data-quiz-action="restart" type="button">Play again</button>
                <a class="landing-cta-button" href="index.html#forts">Explore the forts <span aria-hidden="true">→</span></a>
            </div>`;
    }

    function startRound() {
        round = shuffle(questions).slice(0, questionCount);
        currentIndex = 0;
        score = 0;
        renderShell();
        renderQuestion();
    }

    card.addEventListener("click", (event) => {
        const option = event.target.closest(".quiz-option");
        if (option) {
            selectAnswer(Number(option.dataset.optionIndex));
            return;
        }

        const action = event.target.closest("#quiz-next, [data-quiz-action='restart']");
        if (!action) return;
        if (action.dataset.quizAction === "restart") {
            startRound();
        } else if (answered && currentIndex === questionCount - 1) {
            showResults();
        } else if (answered) {
            currentIndex += 1;
            renderQuestion();
        }
    });

    startRound();
})();
