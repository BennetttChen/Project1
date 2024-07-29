document.addEventListener('DOMContentLoaded', () => {
    initReport();
});

function initReport() {
    console.log('Initializing report view');
    generateExerciseReport();
    generateDietReport();
    generateGoalReport();
    const clearButton = document.getElementById('clearHistoryButton');
    if (clearButton) {
        clearButton.addEventListener('click', clearHistory);
    } else {
        console.error('Clear History Button not found');
    }
}

function generateExerciseReport() {
    const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
    let report = '<h3>Exercise Records</h3><ul>';
    exercises.forEach(exercise => {
        report += `<li>${exercise.date} - ${exercise.type}: ${exercise.duration} minutes</li>`;
    });
    report += '</ul>';
    document.getElementById('exerciseReport').innerHTML = report;
}

function generateDietReport() {
    const diets = JSON.parse(localStorage.getItem('diets')) || [];
    let report = '<h3>Diet Records</h3><ul>';
    diets.forEach(diet => {
        report += `<li>${diet.date} - ${diet.foodName}: ${diet.calories} calories</li>`;
    });
    report += '</ul>';
    document.getElementById('dietReport').innerHTML = report;
}

function generateGoalReport() {
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

function clearHistory() {
    console.log('Clear History Button clicked');
    localStorage.removeItem('exercises');
    console.log('Exercises cleared');
    localStorage.removeItem('diets');
    console.log('Diets cleared');
    localStorage.removeItem('goal');
    console.log('Goal cleared');
    alert('All history cleared');
    generateExerciseReport();
    generateDietReport();
    generateGoalReport();
    console.log('Reports regenerated');
}



