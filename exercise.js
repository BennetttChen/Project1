document.addEventListener('DOMContentLoaded', () => {
  initExercise();
});

function initExercise() {
  console.log('Initializing exercise view');
  document.getElementById('saveExerciseButton').addEventListener('click', saveExercise);
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

  