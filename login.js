// login.js
// Handles login form interactivity, validation, and logic

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');

    // Show/hide password toggle
    let showPassword = false;
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.textContent = 'Show';
    toggleBtn.className = 'toggle-password';
    toggleBtn.style = 'position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:#fff; cursor:pointer; font-size:0.95rem; opacity:0.7;';
    const passwordGroup = passwordInput.parentElement;
    passwordGroup.style.position = 'relative';
    passwordGroup.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', function () {
        showPassword = !showPassword;
        passwordInput.type = showPassword ? 'text' : 'password';
        toggleBtn.textContent = showPassword ? 'Hide' : 'Show';
    });

    // Simple validation logic
    function validateInputs() {
        let valid = true;
        // Username: at least 3 chars, no spaces
        if (usernameInput.value.trim().length < 3 || /\s/.test(usernameInput.value)) {
            usernameInput.style.borderColor = '#ff4d4f';
            valid = false;
        } else {
            usernameInput.style.borderColor = '';
        }
        // Password: at least 6 chars
        if (passwordInput.value.length < 6) {
            passwordInput.style.borderColor = '#ff4d4f';
            valid = false;
        } else {
            passwordInput.style.borderColor = '';
        }
        return valid;
    }

    // Show error message
    function showError(msg) {
        let errorDiv = document.querySelector('.login-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'login-error';
            errorDiv.style = 'color:#ff4d4f; text-align:center; margin-bottom:0.5rem; font-size:0.98rem;';
            form.insertBefore(errorDiv, form.firstChild);
        }
        errorDiv.textContent = msg;
    }
    function clearError() {
        const errorDiv = document.querySelector('.login-error');
        if (errorDiv) errorDiv.textContent = '';
    }

    // Button action and logic
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearError();
        if (!validateInputs()) {
            showError('Please enter a valid username and password.');
            return;
        }
        // Simulate login logic (replace with real API call)
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';
        setTimeout(function () {
            // Example: hardcoded check
            if (
                usernameInput.value === 'admin' &&
                passwordInput.value === 'password123'
            ) {
                loginBtn.textContent = 'Success!';
                loginBtn.style.background = '#28a745';
                showError('Login successful!');
                // Redirect or further logic here
            } else {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Login';
                showError('Invalid username or password.');
            }
        }, 1200);
    });

    // Enter key triggers login
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                form.dispatchEvent(new Event('submit', { cancelable: true }));
            }
        });
    });
});
