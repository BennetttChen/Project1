document.addEventListener('DOMContentLoaded', () => {
  initGoals();
});

function initGoals() {
  console.log('Initializing goals view');
  document.getElementById('saveGoalButton').addEventListener('click', saveGoal);
}

async function saveGoal() {
  console.log('Saving goal');
  const goalType = document.getElementById('goalType').value;
  const goalValue = document.getElementById('goalValue').value;
  const goalRecord = { goalType, goalValue, date: new Date().toLocaleDateString() };
  
  try {
      const response = await fetch('http://localhost:3001/goals', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(goalRecord),
      });

      if (response.ok) {
          alert('Goal saved');
          loadView('home');
      } else {
          alert('Failed to save goal');
      }
  } catch (error) {
      console.error('Error saving goal:', error);
      alert('Error saving goal');
  }
}
