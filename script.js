// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Show magic message
function showMessage() {
    const messages = [
        "✨ May your days be merry and bright! ✨",
        "🎄 Christmas magic is in the air! 🎄",
        "⭐ Believe in the magic of the season! ⭐",
        "🎅 Ho ho ho! Merry Christmas! 🎅",
        "❄️ Let it snow, let it snow, let it snow! ❄️"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 3rem 4rem;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        animation: modalFadeIn 0.5s ease;
    `;
    
    modal.innerHTML = `
        <div>${randomMessage}</div>
        <button onclick="this.parentElement.remove(); document.querySelector('.modal-overlay').remove();" 
                style="margin-top: 2rem; padding: 0.8rem 2rem; background: white; color: #667eea; 
                       border: none; border-radius: 10px; font-size: 1rem; cursor: pointer; 
                       font-weight: bold; transition: all 0.3s ease;">
            Close
        </button>
    `;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    overlay.onclick = () => {
        modal.remove();
        overlay.remove();
    };
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const formMessage = document.getElementById('form-message');
    formMessage.className = 'form-message success';
    formMessage.textContent = `🎄 Thank you, ${name}! Your Christmas wish has been received. We'll be in touch soon! ✨`;
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1rem;
        pointer-events: none;
        z-index: 9998;
        animation: sparkleFloat 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and gallery items
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Log welcome message
console.log('%c🎄 Welcome to Joulujuttu! 🎄', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ May your code be merry and bright! ✨', 'color: #764ba2; font-size: 16px;');
