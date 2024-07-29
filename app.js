document.addEventListener('DOMContentLoaded', () => {
  loadView('login');
});

function loadView(view) {
  console.log(`Loading view: ${view}`);
  fetch(`html/${view}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('app').innerHTML = html;
      console.log(`Loaded view: ${view}`);
      if (view === 'login') initLogin();
      if (view === 'home') initHome();
      if (view === 'exercise') initExercise();
      if (view === 'diet') initDiet();
      if (view === 'goals') initGoals();
      if (view === 'report') initReport();
    })
    .catch(error => console.error('Error loading view:', error));
}

function initLogin() {
  console.log('Initializing login view');
  document.getElementById('loginButton').addEventListener('click', () => {
    loadView('home');
  });
}

function initHome() {
  console.log('Initializing home view');
  document.getElementById('recordExerciseButton').addEventListener('click', () => loadView('exercise'));
  document.getElementById('recordDietButton').addEventListener('click', () => loadView('diet'));
  document.getElementById('setGoalsButton').addEventListener('click', () => loadView('goals'));
  document.getElementById('generateReportButton').addEventListener('click', () => loadView('report'));
}

function initExercise() {
  console.log('Initializing exercise view');
  document.getElementById('saveExerciseButton').addEventListener('click', saveExercise);
}

function initDiet() {
  console.log('Initializing diet view');
  document.getElementById('saveDietButton').addEventListener('click', saveDiet);
}

function initGoals() {
  console.log('Initializing goals view');
  const saveGoalButton = document.getElementById('saveGoalButton');
  if (saveGoalButton) {
    saveGoalButton.addEventListener('click', saveGoal);
  } else {
    console.error('Save Goal Button not found');
  }
}

function initReport() {
  console.log('Initializing report view');
  generateExerciseReport();
  generateDietReport();
  generateGoalReport();
}

function saveExercise() {
  console.log('Saving exercise record');
  const type = document.getElementById('exerciseType').value;
  const duration = document.getElementById('duration').value;
  const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
  exercises.push({ type, duration, date: new Date().toLocaleDateString() });
  localStorage.setItem('exercises', JSON.stringify(exercises));
  alert('Exercise record saved');
  loadView('home');
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

function saveGoal() {
  console.log('Saving goal');
  const goalType = document.getElementById('goalType').value;
  const goalValue = document.getElementById('goalValue').value;
  localStorage.setItem('goal', JSON.stringify({ goalType, goalValue, date: new Date().toLocaleDateString() }));
  alert('Goal saved');
  loadView('home');
}

function generateExerciseReport() {
  console.log('Generating exercise report');
  const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
  let report = '<h3>Exercise Records</h3><ul>';
  exercises.forEach(exercise => {
    report += `<li>${exercise.date} - ${exercise.type}: ${exercise.duration} minutes</li>`;
  });
  report += '</ul>';
  document.getElementById('exerciseReport').innerHTML = report;
}

function generateDietReport() {
  console.log('Generating diet report');
  const diets = JSON.parse(localStorage.getItem('diets')) || [];
  let report = '<h3>Diet Records</h3><ul>';
  diets.forEach(diet => {
    report += `<li>${diet.date} - ${diet.foodName}: ${diet.calories} calories</li>`;
  });
  report += '</ul>';
  document.getElementById('dietReport').innerHTML = report;
}

function generateGoalReport() {
  console.log('Generating goal report');
  const goal = JSON.parse(localStorage.getItem('goal'));
  if (goal) {
    const report = `
      <h3>Health Goals</h3>
      <p>Type: ${goal.goalType}</p>
      <p>Value: ${goal.goalValue}</p>
      <p>Set Date: ${goal.date}</p>
    `;
    document.getElementById('goalReport').innerHTML = report;
  }
}




  