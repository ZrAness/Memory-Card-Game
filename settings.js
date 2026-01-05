   // Handle visual selection for radio buttons
        document.addEventListener('DOMContentLoaded', function() {
            const radioButtons = document.querySelectorAll('input[type="radio"]');
            
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    // Remove selected class from all options in the same group
                    const group = this.name;
                    document.querySelectorAll(`input[name="${group}"]`).forEach(r => {
                        r.closest('.option-btn').classList.remove('selected');
                    });
                    
                    // Add selected class to the clicked option
                    this.closest('.option-btn').classList.add('selected');
                });
            });
        });

        function handleSubmit(event) {
            event.preventDefault();
            
            const form = document.getElementById('gameSettingsForm');
            const formData = new FormData(form);
            
            const difficulty = formData.get('difficulty');
            const theme = formData.get('theme');
            
            console.log('Game Settings:', { difficulty, theme });
            
            // Create URL with parameters
            const url = `playpage.html?difficulty=${difficulty}&theme=${theme}`;
            
            // Redirect to the game page with parameters
            window.location.href = url;
        }

        function goBack() {
            console.log('Going back...');
            window.history.back();
        }

      function toggleTheme() {
    document.body.classList.toggle('theme-alt');
}
