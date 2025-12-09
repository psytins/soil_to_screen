document.addEventListener('DOMContentLoaded', () => {
    
    // SCREENS
    const screens = {
        product: document.getElementById('screen-product'),
        roadmap: document.getElementById('screen-roadmap'),
        login: document.getElementById('screen-login'),
        dashboard: document.getElementById('screen-dashboard'),
        newHarvest: document.getElementById('screen-new-harvest'),
        success: document.getElementById('screen-success')
    };

    // NAVIGATOR FUNCTION
    function showScreen(screenName) {
        // Hide all
        Object.values(screens).forEach(s => {
            if(s) {
                s.classList.remove('active');
                s.classList.add('hidden');
            }
        });
        
        // Show target
        if(screens[screenName]) {
            screens[screenName].classList.remove('hidden');
            screens[screenName].classList.add('active');
        }
    }

    // --- EVENT LISTENERS ---

    // Consumer Flow
    const btnJourney = document.getElementById('btn-journey');
    const btnBack = document.getElementById('btn-back');

    if(btnJourney) btnJourney.addEventListener('click', () => showScreen('roadmap'));
    if(btnBack) btnBack.addEventListener('click', () => showScreen('product'));

    // Producer Flow
    const btnLogin = document.getElementById('btn-login');
    const btnNewHarvest = document.getElementById('btn-new-harvest');
    const btnBackDash = document.getElementById('btn-back-dash');
    const btnCreate = document.getElementById('btn-create');
    const btnHome = document.getElementById('btn-home');

    // Login -> Dashboard
    if(btnLogin) btnLogin.addEventListener('click', () => showScreen('dashboard'));

    // Dashboard -> New Harvest
    if(btnNewHarvest) btnNewHarvest.addEventListener('click', () => showScreen('newHarvest'));

    // Cancel -> Back to Dashboard
    if(btnBackDash) btnBackDash.addEventListener('click', () => showScreen('dashboard'));

    // Create -> Success
    if(btnCreate) btnCreate.addEventListener('click', () => {
        // 1. Get values (fake or real input)
        const produceType = document.querySelector('select').value || 'Produce';
        const batchId = 'BATCH-' + Math.floor(Math.random() * 10000);
        
        // 2. Update the Success Screen Text
        document.getElementById('harvest-title').innerText = `Harvest #37 - ${produceType}`;
        document.getElementById('batch-id').innerText = batchId;

        // 3. GENERATE QR CODE (The Hack)
        // Uses a free API to generate a QR containing the Batch ID
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${batchId}`;
        document.getElementById('qr-code-img').src = qrUrl;
        showScreen('success');
    });

    // Success -> Dashboard (Loop)
    if(btnHome) btnHome.addEventListener('click', () => showScreen('dashboard'));

    // --- INIT ---
    // Change this to 'login' if you want to start on the producer side immediately
    // Or keep 'product' for consumer side
    showScreen('login'); 

    // Simulate IoT Alert
    function triggerSensorAlert() {
        const toast = document.getElementById('sensor-toast');
        
        // Wait 3 seconds then show alert
        setTimeout(() => {
            // Only show if we are in dashboard to avoid confusion
            if(!document.getElementById('screen-dashboard').classList.contains('hidden')) {
                toast.classList.add('show');
                
                // Hide after 4 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
            }
        }, 3000); 
    }

    // Trigger this when entering dashboard
    if(btnLogin) btnLogin.addEventListener('click', () => {
        showScreen('dashboard');
        triggerSensorAlert(); // <--- Add this line
    });
    
    // Backdoor: Login Screen -> Consumer Product Screen
    const btnToConsumer = document.getElementById('btn-to-consumer');
    if(btnToConsumer) {
        btnToConsumer.addEventListener('click', () => {
            showScreen('product');
        });
    }
});