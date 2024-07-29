function initLogin() {
    console.log('Initializing login view');
    document.getElementById('loginButton').addEventListener('click', () => {
      loadView('home');
    });
  }
  