document.addEventListener('DOMContentLoaded', () => {
    initReport();
});

function initReport() {
    console.log('Initializing report view');
    generateReports();
    const clearButton = document.getElementById('clearHistoryButton');
    if (clearButton) {
        clearButton.addEventListener('click', clearHistory);
    } else {
        console.error('Clear History Button not found');
    }
}

async function generateReports() {
    await generateExerciseReport();
    await generateDietReport();
    await generateGoalReport();
}

async function generateExerciseReport() {
    let report = '<h3>Exercise Records</h3>';
    try {
        const response = await fetch('http://localhost:3001/exercises');
        if (response.ok) {
            const exercises = await response.json();
            if (exercises.length > 0) {
                report += '<ul>';
                exercises.forEach(exercise => {
                    report += `<li>${exercise.date} - ${exercise.type}: ${exercise.duration} minutes</li>`;
                });
                report += '</ul>';
            } else {
                report += '<p>No exercise records found.</p>';
            }
        } else {
            console.error('Failed to fetch exercise data:', response.statusText);
            report += '<p>Error fetching exercise records.</p>';
        }
    } catch (error) {
        console.error('Error fetching exercise data:', error);
        report += '<p>Error fetching exercise records.</p>';
    }
    document.getElementById('exerciseReport').innerHTML = report;
}

async function generateDietReport() {
    let report = '<h3>Diet Records</h3>';
    try {
        const response = await fetch('http://localhost:3001/diets');
        if (response.ok) {
            const diets = await response.json();
            if (diets.length > 0) {
                report += '<ul>';
                diets.forEach(diet => {
                    report += `<li>${diet.date} - ${diet.foodName}: ${diet.calories} calories</li>`;
                });
                report += '</ul>';
            } else {
                report += '<p>No diet records found.</p>';
            }
        } else {
            console.error('Failed to fetch diet data:', response.statusText);
            report += '<p>Error fetching diet records.</p>';
        }
    } catch (error) {
        console.error('Error fetching diet data:', error);
        report += '<p>Error fetching diet records.</p>';
    }
    document.getElementById('dietReport').innerHTML = report;
}

async function generateGoalReport() {
    let report = '<h3>Health Goals</h3>';
    try {
        const response = await fetch('http://localhost:3001/goals');
        if (response.ok) {
            const goal = await response.json();
            if (goal) {
                report += `
                    <p>Type: ${goal.goalType}</p>
                    <p>Value: ${goal.goalValue}</p>
                    <p>Set Date: ${goal.date}</p>
                `;
            } else {
                report += '<p>No goals set.</p>';
            }
        } else {
            console.error('Failed to fetch goal data:', response.statusText);
            report += '<p>Error fetching goal data.</p>';
        }
    } catch (error) {
        console.error('Error fetching goal data:', error);
        report += '<p>Error fetching goal data.</p>';
    }
    document.getElementById('goalReport').innerHTML = report;
}

async function clearHistory() {
    console.log('Clear History Button clicked');
    try {
        await fetch('http://localhost:3001/exercises', { method: 'DELETE' });
        await fetch('http://localhost:3001/diets', { method: 'DELETE' });
        await fetch('http://localhost:3001/goals', { method: 'DELETE' });
        alert('All history cleared');
        generateReports();
        console.log('Reports regenerated');
    } catch (error) {
        console.error('Error clearing history:', error);
        alert('Failed to clear history.');
    }
}




