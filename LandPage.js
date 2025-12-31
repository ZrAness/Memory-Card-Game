 function startGame() {
            alert('Starting the memory game!');
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