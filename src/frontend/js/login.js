document.addEventListener('DOMContentLoaded', () => {
  initLogin();
});

function initLogin() {
  console.log('Initializing login view');
  document.getElementById('loginButton').addEventListener('click', handleLogin);
}

async function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginButton = document.getElementById('loginButton');

  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }

  // Disable button and show loading state
  loginButton.disabled = true;
  loginButton.innerText = 'Logging in...';

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        alert('Login successful');
        loadView('home');
        // Optionally reset the form or perform other actions
      } else {
        alert('Invalid username or password');
      }
    } else {
      console.error('Login request failed:', response.statusText);
      alert('Login failed. Please try again.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred. Please try again later.');
  } finally {
    // Re-enable button and reset text
    loginButton.disabled = false;
    loginButton.innerText = 'Login';
  }
}

