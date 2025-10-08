document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const message = document.getElementById('loginMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const role = document.getElementById('role').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!role) {
            message.textContent = 'Please select a role.';
            message.style.color = 'red';
            return;
        }
        if (!username || !password) {
            message.textContent = 'Please enter username and password.';
            message.style.color = 'red';
            return;
        }

        // Simulate login success

        // Save username and role in localStorage for frontend simulation
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('loggedInRole', role);

        message.textContent = 'Logging in...';

        setTimeout(() => {
            if (role === 'admin') {
                window.location.href = 'admin.html';
            } else if (role === 'teacher') {
                window.location.href = 'teacher.html';
            }
        }, 800);
    });
});
