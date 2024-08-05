document.addEventListener('DOMContentLoaded', () => {
  initHome();
});

async function initHome() {
  console.log('Initializing home view');

  // Set loading state while data is being fetched
  document.getElementById('todayExercise').innerText = 'Loading...';
  document.getElementById('todayDiet').innerText = 'Loading...';
  document.getElementById('goalProgress').innerText = 'Loading...';

  try {
      // Fetch all data in parallel
      const [exerciseResponse, dietResponse, goalResponse] = await Promise.all([
          fetch('http://localhost:3001/exercises/today'),
          fetch('http://localhost:3001/diets/today'),
          fetch('http://localhost:3001/goals')
      ]);

      // Handle exercise data
      if (exerciseResponse.ok) {
          const todayExercise = await exerciseResponse.json();
          document.getElementById('todayExercise').innerText = todayExercise 
              ? `${todayExercise.type}: ${todayExercise.duration} minutes` 
              : 'None';
      } else {
          document.getElementById('todayExercise').innerText = 'Error fetching data';
      }

      // Handle diet data
      if (dietResponse.ok) {
          const todayDiet = await dietResponse.json();
          document.getElementById('todayDiet').innerText = todayDiet 
              ? `${todayDiet.foodName}: ${todayDiet.calories} calories` 
              : 'None';
      } else {
          document.getElementById('todayDiet').innerText = 'Error fetching data';
      }

      // Handle goal data
      if (goalResponse.ok) {
          const goal = await goalResponse.json();
          document.getElementById('goalProgress').innerText = goal 
              ? `${goal.goalType}: ${goal.goalValue}` 
              : 'None';
      } else {
          document.getElementById('goalProgress').innerText = 'Error fetching data';
      }

  } catch (error) {
      console.error('Error initializing home view:', error);
      document.getElementById('todayExercise').innerText = 'Error fetching data';
      document.getElementById('todayDiet').innerText = 'Error fetching data';
      document.getElementById('goalProgress').innerText = 'Error fetching data';
  }

  // Add event listeners for buttons
  document.getElementById('recordExerciseButton').addEventListener('click', () => loadView('exercise'));
  document.getElementById('recordDietButton').addEventListener('click', () => loadView('diet'));
  document.getElementById('setGoalsButton').addEventListener('click', () => loadView('goals'));
  document.getElementById('generateReportButton').addEventListener('click', () => loadView('report'));
}


