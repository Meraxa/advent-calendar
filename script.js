// Get current date
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed

// Get all doors
const doors = document.querySelectorAll('.door');

// Initialize doors based on current date
doors.forEach(door => {
    const day = parseInt(door.dataset.day);
    
    // Check if this door can be opened
    // Only allow opening if it's December and the day has arrived
    let canOpen = (currentMonth === 12 && day <= currentDay) || 
                    (currentMonth > 12); // Allow all doors to open after December
    canOpen = true;
    
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
                openLightbox(doorImage.src, `Day ${day}`);
            }
        });
    }
});

// Lightbox functionality
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption;
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

// Optional: Add a reset button for testing (remove in production)
// Uncomment the following lines if you want a reset button during development
/*
const resetBtn = document.createElement('button');
resetBtn.textContent = 'Reset Calendar (Dev Only)';
resetBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background: #c41e1e;
    color: white;
    border: 2px solid #ffd700;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
`;
resetBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});
document.body.appendChild(resetBtn);
*/
