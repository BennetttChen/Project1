document.addEventListener('DOMContentLoaded', () => {
  initExercise();
});

function initExercise() {
  console.log('Initializing exercise view');
  document.getElementById('saveExerciseButton').addEventListener('click', saveExercise);
}

async function saveExercise() {
  console.log('Saving exercise record');

  const type = document.getElementById('exerciseType').value;
  const duration = document.getElementById('duration').value;

  const exerciseRecord = { type, duration, date: new Date().toLocaleDateString() };

  try {
    const response = await fetch('http://localhost:3001/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseRecord),
    });

    if (response.ok) {
      alert('Exercise record saved');
      loadView('home');
    } else {
      alert('Failed to save exercise record');
    }
  } catch (error) {
    console.error('Error saving exercise record:', error);
    alert('Error saving exercise record');
  }
}


  