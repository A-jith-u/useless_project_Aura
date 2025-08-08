// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Tab navigation
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Selection functions for Core Energy Test
function selectColor(color) {
    document.querySelectorAll('.vibe-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    document.getElementById('selected-color').value = color;
}

function selectCompanion(companion) {
    document.querySelectorAll('.vibe-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    document.getElementById('selected-companion').value = companion;
}

// Selection functions for Mood Scan
function toggleSelection(element) {
    element.classList.toggle('selected');
}

function selectReaction(reaction) {
    document.querySelectorAll('.vibe-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    document.getElementById('selected-reaction').value = reaction;
}

// Aura calculation from checklist
function calculateAuraFromChecklist() {
    let totalScore = 0;
    const checkboxes = document.querySelectorAll('.aura-checklist input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        totalScore += parseInt(checkbox.getAttribute('data-points'));
    });
    
    document.getElementById('aura-score').textContent = totalScore;
    
    // Determine aura type based on score
    let auraType, description, match, energy, rarity;
    
    if (totalScore >= 400) {
        auraType = "Radiant Sunburst";
        description = "You're glowing with intense positive energy! Your aura is vibrant and attracts good vibes wherever you go.";
        match = "95%";
        energy = "☀️☀️☀️☀️☀️";
        rarity = "5%";
    } else if (totalScore >= 300) {
        auraType = "Harmonic Bloom";
        description = "Your energy is in perfect balance, radiating peaceful and creative vibrations that inspire those around you.";
        match = "85%";
        energy = "🌸🌸🌸🌸";
        rarity = "15%";
    } else if (totalScore >= 200) {
        auraType = "Serene Glow";
        description = "You're emitting a calm, steady energy that creates a comforting presence. People feel at ease around you.";
        match = "75%";
        energy = "💡💡💡";
        rarity = "25%";
    } else if (totalScore >= 100) {
        auraType = "Gentle Breeze";
        description = "Your energy is light and refreshing, like a cool breeze. You bring subtle positivity wherever you go.";
        match = "65%";
        energy = "🍃🍃";
        rarity = "35%";
    } else if (totalScore >= 0) {
        auraType = "Flickering Candle";
        description = "Your energy is present but inconsistent. Some self-care could help stabilize your vibrations.";
        match = "50%";
        energy = "🕯️";
        rarity = "45%";
    } else if (totalScore >= -100) {
        auraType = "Misty Veil";
        description = "Your energy is subdued and needs recharging. Consider activities that bring you joy to brighten your aura.";
        match = "35%";
        energy = "🌫️";
        rarity = "30%";
    } else {
        auraType = "Shadow Veil";
        description = "Your energy is low right now. Connect with loved ones or do something nourishing to recharge.";
        match = "20%";
        energy = "🌑";
        rarity = "15%";
    }
    
    // Update the UI
    document.getElementById('result-name').textContent = auraType;
    document.getElementById('result-desc').textContent = description;
    document.getElementById('stat-match').textContent = match;
    document.getElementById('stat-energy').textContent = energy;
    document.getElementById('stat-rarity').textContent = rarity;
    
    // Show the result container
    const resultContainer = document.querySelector('.result-container');
    resultContainer.style.display = 'block';
    resultContainer.classList.add('animate__animated', 'animate__fadeInUp');
    
    // Add to history
    addToHistory(auraType, totalScore);
}

// Core Energy calculation
function calculateCoreEnergy() {
    const color = document.getElementById('selected-color').value;
    const companion = document.getElementById('selected-companion').value;
    const intensity = document.getElementById('energy-intensity').value;
    
    if (!color || !companion) {
        document.getElementById('classic-error').textContent = 'Please select both a color and companion';
        document.getElementById('classic-error').style.display = 'block';
        return;
    }
    
    document.getElementById('classic-error').style.display = 'none';
    
    // Calculate score based on selections
    let score = 500; // Base score
    score += parseInt(intensity) * 2;
    
    // Adjust based on color
    const colorScores = {
        'purple': 150,
        'blue': 100,
        'red': 80,
        'green': 120
    };
    score += colorScores[color] || 0;
    
    // Adjust based on companion
    const companionScores = {
        'airpods': 70,
        'phone': 50,
        'laptop': 90,
        'book': 110
    };
    score += companionScores[companion] || 0;
    
    showResult(score);
}

// Mood Aura calculation
function calculateMoodAura() {
    const selectedMoods = document.querySelectorAll('.mood-option.selected');
    const reaction = document.getElementById('selected-reaction').value;
    
    if (selectedMoods.length === 0 || !reaction) {
        document.getElementById('mood-error').textContent = 'Please select at least one mood and your reaction';
        document.getElementById('mood-error').style.display = 'block';
        return;
    }
    
    document.getElementById('mood-error').style.display = 'none';
    
    let score = 300; // Base score
    
    // Add points for each mood
    selectedMoods.forEach(mood => {
        const moodText = mood.textContent.trim();
        const moodPoints = {
            '😌 Chill': 40,
            '🤪 Unhinged': -30,
            '😔 Sad Boi Hours': -50,
            '🔥 Hot Take Ready': 60,
            '🧠 Overthinking': -20,
            '💅 Slaying': 80
        };
        score += moodPoints[moodText] || 0;
    });
    
    // Adjust based on reaction
    const reactionScores = {
        'laugh': 70,
        'cry': 30,
        'mindblown': 90,
        'meh': -40
    };
    score += reactionScores[reaction] || 0;
    
    showResult(score);
}

// Day Experience analysis
function calculateAuraFromExperience() {
    const experienceText = document.getElementById('day-experience').value;
    const dayRating = document.getElementById('day-rating').value;
    
    if (!experienceText || !dayRating) {
        document.getElementById('experience-error').textContent = 'Please describe your day and select a rating';
        document.getElementById('experience-error').style.display = 'block';
        return;
    }
    
    document.getElementById('experience-error').style.display = 'none';
    
    // Basic sentiment analysis (simplified for demo)
    let positiveWords = 0;
    let negativeWords = 0;
    
    const positiveKeywords = ['happy', 'good', 'great', 'amazing', 'wonderful', 'love', 'enjoy', 'excited', 'positive'];
    const negativeKeywords = ['bad', 'sad', 'angry', 'hate', 'terrible', 'awful', 'stress', 'anxious', 'negative'];
    
    const text = experienceText.toLowerCase();
    
    positiveKeywords.forEach(word => {
        if (text.includes(word)) positiveWords++;
    });
    
    negativeKeywords.forEach(word => {
        if (text.includes(word)) negativeWords++;
    });
    
    // Calculate score based on sentiment and rating
    let score = 400; // Base score
    score += (positiveWords * 30);
    score -= (negativeWords * 40);
    score += (parseInt(dayRating) * 50);
    
    // Adjust for text length (more detailed descriptions get bonus)
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 50) score += 50;
    if (wordCount > 100) score += 50;
    
    // Cap the score
    score = Math.max(0, Math.min(1000, score));
    
    showResult(score);
}

// Show result with aura analysis
function showResult(score) {
    const resultContainer = document.querySelector('.result-container');
    const auraName = document.getElementById('result-name');
    const auraDesc = document.getElementById('result-desc');
    const statMatch = document.getElementById('stat-match');
    const statEnergy = document.getElementById('stat-energy');
    const statRarity = document.getElementById('stat-rarity');
    
    // Determine aura type based on score
    let auraType, description, match, energy, rarity;
    
    if (score >= 900) {
        auraType = "Celestial Radiance";
        description = "You're glowing with divine energy! Your aura is so bright it's almost blinding. People are naturally drawn to your positive vibrations.";
        match = "98%";
        energy = "⚡⚡⚡⚡⚡";
        rarity = "0.5%";
    } else if (score >= 750) {
        auraType = "Vibrant Luminescence";
        description = "Your energy is electric and infectious! You're radiating good vibes that uplift everyone around you.";
        match = "88%";
        energy = "⚡⚡⚡⚡";
        rarity = "5%";
    } else if (score >= 600) {
        auraType = "Harmonic Glow";
        description = "You've achieved perfect balance! Your aura shows a beautiful harmony between mind, body and spirit.";
        match = "75%";
        energy = "⚡⚡⚡";
        rarity = "15%";
    } else if (score >= 450) {
        auraType = "Gentle Haze";
        description = "Your energy is calm and steady. You might not be the brightest light in the room, but your presence is comforting.";
        match = "62%";
        energy = "⚡⚡";
        rarity = "30%";
    } else if (score >= 300) {
        auraType = "Flickering Flame";
        description = "Your energy is inconsistent - sometimes bright, sometimes dim. You might need some self-care to stabilize your vibrations.";
        match = "45%";
        energy = "⚡";
        rarity = "40%";
    } else {
        auraType = "Shadow Veil";
        description = "Your energy is low right now. Consider doing something that brings you joy or connecting with loved ones to recharge.";
        match = "22%";
        energy = "🌑";
        rarity = "9.5%";
    }
    
    // Update the UI
    auraName.textContent = auraType;
    auraDesc.textContent = description;
    statMatch.textContent = match;
    statEnergy.textContent = energy;
    statRarity.textContent = rarity;
    
    // Show the result container with animation
    resultContainer.style.display = 'block';
    resultContainer.classList.add('animate__animated', 'animate__fadeInUp');
    
    // Add to history
    addToHistory(auraType, score);
}

// Add result to history
function addToHistory(auraType, score) {
    const historyList = document.getElementById('history-list');
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const historyItem = document.createElement('div');
    historyItem.className = 'aura-item';
    historyItem.innerHTML = `
        <div style="flex: 1;">
            <strong>${auraType}</strong>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">${dateStr}</div>
        </div>
        <div class="aura-points" style="color: ${score >= 450 ? 'var(--cyber-teal)' : 'var(--error-red)'}">
            ${score}
        </div>
    `;
    
    historyList.prepend(historyItem);
}

// Add custom experience to checklist
function addCustomExperience() {
    const textarea = document.querySelector('.other-experience textarea');
    const text = textarea.value.trim();
    
    if (!text) return;
    
    // Create a modal/prompt to get points value
    const points = prompt("Enter aura points for this experience (positive or negative number):", "50");
    
    if (points === null) return; // User cancelled
    
    const pointsValue = parseInt(points);
    if (isNaN(pointsValue)) {
        alert("Please enter a valid number for points");
        return;
    }
    
    const checklist = document.querySelector('.aura-checklist');
    const newItem = document.createElement('label');
    newItem.className = 'aura-item';
    
    // Determine point class based on positive/negative
    const pointsClass = pointsValue >= 0 ? 'positive-points' : 'negative-points';
    const pointsDisplay = pointsValue >= 0 ? `+${pointsValue}` : pointsValue;
    
    newItem.innerHTML = `
        <input type="checkbox" data-points="${pointsValue}">
        <span>${text}</span>
        <span class="aura-points ${pointsClass}">${pointsDisplay}</span>
    `;
    
    checklist.appendChild(newItem);
    textarea.value = '';
    
    // Add click handler to new item
    newItem.querySelector('input').addEventListener('click', function() {
        calculateAuraFromChecklist();
    });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Checklist item click handlers
    document.querySelectorAll('.aura-checklist input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', calculateAuraFromChecklist);
    });
    
    // Initialize history with some sample data
    const sampleHistory = [
        { type: "Harmonic Glow", score: 680, date: "2023-05-15T14:30:00" },
        { type: "Vibrant Luminescence", score: 820, date: "2023-05-10T09:15:00" },
        { type: "Gentle Haze", score: 500, date: "2023-05-05T18:45:00" }
    ];
    
    sampleHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'aura-item';
        historyItem.innerHTML = `
            <div style="flex: 1;">
                <strong>${item.type}</strong>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">
                    ${new Date(item.date).toLocaleDateString()} ${new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>
            <div class="aura-points" style="color: ${item.score >= 450 ? 'var(--cyber-teal)' : 'var(--error-red)'}">
                ${item.score}
            </div>
        `;
        document.getElementById('history-list').appendChild(historyItem);
    });
});