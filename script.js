const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === 'admin123') {
                // Redirect to the dashboard page (replace with your dashboard file)
                window.location.href = ' m index.html';
            } else {
                alert('Invalid login');
            }
        });