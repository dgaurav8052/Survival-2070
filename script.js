// =======================
// State
// =======================
let gameState = {
    credits: 100,
    food: 50,
    water: 50,
    energy: 500,
    daysLeft: 50,
    maxFood: 100,
    maxWater: 100,
    maxEnergy: 500,
    lastUpdate: Date.now()
};

// =======================
// DOM Elements
// =======================
const elements = {
    credits: document.getElementById('credits'),
    food: document.getElementById('food'),
    water: document.getElementById('water'),
    energy: document.getElementById('energy'),
    energyText: document.getElementById('energy-text'),
    daysLeft: document.getElementById('days-left'),
    totalSupplies: document.getElementById('total-supplies'),
    buyButton: document.getElementById('buy-button'),
    alertsContainer: document.getElementById('alerts-container'),
    energyBar: document.getElementById('energy-bar'),
    foodBar: document.getElementById('food-bar'),
    waterBar: document.getElementById('water-bar'),
    systemStatus: document.getElementById('system-status'),
    resourceStatus: document.getElementById('resource-status'),
    missionStatus: document.getElementById('mission-status'),
    daysIcon: document.getElementById('days-icon')
};

// =======================
// Utility Functions
// =======================
function getStatusColor(value, max) {
    const percentage = (value / max) * 100;
    if (percentage <= 20) return 'from-red-500 to-red-700';
    if (percentage <= 50) return 'from-yellow-500 to-orange-600';
    return 'from-green-500 to-emerald-600';
}

function updateProgressBar(element, value, max) {
    const percentage = Math.min((value / max) * 100, 100);
    element.style.width = `${percentage}%`;
    element.className = `h-full bg-gradient-to-r ${getStatusColor(value, max)} transition-all duration-500 ease-out`;
}

function calculateDerivedStats() {
    gameState.energy = Math.min((gameState.food + gameState.water) * 5, gameState.maxEnergy);
    gameState.daysLeft = Math.floor(gameState.energy / 10);
}

// =======================
// Display Updates
// =======================
function updateDisplay() {
    elements.credits.textContent = gameState.credits;
    elements.food.textContent = Math.floor(gameState.food);
    elements.water.textContent = Math.floor(gameState.water);
    elements.energy.textContent = Math.floor(gameState.energy);
    elements.energyText.textContent = Math.floor(gameState.energy);
    elements.daysLeft.textContent = Math.floor(gameState.daysLeft);
    elements.totalSupplies.textContent = Math.floor(gameState.food + gameState.water);

    updateProgressBar(elements.energyBar, gameState.energy, gameState.maxEnergy);
    updateProgressBar(elements.foodBar, gameState.food, gameState.maxFood);
    updateProgressBar(elements.waterBar, gameState.water, gameState.maxWater);

    // Buy button state
    if (gameState.credits >= 20) {
        elements.buyButton.classList.remove('bg-gray-700', 'text-gray-500', 'cursor-not-allowed');
        elements.buyButton.disabled = false;
    } else {
        elements.buyButton.classList.add('bg-gray-700', 'text-gray-500', 'cursor-not-allowed');
        elements.buyButton.disabled = true;
    }

    updateStatusIndicators();
    updateAlerts();
}

function updateStatusIndicators() {
    // System Status
    if (gameState.energy > 200) {
        elements.systemStatus.textContent = 'OPTIMAL';
        elements.systemStatus.className = 'text-lg font-bold text-green-400';
    } else if (gameState.energy > 100) {
        elements.systemStatus.textContent = 'CAUTION';
        elements.systemStatus.className = 'text-lg font-bold text-yellow-400';
    } else {
        elements.systemStatus.textContent = 'CRITICAL';
        elements.systemStatus.className = 'text-lg font-bold text-red-400';
    }

    // Resource Level
    const totalResources = gameState.food + gameState.water;
    if (totalResources > 60) {
        elements.resourceStatus.textContent = 'STABLE';
        elements.resourceStatus.className = 'text-lg font-bold text-green-400';
    } else if (totalResources > 30) {
        elements.resourceStatus.textContent = 'LOW';
        elements.resourceStatus.className = 'text-lg font-bold text-yellow-400';
    } else {
        elements.resourceStatus.textContent = 'CRITICAL';
        elements.resourceStatus.className = 'text-lg font-bold text-red-400';
    }

    // Mission Time
    if (gameState.daysLeft > 20) {
        elements.missionStatus.textContent = 'EXTENDED';
        elements.missionStatus.className = 'text-lg font-bold text-green-400';
    } else if (gameState.daysLeft > 10) {
        elements.missionStatus.textContent = 'LIMITED';
        elements.missionStatus.className = 'text-lg font-bold text-yellow-400';
    } else {
        elements.missionStatus.textContent = 'EMERGENCY';
        elements.missionStatus.className = 'text-lg font-bold text-red-400';
    }

    // Days Icon Color
    if (gameState.daysLeft <= 5) {
        elements.daysIcon.className = 'h-6 w-6 text-red-400';
    } else if (gameState.daysLeft <= 15) {
        elements.daysIcon.className = 'h-6 w-6 text-yellow-400';
    } else {
        elements.daysIcon.className = 'h-6 w-6 text-green-400';
    }
}

function updateAlerts() {
    const alerts = [];
    if (gameState.food <= 10) alerts.push('Food critically low!');
    if (gameState.water <= 10) alerts.push('Water critically low!');
    if (gameState.energy <= 100) alerts.push('Energy dangerously low!');
    if (gameState.daysLeft <= 5) alerts.push('Survival time critical!');

    elements.alertsContainer.innerHTML = '';
    alerts.forEach(alert => {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'bg-red-900/80 border border-red-500 rounded-lg p-4 mb-2 flex items-center animate-pulse';
        alertDiv.innerHTML = `<span class="text-red-200">${alert}</span>`;
        elements.alertsContainer.appendChild(alertDiv);
    });
}

// =======================
// Actions
// =======================
function buySupplies() {
    if (gameState.credits >= 20) {
        gameState.credits -= 20;
        gameState.food = Math.min(gameState.maxFood, gameState.food + 15);
        gameState.water = Math.min(gameState.maxWater, gameState.water + 20);
        calculateDerivedStats();
        updateDisplay();
    }
}

// =======================
// Resource Decay
// =======================
const FOOD_DECAY_PER_SECOND = 0.1;   // slow decay
const WATER_DECAY_PER_SECOND = 0.15;

function gameLoop() {
    const now = Date.now();
    const delta = (now - gameState.lastUpdate) / 1000; // seconds
    gameState.lastUpdate = now;

    // Decay food & water gradually
    gameState.food = Math.max(0, gameState.food - FOOD_DECAY_PER_SECOND * delta);
    gameState.water = Math.max(0, gameState.water - WATER_DECAY_PER_SECOND * delta);

    // Recalculate energy/days smoothly
    calculateDerivedStats();
    updateDisplay();

    requestAnimationFrame(gameLoop);
}

// =======================
// Event Listeners
// =======================
elements.buyButton.addEventListener('click', buySupplies);

// =======================
// Start 
// =======================
gameLoop();

// Add credits periodically
setInterval(() => {
    gameState.credits = Math.min(200, gameState.credits + 5);
    updateDisplay();
}, 10000);
