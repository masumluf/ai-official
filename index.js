// Initialize Lucide icons
lucide.createIcons();

// Quiz functionality (keeping your existing quiz code)
const quizQuestions = [
    {
        question: "What is the maximum proportion of property that can be allocated in a will according to Islamic law?",
        options: ["1/4", "1/3", "1/2", "2/3"],
        correct: 1,
        explanation: "Under Islamic law, a person can only bequeath up to 1/3 of their estate through a will, with the remaining 2/3 distributed according to fixed inheritance shares."
    },
    {
        question: "Who are considered 'Asbah' in Islamic inheritance?",
        options: ["Female heirs only", "Male relatives who inherit the residue", "Charitable organizations", "Witnesses to the will"],
        correct: 1,
        explanation: "'Asbah' refers to male relatives who inherit any remaining estate after the fixed shares (Faraid) have been distributed to other heirs."
    },
    {
        question: "What is the term 'Faraid' in Islamic inheritance law?",
        options: ["Voluntary charity", "Prescribed fixed shares for heirs", "Estate taxes", "Will writing process"],
        correct: 1,
        explanation: "Faraid refers to the prescribed fixed shares of inheritance determined by Islamic law for specific heirs like spouses, children, and parents."
    },
    {
        question: "According to Islamic law, what is the first step in wealth distribution after death?",
        options: ["Distribute to children", "Pay debts and funeral expenses", "Give to charity", "Divide equally among all relatives"],
        correct: 1,
        explanation: "The first obligation is to pay the deceased's debts and funeral expenses before any inheritance distribution can take place."
    },
    {
        question: "In Islamic inheritance, sons typically receive how much compared to daughters?",
        options: ["Equal shares", "Twice the share", "Three times the share", "Half the share"],
        correct: 1,
        explanation: "According to Islamic inheritance law, male heirs generally receive twice the share of female heirs in the same category, as stated in the Quran."
    },
    {
        question: "What happens to property of a Muslim who dies without any legal heirs?",
        options: ["Goes to the state", "Given to charity", "Returned to community", "Held in trust"],
        correct: 0,
        explanation: "When a Muslim dies without legal heirs (a rare situation), the property typically goes to the Islamic state or Muslim community treasury (Bayt al-Mal)."
    },
    {
        question: "A bequest to an unborn child is valid in Islamic law if born alive within:",
        options: ["3 months", "6 months (Sunni) or 10 months (Shia)", "1 year", "2 years"],
        correct: 1,
        explanation: "Under Sunni law, the child must be born within 6 lunar months, while Shia law allows up to 10 lunar months from the testator's death."
    },
    {
        question: "Which relatives are never excluded from inheritance under Islamic law?",
        options: ["Cousins", "Spouses, children, parents", "Siblings", "Grandparents"],
        correct: 1,
        explanation: "The five primary heirs (spouse, children, parents, and in some interpretations siblings and grandparents) have fundamental rights that cannot be completely excluded."
    },
    {
        question: "What is required for a valid Islamic gift (Hiba)?",
        options: ["Only written documentation", "Declaration, acceptance, and delivery of possession", "Government registration", "Witness signatures only"],
        correct: 1,
        explanation: "A valid Islamic gift requires three elements: declaration by the donor, acceptance by the recipient, and actual transfer of possession."
    },
    {
        question: "In Islamic law, what is 'Wasiyah'?",
        options: ["Inheritance tax", "A will or bequest", "Funeral prayer", "Estate division"],
        correct: 1,
        explanation: "Wasiyah refers to a will or bequest in Islamic law, allowing a person to allocate up to 1/3 of their estate as they wish."
    },
    {
        question: "What does the Quranic principle 'for the male, what is equal to the share of two females' refer to?",
        options: ["Property ownership", "Inheritance distribution", "Business partnerships", "Marriage rights"],
        correct: 1,
        explanation: "This Quranic verse (4:11) establishes the principle that in inheritance, males typically receive twice the share of females in the same category."
    },
    {
        question: "When can an Islamic will be revoked?",
        options: ["Never", "Only after death", "At any time during the testator's life", "Only with court approval"],
        correct: 2,
        explanation: "In Islamic law, a person can revoke or modify their will at any time during their lifetime while they are of sound mind."
    },
    {
        question: "What is the Islamic term for the total estate left by a deceased person?",
        options: ["Mirath", "Zakat", "Sadaqah", "Wakf"],
        correct: 0,
        explanation: "Mirath is the Arabic term used for inheritance or the total estate left behind by a deceased person in Islamic law."
    },
    {
        question: "Who cannot inherit under Islamic law due to disqualification?",
        options: ["Non-Muslims", "Those who caused the death of the deceased", "Divorced spouses", "All of the above"],
        correct: 3,
        explanation: "Islamic law disqualifies several categories from inheritance including non-Muslims, those who murdered the deceased, and in most cases, divorced spouses."
    },
    {
        question: "What is the minimum mental capacity required for making a valid Islamic will?",
        options: ["Any age", "Must be an adult of sound mind", "Only elderly people", "Requires family approval"],
        correct: 1,
        explanation: "Islamic law requires that the person making a will (testator) must be an adult (reached maturity) and be of sound mind at the time of making the will."
    }
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function startNewGame() {
    currentQuestions = shuffleArray(quizQuestions).slice(0, 5);
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('final-score').style.display = 'none';
    document.getElementById('quiz-explanation').style.display = 'none';
    
    showQuestion();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('quiz-score').textContent = `Question ${currentQuestionIndex + 1} of 5`;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index, optionDiv);
        optionsContainer.appendChild(optionDiv);
    });
    
    document.getElementById('next-btn').style.display = 'none';
}

function selectOption(selectedIndex, selectedElement) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.onclick = null);

    const question = currentQuestions[currentQuestionIndex];
    userAnswers.push(selectedIndex);

    // Show correct/incorrect
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== question.correct) {
            option.classList.add('incorrect');
        }
    });

    if (selectedIndex === question.correct) {
        score++;
    }

    document.getElementById('explanation-text').textContent = question.explanation;
    document.getElementById('quiz-explanation').style.display = 'block';

    if (currentQuestionIndex < 4) {
        document.getElementById('next-btn').style.display = 'inline-block';
    } else {
        setTimeout(showFinalScore, 2000);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('quiz-explanation').style.display = 'none';
    showQuestion();
}

function showFinalScore() {
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-explanation').style.display = 'none';
    document.getElementById('final-score').style.display = 'block';
    document.getElementById('final-score-text').textContent = `${score} out of 5`;
    document.getElementById('restart-btn').style.display = 'inline-block';
    
    if (score >= 3) {
        document.getElementById('share-challenge').style.display = 'block';
    }
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-up');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize animations on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Enhanced Carousel with Touch/Swipe Support
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('#value-prop-carousel .services-track');
    const cards = Array.from(document.querySelectorAll('#value-prop-carousel .service-card'));
    const prevBtn = document.querySelector('#value-prop-carousel .arrow-left');
    const nextBtn = document.querySelector('#value-prop-carousel .arrow-right');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    
    let currentIndex = 0;
    let cardsToShow = 3;
    let autoScroll;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationId;

    // Touch/Swipe variables
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let threshold = 100;
    let restraint = 100;
    let allowedTime = 300;
    let elapsedTime = 0;
    let startTime = 0;

    function getCardsToShow() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1200) return 2;
        return 3;
    }

    function updateCarousel(smooth = true) {
        if (!cards.length) return;
        
        cardsToShow = getCardsToShow();
        const cardWidth = cards[0].offsetWidth + 24;
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        
        const translateX = -currentIndex * cardWidth;
        
        if (smooth) {
            track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        // Update indicators
        updateIndicators();
        
        // Reset transition after animation
        if (smooth) {
            setTimeout(() => {
                track.style.transition = '';
            }, 600);
        }
    }

    function updateIndicators() {
        const totalSlides = Math.ceil(cards.length / cardsToShow);
        const activeSlide = Math.floor(currentIndex / cardsToShow);
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeSlide);
            indicator.style.display = index < totalSlides ? 'block' : 'none';
        });
    }

    function nextSlide() {
        cardsToShow = getCardsToShow();
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        cardsToShow = getCardsToShow();
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }

    // Touch Event Handlers
    function handleTouchStart(e) {
        startTime = new Date().getTime();
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        
        // Clear auto-scroll
        if (autoScroll) clearInterval(autoScroll);
    }

    function handleTouchMove(e) {
        e.preventDefault(); // Prevent scrolling
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        distX = currentX - startX;
        distY = currentY - startY;
        
        // Apply resistance effect
        const resistance = 0.5;
        const translateX = -currentIndex * (cards[0].offsetWidth + 24) + (distX * resistance);
        
        track.style.transition = 'none';
        track.style.transform = `translateX(${translateX}px)`;
    }

    function handleTouchEnd(e) {
        elapsedTime = new Date().getTime() - startTime;
        
        // Determine if swipe was valid
        const isSwipeValid = elapsedTime <= allowedTime && 
                           Math.abs(distX) >= threshold && 
                           Math.abs(distY) <= restraint;
        
        if (isSwipeValid) {
            if (distX > 0) {
                // Swipe right (previous)
                prevSlide();
            } else {
                // Swipe left (next)
                nextSlide();
            }
        } else {
            // Snap back to current position
            updateCarousel();
        }
        
        // Restart auto-scroll
        startAuto();
        
        // Reset values
        distX = 0;
        distY = 0;
    }

    // Mouse Event Handlers (for desktop drag)
    function handleMouseDown(e) {
        e.preventDefault();
        isDragging = true;
        startPos = e.clientX;
        
        track.style.cursor = 'grabbing';
        
        if (autoScroll) clearInterval(autoScroll);
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const currentPosition = e.clientX;
        const diff = currentPosition - startPos;
        
        const resistance = 0.5;
        const translateX = -currentIndex * (cards[0].offsetWidth + 24) + (diff * resistance);
        
        track.style.transition = 'none';
        track.style.transform = `translateX(${translateX}px)`;
    }

    function handleMouseUp(e) {
        if (!isDragging) return;
        
        isDragging = false;
        track.style.cursor = 'grab';
        
        const endPos = e.clientX;
        const diff = endPos - startPos;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            updateCarousel();
        }
        
        startAuto();
    }

    // Event Listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch events
    track.addEventListener('touchstart', handleTouchStart, { passive: false });
    track.addEventListener('touchmove', handleTouchMove, { passive: false });
    track.addEventListener('touchend', handleTouchEnd);

    // Mouse events for desktop
    track.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index * cardsToShow;
            updateCarousel();
            if (autoScroll) clearInterval(autoScroll);
            startAuto();
        });
    });

    // Window resize handler
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel(false);
    });

    // Auto-scroll functionality
    function startAuto() {
        if (autoScroll) clearInterval(autoScroll);
        autoScroll = setInterval(nextSlide, 7000); // 7 seconds
    }

    // Pause auto-scroll on hover/focus
    track.addEventListener('mouseenter', () => {
        if (autoScroll) clearInterval(autoScroll);
    });

    track.addEventListener('mouseleave', startAuto);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            if (autoScroll) clearInterval(autoScroll);
            startAuto();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            if (autoScroll) clearInterval(autoScroll);
            startAuto();
        }
    });

    // Initialize carousel
    updateCarousel(false);
    startAuto();

    // Initialize scroll animations
    animateOnScroll();
});
