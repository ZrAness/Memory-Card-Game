     // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const difficulty = urlParams.get('difficulty') || 'medium';
        const theme = urlParams.get('theme') || 'coding';

        // Theme emojis
        const themes = {
            coding: ['💻', '🚀', '⚡', '🎯', '🔥', '💡', '🎨', '🎮'],
            sports: ['⚽', '🏀', '🎾', '🏈', '⚾', '🏐', '🏓', '🏸'],
            brands: ['🍎', '🔵', '🟢', '🟡', '🔴', '🟣', '🟠', '⚫']
        };

        // Difficulty settings
        const difficulties = {
            easy: { pairs: 4, time: 45, label: 'Easy' },
            medium: { pairs: 6, time: 30, label: 'Advanced' },
            hard: { pairs: 8, time: 60, label: 'Expert' }
        };

        let cards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let timer;
        let timerInterval;
        let isPaused = false;
        let series = 4;
        let currentDifficulty = difficulties[difficulty];

        // Update UI with settings
        document.getElementById('difficultyLevel').textContent = currentDifficulty.label;
        document.getElementById('themeType').textContent = theme.charAt(0).toUpperCase() + theme.slice(1);

        function initGame() {
            const gameBoard = document.getElementById('gameBoard');
            gameBoard.innerHTML = '';
            
            // Get emojis for selected theme
            const themeEmojis = themes[theme] || themes.coding;
            const selectedEmojis = themeEmojis.slice(0, currentDifficulty.pairs);
            
            // Create card pairs
            cards = [...selectedEmojis, ...selectedEmojis]
                .sort(() => Math.random() - 0.5)
                .map((emoji, index) => ({
                    id: index,
                    emoji: emoji,
                    flipped: false,
                    matched: false
                }));

            // Adjust grid for difficulty
            if (currentDifficulty.pairs === 8) {
                gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
            } else {
                gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
            }

            cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.innerHTML = `
                    <div class="card-inner">
                        <div class="card-face card-front">
                            <span class="question-mark">?</span>
                        </div>
                        <div class="card-face card-back">
                            <span class="card-content">${card.emoji}</span>
                        </div>
                    </div>
                `;
                cardElement.onclick = () => flipCard(card.id);
                gameBoard.appendChild(cardElement);
            });

            matchedPairs = 0;
            flippedCards = [];
            timer = currentDifficulty.time;
            isPaused = false;
            updateTimer();
            startTimer();
        }

        function flipCard(cardId) {
            if (isPaused || flippedCards.length >= 2) return;
            
            const card = cards[cardId];
            if (card.flipped || card.matched) return;

            card.flipped = true;
            flippedCards.push(cardId);
            updateBoard();

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 600);
            }
        }

        function checkMatch() {
            const [id1, id2] = flippedCards;
            const card1 = cards[id1];
            const card2 = cards[id2];

            if (card1.emoji === card2.emoji) {
                card1.matched = true;
                card2.matched = true;
                matchedPairs++;

                if (matchedPairs === currentDifficulty.pairs) {
                    setTimeout(winGame, 500);
                }
            } else {
                card1.flipped = false;
                card2.flipped = false;
            }

            flippedCards = [];
            updateBoard();
        }

        function updateBoard() {
            const cardElements = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                const element = cardElements[index];
                element.className = 'card';
                if (card.flipped || card.matched) {
                    element.classList.add('flipping');
                }
                if (card.matched) {
                    element.classList.add('matched');
                }
            });
        }

        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            
            timerInterval = setInterval(() => {
                if (!isPaused && timer > 0) {
                    timer--;
                    updateTimer();
                    
                    if (timer === 0) {
                        clearInterval(timerInterval);
                        alert('Time\'s up! Try again.');
                        restartGame();
                    }
                }
            }, 1000);
        }

        function updateTimer() {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            document.getElementById('timer').textContent = 
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        function togglePause() {
            isPaused = !isPaused;
            const pauseBtn = document.getElementById('pauseBtn');
            
            if (isPaused) {
                pauseBtn.innerHTML = `
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    </svg>
                    Resume
                `;
            } else {
                pauseBtn.innerHTML = `
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6"/>
                    </svg>
                    Pause
                `;
            }
        }

        function restartGame() {
            if (timerInterval) clearInterval(timerInterval);
            document.getElementById('winModal').classList.remove('active');
            initGame();
        }

        function showMenu() {
            window.location.href = 'settings.html';
        }

        function winGame() {
            clearInterval(timerInterval);
            const timeSpent = currentDifficulty.time - timer;
            const minutes = Math.floor(timeSpent / 60);
            const seconds = timeSpent % 60;
            document.getElementById('finalTime').textContent = 
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            document.getElementById('winModal').classList.add('active');
            
            series++;
            document.getElementById('series').textContent = series;
        }

        function toggleTheme() {
            const body = document.body;
            const current = body.style.background;
            
            if (current.includes('8B5CF6')) {
                body.style.background = 'linear-gradient(180deg, #EC4899 0%, #F59E0B 100%)';
            } else {
                body.style.background = 'linear-gradient(180deg, #8B5CF6 0%, #3B82F6 100%)';
            }
        }

        function goBack() {
            window.location.href = 'settings.html';
        }

        // Initialize game on load
        initGame();