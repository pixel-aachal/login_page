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



body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Segoe UI', Arial, sans-serif;
    color: #fff;
    margin: 0;
    background: url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80') no-repeat center center fixed;
    background-size: cover;
    position: relative;
}

:root {
    --card-bg: rgba(0,0,0,0.55);
    --accent: #fff;
    --border: rgba(255,255,255,0.12);
    --input-bg: rgba(255,255,255,0.10);
    --input-border: rgba(255,255,255,0.18);
    --text: #fff;
    --muted: #cccccc;
}

body::before {
    content: "";
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 0;
    background: inherit;
    filter: blur(8px) brightness(0.7);
}
.login-container {
    background: var(--card-bg);
    border-radius: 16px;
    box-shadow: 0 4px 32px 0 rgba(0,0,0,0.45);
    padding: 2.5rem 2rem 2rem 2rem;
    width: 100%;
    max-width: 350px;
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    backdrop-filter: blur(8px) saturate(1.2);
    transition: box-shadow 0.25s, background 0.25s;
    position: relative;
    z-index: 1;
}
.login-container:hover {
    box-shadow: 0 8px 48px 0 rgba(0,0,0,0.60);
    background: rgba(0,0,0,0.70);
}
.login-title {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0.5rem;
    color: #fff;
    letter-spacing: 1px;
}
.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
label {
    font-size: 0.97rem;
    color: var(--muted);
    letter-spacing: 0.5px;
}
input[type="text"],
input[type="password"] {
    padding: 0.7rem 0.9rem;
    border-radius: 6px;
    border: 1px solid var(--input-border);
    background: var(--input-bg);
    color: #fff;
    font-size: 1rem;
    transition: border 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
    box-shadow: 0 0 0 0 rgba(255,255,255,0);
}
input[type="text"]:focus,
input[type="password"]:focus {
    border-color: #fff;
    outline: none;
    background: rgba(255,255,255,0.18);
    color: #fff;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.18);
}
input[type="text"]:hover,
input[type="password"]:hover {
    background: rgba(255,255,255,0.22);
    border-color: #fff;
    color: #fff;
}
input[type="text"]::placeholder,
input[type="password"]::placeholder {
    color: #cccccc;
    opacity: 1;
}
.login-btn {
    background: rgba(255,255,255,0.12);
    color: #fff;
    border: 1px solid #fff;
    border-radius: 6px;
    padding: 0.8rem 0;
    font-size: 1.08rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s, color 0.2s;
    box-shadow: 0 2px 8px 0 rgba(255,255,255,0.08);
    letter-spacing: 0.5px;
}
.login-btn:hover, .login-btn:focus {
    background: #fff;
    color: #111;
    box-shadow: 0 4px 16px 0 rgba(255,255,255,0.16);
    transform: translateY(-2px) scale(1.03);
    border-color: #fff;
}
.login-footer {
    text-align: center;
    font-size: 0.95rem;
    color: var(--muted);
    letter-spacing: 0.5px;
}
@media (max-width: 480px) {
    .login-container {
        padding: 1.5rem 0.7rem 1.2rem 0.7rem;
        max-width: 98vw;
    }
}

