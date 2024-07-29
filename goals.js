document.addEventListener('DOMContentLoaded', () => {
    initGoals();
  });
  
  function initGoals() {
    console.log('Initializing goals view');
    document.getElementById('saveGoalButton').addEventListener('click', saveGoal);
  }
  
  function saveGoal() {
    console.log('Saving goal');
    const goalType = document.getElementById('goalType').value;
    const goalValue = document.getElementById('goalValue').value;
    localStorage.setItem('goal', JSON.stringify({ goalType, goalValue, date: new Date().toLocaleDateString() }));
    alert('Goal saved');
    loadView('home');
  }
  