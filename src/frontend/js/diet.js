document.addEventListener('DOMContentLoaded', () => {
  initDiet();
});

function initDiet() {
  console.log('Initializing diet view');
  document.getElementById('saveDietButton').addEventListener('click', saveDiet);
}

async function saveDiet() {
  console.log('Saving diet record');

  const foodName = document.getElementById('foodName').value;
  const calories = document.getElementById('calories').value;

  const dietRecord = { foodName, calories, date: new Date().toLocaleDateString() };

  try {
    const response = await fetch('http://localhost:3001/diets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dietRecord),
    });

    if (response.ok) {
      alert('Diet record saved');
      loadView('home');
    } else {
      alert('Failed to save diet record');
    }
  } catch (error) {
    console.error('Error saving diet record:', error);
    alert('Error saving diet record');
  }
}

  