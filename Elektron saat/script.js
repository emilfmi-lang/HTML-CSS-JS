(() => {

    const tzSelect = document.getElementById('tz');
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const hourHand = document.getElementById('hour');
    const minuteHand = document.getElementById('minute');
    const secondHand = document.getElementById('second');
    const toggleFormatBtn = document.getElementById('toggle-format');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const alarmForm = document.getElementById('alarm-form');
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmLabelInput = document.getElementById('alarm-label');
    const alarmsList = document.getElementById('alarms-list');
    const clearAlarmsBtn = document.getElementById('clear-alarms');

    const PREFS_KEY = 'modern_clock_prefs_v1';
    const ALARMS_KEY = 'modern_clock_alarms_v1';

    const defaultPrefs = {
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        is24: true,
        theme: 'auto'
    };

    let prefs = Object.assign({}, defaultPrefs, JSON.parse(localStorage.getItem(PREFS_KEY) || '{}'));
    let alarms = JSON.parse(localStorage.getItem(ALARMS_KEY) || '[]');

    const timezones = [
        'UTC', 'Europe/Baku', 'Europe/Istanbul', 'Europe/London', 'Europe/Paris',
        'America/New_York', 'America/Chicago', 'America/Los_Angeles',
        'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Dubai'
    ];


    (function populateTimezones() {
        if (!tzSelect) return;
        tzSelect.innerHTML = '';
        timezones.forEach(tz => {
            const o = document.createElement('option');
            o.value = tz;
            o.textContent = tz;
            if (tz === prefs.tz) o.selected = true;
            tzSelect.appendChild(o);
        });
    })();

    function applyTheme(theme) {
        if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
        else if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
        else document.documentElement.removeAttribute('data-theme'); // follow system
    }
    applyTheme(prefs.theme);

    function savePrefs() { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); }

    function formatTime(dt, tz, is24) {
        const opts = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: !is24, timeZone: tz };
        return new Intl.DateTimeFormat([], opts).format(dt);
    }
    function formatDate(dt, tz) {
        const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: tz };
        return new Intl.DateTimeFormat([], opts).format(dt);
    }

    function setHands(dt, tz) {
        const parts = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone: tz }).formatToParts(dt);
        const get = (type) => { const p = parts.find(x => x.type === type); return p ? Number(p.value) : 0; };
        const h = get('hour'), m = get('minute'), s = get('second');
        const secAngle = s * 6;
        const minAngle = (m + s / 60) * 6;
        const hourAngle = ((h % 12) + m / 60 + s / 3600) * 30;
        if (secondHand) secondHand.style.transform = `rotate(${secAngle}deg)`;
        if (minuteHand) minuteHand.style.transform = `rotate(${minAngle}deg)`;
        if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
    }

    (function drawMarks() {
        const dial = document.getElementById('dial');
        if (!dial) return;
        for (let i = 0; i < 12; i++) {
            const el = document.createElement('div');
            el.className = 'mark';
            const angle = i * 30;
            el.style.height = (i % 3 === 0 ? '14px' : '8px');
            el.style.top = '6%';
            el.style.transform = `translateX(-50%) rotate(${angle}deg) translateY(-4%)`;
            el.style.left = '50%';
            dial.appendChild(el);
        }
    })();
    //alarms management
    function saveAlarms() { localStorage.setItem(ALARMS_KEY, JSON.stringify(alarms)); }
    function renderAlarms() {
        if (!alarmsList) return;
        alarmsList.innerHTML = '';
        alarms.forEach((a, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${a.time} — ${a.label || ''} ${a.triggered ? '<strong>(işlədi)</strong>' : ''}</span>`;
            const btn = document.createElement('button');
            btn.textContent = 'Sil';
            btn.addEventListener('click', () => { alarms.splice(idx, 1); saveAlarms(); renderAlarms(); });
            li.appendChild(btn);
            alarmsList.appendChild(li);
        });
    }

    function playBeep() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = 'sine'; o.frequency.setValueAtTime(880, ctx.currentTime);
            g.gain.setValueAtTime(0.0001, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
            o.connect(g); g.connect(ctx.destination); o.start();
            setTimeout(() => { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2); o.stop(); ctx.close(); }, 1400);
        } catch (e) { console.warn('Audio error', e); }
    }

    function showNotification(text) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(text);
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(p => { if (p === 'granted') new Notification(text); else alert(text); });
        } else {
            alert(text);
        }
    }

    function triggerAlarm(a, idx) {
        if (a.triggered) return;
        a.triggered = true;
        saveAlarms();
        renderAlarms();
        showNotification(`Alarm: ${a.label || a.time}`);
        playBeep();
    }


    function checkAlarms(now, tz) {
        if (!alarms.length) return;
        const fmt = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz });
        const cur = fmt.format(now);
        alarms.forEach((a, idx) => {
            if (!a.triggered && a.time === cur) triggerAlarm(a, idx);
        });
    }

    function tick() {
        const now = new Date();
        const tz = prefs.tz || defaultPrefs.tz;
        if (timeEl) timeEl.textContent = formatTime(now, tz, prefs.is24);
        if (dateEl) dateEl.textContent = formatDate(now, tz);
        setHands(now, tz);
        checkAlarms(now, tz);
        requestAnimationFrame(tick);
    }

    if (tzSelect) {
        tzSelect.addEventListener('change', (e) => {
            prefs.tz = e.target.value;
            savePrefs();
        });
    }

    if (toggleFormatBtn) {
        function updateFormatButton() { toggleFormatBtn.textContent = prefs.is24 ? '24s' : '12s'; toggleFormatBtn.setAttribute('aria-pressed', String(!prefs.is24)); }
        toggleFormatBtn.addEventListener('click', () => {
            prefs.is24 = !prefs.is24;
            updateFormatButton();
            savePrefs();
        });
        updateFormatButton();
    }

    if (themeToggleBtn) {
        function updateThemeButton() { themeToggleBtn.setAttribute('aria-pressed', prefs.theme === 'dark'); }
        themeToggleBtn.addEventListener('click', () => {
            prefs.theme = prefs.theme === 'dark' ? 'light' : 'dark';
            applyTheme(prefs.theme);
            updateThemeButton();
            savePrefs();
        });
        updateThemeButton();
    }

    if (alarmForm) {
        alarmForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const t = alarmTimeInput.value;
            if (!t) return;
            alarms.push({ time: t, label: alarmLabelInput.value || '', triggered: false });
            saveAlarms();
            renderAlarms();
            alarmForm.reset();
        });
    }

    if (clearAlarmsBtn) {
        clearAlarmsBtn.addEventListener('click', () => { alarms = []; saveAlarms(); renderAlarms(); });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 't' && tzSelect) { tzSelect.focus(); tzSelect.scrollIntoView({ block: 'center' }); }
        if (e.key === 'a' && alarmTimeInput) { alarmTimeInput.focus(); }
    });


    renderAlarms();
    document.getElementById('year').textContent = new Date().getFullYear();
    savePrefs();
    tick();

    window.addEventListener('beforeunload', savePrefs);
})();
