document.addEventListener('DOMContentLoaded', () => {
    initDiet();
  });
  
  function initDiet() {
    console.log('Initializing diet view');
    document.getElementById('saveDietButton').addEventListener('click', saveDiet);
  }
  
  function saveDiet() {
    console.log('Saving diet record');
    const foodName = document.getElementById('foodName').value;
    const calories = document.getElementById('calories').value;
    const diets = JSON.parse(localStorage.getItem('diets')) || [];
    diets.push({ foodName, calories, date: new Date().toLocaleDateString() });
    localStorage.setItem('diets', JSON.stringify(diets));
    alert('Diet record saved');
    loadView('home');
  }
  