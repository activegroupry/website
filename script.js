// Basic interactive behavior: countdown timer, form validation, smooth scrolling
(function(){
  // Countdown to event start (set to Oct 18 2025 08:00 local time)
  const eventDate = new Date('2025-10-18T08:00:00');
  const cdEl = document.getElementById('countdown');

  function updateCountdown(){
    const now = new Date();
    let diff = eventDate - now;
    if (diff <= 0){
      cdEl.textContent = 'Event started';
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days*(1000*60*60*24);
    const hours = Math.floor(diff/(1000*60*60));
    diff -= hours*(1000*60*60);
    const mins = Math.floor(diff/(1000*60));
    cdEl.textContent = `${days}d ${hours}h ${mins}m until start`;
  }
  updateCountdown();
  setInterval(updateCountdown, 60*1000);

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if (target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Simple form validation + simulated submit
  const form = document.getElementById('registrationForm');
  const msg = document.getElementById('formMessage');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    msg.textContent = '';
    const formData = new FormData(form);
    // Basic required checks (HTML required attributes also help)
    if (!formData.get('teamName') || !formData.get('division') || !formData.get('contactEmail') || !formData.get('agreeTerms')){
      msg.style.color = 'crimson';
      msg.textContent = 'Please complete all required fields and accept the waiver.';
      return;
    }

    // Simulate server request
    msg.style.color = 'green';
    msg.textContent = 'Submitting registration...';
    setTimeout(()=>{
      msg.textContent = 'Registration received! We sent confirmation to ' + formData.get('contactEmail') + '.';
      form.reset();
    }, 900);
  });

})();