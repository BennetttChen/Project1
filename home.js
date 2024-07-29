document.addEventListener('DOMContentLoaded', () => {
    initHome();
  });
  
  function initHome() {
    console.log('Initializing home view');
  
    // Fetch and display today's exercise
    const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
    const todayExercise = exercises.find(exercise => exercise.date === new Date().toLocaleDateString());
    if (todayExercise) {
      document.getElementById('todayExercise').innerText = `${todayExercise.type}: ${todayExercise.duration} minutes`;
    } else {
      document.getElementById('todayExercise').innerText = 'None';
    }
  
    // Fetch and display today's diet
    const diets = JSON.parse(localStorage.getItem('diets')) || [];
    const todayDiet = diets.find(diet => diet.date === new Date().toLocaleDateString());
    if (todayDiet) {
      document.getElementById('todayDiet').innerText = `${todayDiet.foodName}: ${todayDiet.calories} calories`;
    } else {
      document.getElementById('todayDiet').innerText = 'None';
    }
  
    // Fetch and display goal progress
    const goal = JSON.parse(localStorage.getItem('goal'));
    if (goal) {
      document.getElementById('goalProgress').innerText = `${goal.goalType}: ${goal.goalValue}`;
    } else {
      document.getElementById('goalProgress').innerText = 'None';
    }
  
    // Add event listeners for buttons
    document.getElementById('recordExerciseButton').addEventListener('click', () => loadView('exercise'));
    document.getElementById('recordDietButton').addEventListener('click', () => loadView('diet'));
    document.getElementById('setGoalsButton').addEventListener('click', () => loadView('goals'));
    document.getElementById('generateReportButton').addEventListener('click', () => loadView('report'));
  }
  
