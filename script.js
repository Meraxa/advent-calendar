// Get current date
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed

// Load text data for each day
const dayTexts = {
    1: "Specific text for day 1.",
    2: "Specific text for day 2.",
    3: "Specific text for day 3.",
    4: "Specific text for day 4.",
    5: "Specific text for day 5.",
    6: "Specific text for day 6.",
    7: "Specific text for day 7.",
    8: "Specific text for day 8.",
    9: "Specific text for day 9.",
    10: "Specific text for day 10.",
    11: "Specific text for day 11.",
    12: "Specific text for day 12.",
    13: "Specific text for day 13.",
    14: "Specific text for day 14.",
    15: "Specific text for day 15.",
    16: "Specific text for day 16.",
    17: "Specific text for day 17.",
    18: "Specific text for day 18.",
    19: "Specific text for day 19.",
    20: "Specific text for day 20.",
    21: "Specific text for day 21.",
    22: "Specific text for day 22.",
    23: "Specific text for day 23.",
    24: "Specific text for day 24."
};

// Get all doors
const doors = document.querySelectorAll('.door');

// Initialize doors based on current date
doors.forEach(door => {
    const day = parseInt(door.dataset.day);

    // Check if this door can be opened
    // Only allow opening if it's December and the day has arrived
    let canOpen = (currentMonth === 12 && day <= currentDay) ||
                    (currentMonth > 12); // Allow all doors to open after December

    // canOpen = true; // For testing purposes, allow all doors to be opened

    // Check if door was previously opened (stored in localStorage)
    const isOpened = localStorage.getItem(`door-${day}`) === 'opened';

    if (isOpened) {
        door.classList.add('opened');
    }

    if (!canOpen) {
        door.classList.add('locked');
    }

    // Add click event listener
    door.addEventListener('click', () => {
        if (!canOpen) {
            // Show message that door cannot be opened yet
            showMessage(`Door ${day} can only be opened on December ${day}!`);
            return;
        }

        if (!door.classList.contains('opened')) {
            door.classList.add('opened');
            localStorage.setItem(`door-${day}`, 'opened');

            // Play a subtle sound effect (optional - would need audio file)
            // new Audio('open.mp3').play();
        }
    });

    // Add click event to images for lightbox
    const doorImage = door.querySelector('.door-back img');
    if (doorImage) {
        doorImage.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent door click event
            if (door.classList.contains('opened')) {
                openLightbox(doorImage.src, `Day ${day}`, day);
            }
        });
    }
});

// Lightbox functionality
function openLightbox(imageSrc, caption, day) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxDayText = document.getElementById('lightbox-text'); // Use existing element

    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption;

    // Update the text for the day
    const dayText = dayTexts[day] || "No text available for this day.";
    lightboxDayText.textContent = dayText;

    lightbox.style.display = 'block';

    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';

    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Close lightbox event listeners
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeLightbox();
    }
});

document.querySelector('.close-btn').addEventListener('click', closeLightbox);

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Function to show temporary message
function showMessage(text) {
    // Remove existing message if any
    const existingMsg = document.querySelector('.temp-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    const message = document.createElement('div');
    message.className = 'temp-message';
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 1.2em;
        z-index: 1000;
        border: 2px solid #ffd700;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.transition = 'opacity 0.5s';
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 2000);
}

// Ensure background audio plays after user interaction
window.addEventListener('click', () => {
    const audio = document.getElementById('background-audio');
    if (audio && audio.paused) {
        audio.play().catch(err => console.error('Audio playback failed:', err));
    }
}, { once: true });


// Optional: Add a reset button for testing (remove in production)
// Uncomment the following lines if you want a reset button during development

// const resetBtn = document.createElement('button');
// resetBtn.textContent = 'Reset Calendar (Dev Only)';
// resetBtn.style.cssText = `
//     position: fixed;
//     bottom: 20px;
//     right: 20px;
//     padding: 10px 20px;
//     background: #c41e1e;
//     color: white;
//     border: 2px solid #ffd700;
//     border-radius: 5px;
//     cursor: pointer;
//     z-index: 1000;
// `;
// resetBtn.addEventListener('click', () => {
//     localStorage.clear();
//     location.reload();
// });
// document.body.appendChild(resetBtn);
