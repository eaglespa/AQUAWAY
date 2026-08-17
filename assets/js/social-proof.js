/* 
   Aquaway Tours — Social Proof & Trust Engine
   Subtle booking notifications to increase conversion.
*/
'use strict';

class SocialProof {
  constructor() {
    this.locations = ['London, UK', 'Berlin, DE', 'Paris, FR', 'Prague, CZ', 'Milan, IT', 'Warsaw, PL', 'Dubai, UAE', 'Cairo, EG', 'Amsterdam, NL', 'Munich, DE', 'Brussels, BE', 'Vienna, AT', 'Zurich, CH', 'Rome, IT', 'Madrid, ES', 'Oslo, NO', 'Stockholm, SE'];
    this.trips = (typeof TRIPS !== 'undefined' && TRIPS.length) ? TRIPS : [];
    this.container = null;
    this.init();
  }

  init() {
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'social-proof-container';
    Object.assign(this.container.style, {
      position: 'fixed',
      bottom: '30px',
      left: '20px',
      zIndex: '10000',
      pointerEvents: 'none',
      fontFamily: "'Inter', sans-serif"
    });
    document.body.appendChild(this.container);

    // Initial delay before first notification (wait for loader/intro)
    setTimeout(() => this.showNotification(), 12000);
  }

  showNotification() {
    const location = this.locations[Math.floor(Math.random() * this.locations.length)];
    const tripObj = this.trips.length ? this.trips[Math.floor(Math.random() * this.trips.length)] : null;
    const tripName = tripObj ? (typeof getLang === 'function' ? getLang(tripObj.name) : tripObj.name.en || Object.values(tripObj.name)[0]) : 'a trip';
    const time = Math.floor(Math.random() * 24) + 1;

    const notification = document.createElement('div');
    notification.className = 'social-proof-toast';
    const textLine = t('sp_text').replace('{location}', location);
    const subLine = t('sp_subtext').replace('{trip}', tripName).replace('{time}', time);
    notification.innerHTML = `
      <div class="sp-icon"></div>
      <div class="sp-content">
        <p class="sp-text">${textLine}</p>
        <p class="sp-subtext">${subLine}</p>
      </div>
    `;

    // Style the toast (Premium Glassmorphism)
    Object.assign(notification.style, {
      background: 'rgba(15, 15, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      borderRadius: '12px',
      padding: '12px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      transform: 'translateY(20px) scale(0.95)',
      opacity: '0',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      color: '#fff',
      maxWidth: '300px'
    });

    this.container.appendChild(notification);

    // Trigger Entrance
    requestAnimationFrame(() => {
      notification.style.transform = 'translateY(0) scale(1)';
      notification.style.opacity = '1';
    });

    // Handle RTL (Optional adjustment, but base is left)
    if (document.dir === 'rtl') {
      this.container.style.left = 'auto';
      this.container.style.right = '2.15rem';
    }

    // Auto-remove after 6 seconds
    setTimeout(() => {
      notification.style.transform = 'translateY(-20px) scale(0.95)';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 600);
      
      // Schedule next one between 15-30 seconds
      setTimeout(() => this.showNotification(), 15000 + Math.random() * 15000);
    }, 6000);
  }
}

// Inject CSS
const style = document.createElement('style');
style.textContent = `
  .sp-icon {
    width: 32px;
    height: 32px;
    background: var(--gold-bright, #d4af37);
    border-radius: 50%;
    position: relative;
    flex-shrink: 0;
  }
  .sp-icon::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 14px; height: 14px;
    background: #fff;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E") no-repeat center;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E") no-repeat center;
  }
  .sp-text { font-size: 13px; margin: 0; line-height: 1.4; color: rgba(255,255,255,0.9); }
  .sp-subtext { font-size: 11px; margin: 0; color: rgba(255,255,255,0.6); }
`;
document.head.appendChild(style);

// Initialize
if (window.innerWidth > 768) {
  document.addEventListener('DOMContentLoaded', () => new SocialProof());
}
