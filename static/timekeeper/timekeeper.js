const KEY = 'timekeeper.v1.0';
const THEME_KEY = 'theme';

const store = JSON.parse(localStorage.getItem(KEY) || '{}');

const detectedZone =
  Intl.DateTimeFormat().resolvedOptions().timeZone ||
  'UTC';

store.zones ||= [detectedZone, 'UTC'];
store.alerts ||= [15, 5, 1];
store.history ||= [];

store.hours ??= 0;
store.minutes ??= 0;
store.seconds ??= 0;

const $ = (id) => document.getElementById(id);

let interval;
let audioContext;
let finalAlertInterval = null;

const zoneOptions = [
  ['Los Angeles, United States — Pacific Time', 'America/Los_Angeles', 'los angeles la san francisco california pacific usa united states'],
  ['Phoenix, United States — Mountain Time', 'America/Phoenix', 'phoenix arizona mountain usa united states'],
  ['Denver, United States — Mountain Time', 'America/Denver', 'denver colorado mountain usa united states'],
  ['Chicago, United States — Central Time', 'America/Chicago', 'chicago illinois central usa united states'],
  ['New York, United States — Eastern Time', 'America/New_York', 'new york ny eastern usa united states'],
  ['Terre Haute, United States — Eastern Time', 'America/Indiana/Indianapolis', 'terre haute indiana eastern usa united states'],
  ['Anchorage, United States — Alaska Time', 'America/Anchorage', 'anchorage alaska usa united states'],
  ['Honolulu, United States — Hawaii Time', 'Pacific/Honolulu', 'honolulu hawaii usa united states'],
  ['Vancouver, Canada — Pacific Time', 'America/Vancouver', 'vancouver canada british columbia pacific'],
  ['Toronto, Canada — Eastern Time', 'America/Toronto', 'toronto canada ontario eastern'],
  ['Mexico City, Mexico — Central Time', 'America/Mexico_City', 'mexico city central'],
  ['São Paulo, Brazil — Brasília Time', 'America/Sao_Paulo', 'sao paulo brazil brasilia'],
  ['Buenos Aires, Argentina — Argentina Time', 'America/Argentina/Buenos_Aires', 'buenos aires argentina'],
  ['UTC — Coordinated Universal Time', 'UTC', 'utc universal coordinated gmt'],
  ['London, United Kingdom — UK Time', 'Europe/London', 'london uk united kingdom england britain british'],
  ['Paris, France — Central European Time', 'Europe/Paris', 'paris france europe central european cet'],
  ['Berlin, Germany — Central European Time', 'Europe/Berlin', 'berlin germany deutschland europe central european cet'],
  ['Rome, Italy — Central European Time', 'Europe/Rome', 'rome italy italia europe central european cet'],
  ['Madrid, Spain — Central European Time', 'Europe/Madrid', 'madrid spain espana europe central european cet'],
  ['Warsaw, Poland — Central European Time', 'Europe/Warsaw', 'warsaw poland europe central european cet'],
  ['Kyiv, Ukraine — Eastern European Time', 'Europe/Kyiv', 'kyiv kiev ukraine ukrainian europe eastern european eet'],
  ['Moscow, Russia — Moscow Time', 'Europe/Moscow', 'moscow russia russian moscow time'],
  ['Istanbul, Türkiye — Türkiye Time', 'Europe/Istanbul', 'istanbul turkey turkiye europe'],
  ['Dubai, United Arab Emirates — Gulf Time', 'Asia/Dubai', 'dubai uae united arab emirates gulf'],
  ['Delhi, India — India Standard Time', 'Asia/Kolkata', 'delhi india kolkata ist'],
  ['Bangkok, Thailand — Indochina Time', 'Asia/Bangkok', 'bangkok thailand'],
  ['Singapore — Singapore Time', 'Asia/Singapore', 'singapore'],
  ['Hong Kong — Hong Kong Time', 'Asia/Hong_Kong', 'hong kong china'],
  ['Shanghai, China — China Standard Time', 'Asia/Shanghai', 'shanghai china beijing'],
  ['Tokyo, Japan — Japan Standard Time', 'Asia/Tokyo', 'tokyo japan japanese jst'],
  ['Seoul, South Korea — Korea Standard Time', 'Asia/Seoul', 'seoul korea south korean kst'],
  ['Perth, Australia — Western Australia Time', 'Australia/Perth', 'perth australia western'],
  ['Adelaide, Australia — Central Australia Time', 'Australia/Adelaide', 'adelaide australia central'],
  ['Sydney, Australia — Eastern Australia Time', 'Australia/Sydney', 'sydney australia eastern'],
  ['Auckland, New Zealand — New Zealand Time', 'Pacific/Auckland', 'auckland new zealand nz'],
];

function save() {
  localStorage.setItem(KEY, JSON.stringify(store));
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

function setupTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  setTheme(savedTheme || 'light');

  $('themeToggle').onclick = () => {
    const current = document.documentElement.dataset.theme;

    setTheme(current === 'dark' ? 'light' : 'dark');
  };
}

function offset(zone, date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    timeZoneName: 'longOffset',
  }).formatToParts(date);

  return (
    parts.find((part) => part.type === 'timeZoneName')
      ?.value
      ?.replace('GMT', 'UTC') || 'UTC+00:00'
  );
}

function optionLabel(zone) {
  const found = zoneOptions.find((option) => option[1] === zone);
  const label = found ? found[0] : zone;

  return `${label} (${offset(zone)})`;
}

function formatDateTime(date, zone) {
  const d = new Intl.DateTimeFormat(undefined, {
    timeZone: zone,
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

  const t = new Intl.DateTimeFormat(undefined, {
    timeZone: zone,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }).format(date);

  return { d, t };
}

function fullTime(date, zone) {
  const { d, t } = formatDateTime(date, zone);
  return `${d} ${t}`;
}

function durationSeconds() {
  const hours = Number($('hours')?.value || 0);
  const minutes = Number($('minutes')?.value || 0);
  const seconds = Number($('seconds')?.value || 0);

  return Math.max(
    1,
    hours * 3600 + minutes * 60 + seconds
  );
}

function proposedEnd() {
  return new Date(Date.now() + durationSeconds() * 1000);
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return audioContext;
}

function tone(frequency, at, duration, volume) {
  const ctx = ensureAudio();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, at);

  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(volume, at + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);

  oscillator.connect(gain).connect(ctx.destination);

  oscillator.start(at);
  oscillator.stop(at + duration + 0.02);
}

const sound = {
  chime(count, at) {
    const ctx = ensureAudio();
    const t = at ?? ctx.currentTime;
    for (let i = 0; i < count; i++) {
      tone(396, t + i * 0.7, 0.45, 0.2);
    }
    return t + count * 0.7;
  },

  pip(count, minutes, at) {
    const ctx = ensureAudio();
    const t = at ?? ctx.currentTime;
    const freq = 639 + (10 - Math.min(minutes, 10)) * 9;
    for (let i = 0; i < count; i++) {
      tone(freq, t + i * 0.333, 0.2, 0.18);
    }
  },


  reminderAlert(minutes) {
    const ctx = ensureAudio();
    const chimes = Math.floor(minutes / 10);
    const pips = minutes % 10;
    let t = ctx.currentTime;

    if (chimes > 0) t = this.chime(chimes, t);
    if (chimes > 0 && pips > 0) t += 0.2;
    if (pips > 0) this.pip(pips, minutes, t);
  },

  playEndPhrase() {
    const ctx = ensureAudio();
    tone(880, ctx.currentTime, 0.16, 0.2);
    tone(660, ctx.currentTime + 0.23, 0.16, 0.2);
    tone(880, ctx.currentTime + 0.46, 0.22, 0.2);
  },

  startEndSignal() {
    if (finalAlertInterval) return;
    this.playEndPhrase();
    finalAlertInterval = setInterval(() => this.playEndPhrase(), 2000);
  },

  stopEndSignal() {
    if (!finalAlertInterval) return;
    clearInterval(finalAlertInterval);
    finalAlertInterval = null;
  },
};

function flashAlert() {
  const timer = $('timer');

  timer.classList.add('alert');

  setTimeout(() => {
    timer.classList.remove('alert');
  }, 1600);
}

function renderTimeCell(cell, date, zone) {
  const { d, t } = formatDateTime(date, zone);
  cell.className = 'time-cell';
  cell.innerHTML = `<span class="date">${d}</span><span class="time">${t}</span>`;
}

function zonePicker(zone, index) {
  const wrapper = document.createElement('div');
  const input = document.createElement('input');
  const list = document.createElement('ul');

  wrapper.className = 'zone-cell';

  input.type = 'text';
  input.className = 'zone-search';
  input.autocomplete = 'off';
  input.value = optionLabel(zone);

  input.setAttribute(
    'aria-label',
    `Time zone ${index + 1}`
  );

  list.className = 'zone-results';

  function positionList() {
    const rect = input.getBoundingClientRect();
    list.style.position = 'fixed';
    list.style.top = (rect.bottom + 3) + 'px';
    list.style.left = rect.left + 'px';
    list.style.width = rect.width + 'px';
    list.style.margin = '0';
  }

  function resetListPosition() {
    list.style.position = '';
    list.style.top = '';
    list.style.left = '';
    list.style.width = '';
    list.style.margin = '';
  }

  function drawResults(query) {
    const normalized = query.toLowerCase().trim();

    if (!normalized) {
      list.innerHTML = '';
      resetListPosition();
      return;
    }

    const matches = zoneOptions.filter(([label, id, searchTerms]) => {
      return `${label} ${id} ${searchTerms}`.toLowerCase().includes(normalized);
    });

    list.innerHTML = '';

    matches.forEach(([label, id]) => {
      const item = document.createElement('li');
      const button = document.createElement('button');

      button.type = 'button';
      button.textContent = `${label} (${offset(id)})`;

      button.onclick = () => {
        store.zones[index] = id;
        save();
        renderTable();
      };

      item.appendChild(button);
      list.appendChild(item);
    });

    positionList();
  }

  input.onfocus = () => {
    input.select();
  };

  input.oninput = () => {
    drawResults(input.value);
  };

  input.onblur = () => {
    setTimeout(() => {
      list.innerHTML = '';
      resetListPosition();
      input.value = optionLabel(store.zones[index]);
    }, 150);
  };

  wrapper.append(input, list);

  return wrapper;
}

function renderTable() {
  const body = $('zoneRows');
  const now = new Date();
  const end = proposedEnd();

  body.innerHTML = '';

  store.zones.forEach((zone, index) => {
    const row = document.createElement('tr');
    const isFirstRow = index === 0;

    const hoursCell = document.createElement('td');
    const minutesCell = document.createElement('td');
    const secondsCell = document.createElement('td');
    const zoneCell = document.createElement('td');
    const startCell = document.createElement('td');
    const endCell = document.createElement('td');
    const actionCell = document.createElement('td');

    if (isFirstRow) {
      hoursCell.innerHTML = `<input id="hours" type="number" min="0" value="${store.hours}">`;
      minutesCell.innerHTML = `<input id="minutes" type="number" min="0" value="${store.minutes}">`;
      secondsCell.innerHTML = `<input id="seconds" type="number" min="0" max="59" value="${store.seconds}">`;
    } else {
      actionCell.className = 'row-actions';
      const remove = document.createElement('button');
      remove.textContent = '−';
      remove.title = 'Remove time zone';
      remove.onclick = () => {
        store.zones.splice(index, 1);
        save();
        renderTable();
      };
      actionCell.appendChild(remove);
    }

    zoneCell.appendChild(zonePicker(zone, index));
    renderTimeCell(startCell, now, zone);
    renderTimeCell(endCell, end, zone);

    row.append(hoursCell, minutesCell, secondsCell, zoneCell, startCell, endCell, actionCell);
    body.appendChild(row);
  });

  $('hours').oninput = updateDuration;
  $('minutes').oninput = updateDuration;
  $('seconds').oninput = updateDuration;
}

function updateDuration() {
  store.hours = Number($('hours').value || 0);
  store.minutes = Number($('minutes').value || 0);
  store.seconds = Number($('seconds').value || 0);

  save();
  updateTimesOnly();
}

function updateTimesOnly() {
  if (store.active) return;

  const now = new Date();
  const end = proposedEnd();

  [...$('zoneRows').rows].forEach((row, index) => {
    const zone = store.zones[index];

    renderTimeCell(row.cells[4], now, zone);
    renderTimeCell(row.cells[5], end, zone);
  });
}

function renderAlerts() {
  $('alerts').innerHTML = store.alerts
    .map(
      (minutes, index) => `
        <label>
          <input type="checkbox" checked data-index="${index}">
          ${minutes} min
        </label>
      `
    )
    .join('');
}

function addAlert() {
  const minutes = Number($('alertInput').value);
  const valid =
    Number.isFinite(minutes) &&
    minutes > 0 &&
    !store.alerts.includes(minutes);

  if (valid) {
    store.alerts.push(minutes);
    store.alerts.sort((first, second) => second - first);
    save();
    renderAlerts();
    $('alertInput').value = '';
  } else {
    const btn = $('addAlert');
    btn.classList.add('error');
    setTimeout(() => btn.classList.remove('error'), 800);
  }
}

function removeAlert() {
  const minutes = Number($('alertInput').value);
  const index = store.alerts.indexOf(minutes);

  if (index !== -1) {
    store.alerts.splice(index, 1);
    save();
    renderAlerts();
    $('alertInput').value = '';
  } else {
    const btn = $('removeAlert');
    btn.classList.add('error');
    setTimeout(() => btn.classList.remove('error'), 800);
  }
}

function selectedAlerts() {
  return [...document.querySelectorAll('#alerts input:checked')]
    .map((checkbox) => {
      return store.alerts[Number(checkbox.dataset.index)];
    });
}

function start() {
  sound.chime(1);

  const totalSeconds = durationSeconds();
  const startedAt = new Date();

  sound.stopEndSignal();

  store.active = {
    started: startedAt.toISOString(),
    originalSeconds: totalSeconds,
    addedSeconds: 0,
    finalEnd: new Date(
      startedAt.getTime() + totalSeconds * 1000
    ).toISOString(),
    zones: [...store.zones],
    alerts: selectedAlerts(),
    played: [],
    finalAlertPlayed: false,
  };

  save();

  $('activeSection').classList.remove('hidden');
  $('result').textContent = '';

  updateActive();

  clearInterval(interval);
  interval = setInterval(updateActive, 250);
}

function updateActive() {
  if (!store.active) return;

  const active = store.active;
  const end = new Date(active.finalEnd);

  const remaining = Math.max(
    0,
    Math.ceil((end - Date.now()) / 1000)
  );

  const timer = $('timer');

  timer.textContent = `${Math.floor(remaining / 60)}:${String(
    remaining % 60
  ).padStart(2, '0')}`;

  timer.classList.toggle('end', remaining === 0);

  $('timerMeta').textContent = active.zones
    .map((zone) => `Ends ${fullTime(end, zone)}`)
    .join('\n');

  const totalSeconds = active.originalSeconds + active.addedSeconds;

  active.alerts.forEach((minutes) => {
    const shouldPlay =
      minutes * 60 < totalSeconds &&
      remaining <= minutes * 60 &&
      !active.played.includes(minutes);

    if (!shouldPlay) return;

    active.played.push(minutes);

    save();
    sound.reminderAlert(minutes);
    flashAlert();
  });

  if (remaining === 0 && !active.finalAlertPlayed) {
    active.finalAlertPlayed = true;

    save();
    sound.startEndSignal();
  }
}

function deltaText(seconds) {
  const sign = seconds < 0 ? '−' : '+';
  const absolute = Math.abs(seconds);

  return `${sign}${Math.floor(absolute / 60)}:${String(
    absolute % 60
  ).padStart(2, '0')}`;
}

function planText(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

function endTask() {
  if (!store.active) return;

  const active = store.active;
  const endedAt = new Date();
  const finalEnd = new Date(active.finalEnd);

  const delta = Math.round((endedAt - finalEnd) / 1000);

  store.history.unshift({
    started: active.started,
    ended: endedAt.toISOString(),
    originalSeconds: active.originalSeconds,
    addedSeconds: active.addedSeconds,
    finalSeconds:
      active.originalSeconds + active.addedSeconds,
    finalEnd: active.finalEnd,
    zones: active.zones,
    delta,
  });

  store.active = null;

  save();

  clearInterval(interval);
  sound.stopEndSignal();

  $('timer').className = '';

  renderHistory();

  $('result').textContent = `Result: ${deltaText(delta)}`;
}

function addFive() {
  if (!store.active) return;

  sound.stopEndSignal();

  $('timer').className = '';

  store.active.finalEnd = new Date(
    new Date(store.active.finalEnd).getTime() + 300000
  ).toISOString();

  store.active.addedSeconds += 300;
  store.active.finalAlertPlayed = false;

  save();
  updateActive();
}

function zoneLabel(zone) {
  const found = zoneOptions.find((option) => option[1] === zone);
  if (!found) return zone;
  return found[0]
    .split(' — ')[0]
    .replace('United States', 'USA')
    .replace('United Kingdom', 'UK');
}

function historyText() {
  return store.history
    .map((entry) => {
      const startDate = new Date(entry.started);
      const endDate = new Date(entry.ended);

      const zoneTimes = entry.zones
        .map((zone) => {
          const start = formatDateTime(startDate, zone);
          const end = formatDateTime(endDate, zone);
          const timeRange = start.d === end.d
            ? `${start.d}  ${start.t} → ${end.t}`
            : `${start.d} ${start.t} → ${end.d} ${end.t}`;
          return `${zoneLabel(zone)}: ${timeRange}`;
        })
        .join('\n');

      const details = [
        `Plan: ${planText(entry.originalSeconds)}`,
        entry.addedSeconds ? `Added: ${planText(entry.addedSeconds)}` : null,
        entry.addedSeconds ? `Final: ${planText(entry.finalSeconds)}` : null,
        `Result: ${deltaText(entry.delta)}`,
      ].filter(Boolean).join(' | ');

      return `${zoneTimes}\n${details}`;
    })
    .join('\n\n');
}

function renderHistory() {
  $('history').value = historyText();
}

function downloadHistory() {
  const text = historyText() || 'No history.';

  const file = new Blob([text], {
    type: 'text/plain',
  });

  const link = document.createElement('a');

  link.href = URL.createObjectURL(file);
  link.download = 'timekeeper-history.txt';

  link.click();

  URL.revokeObjectURL(link.href);
}

$('addZone').onclick = () => {
  store.zones.push('UTC');

  save();
  renderTable();
};

$('addAlert').onclick = addAlert;
$('removeAlert').onclick = removeAlert;
$('alertInput').onkeydown = (e) => { if (e.key === 'Enter') addAlert(); };

$('testSound').onclick = () => sound.playEndPhrase();

$('startBtn').onclick = start;
$('endBtn').onclick = endTask;
$('addFiveBtn').onclick = addFive;

$('copyHistory').onclick = async () => {
  await navigator.clipboard.writeText(
    $('history').value
  );
};

$('exportHistory').onclick = downloadHistory;

$('clearHistory').onclick = () => {
  if (!store.history.length) return;

  const confirmed = confirm(
    'Clear all locally stored Timekeeper history?'
  );

  if (!confirmed) return;

  store.history = [];
  save();
  renderHistory();
};

function restoreActiveTimer() {
  if (!store.active) return;

  const scheduledEnd = new Date(store.active.finalEnd);
  const ageMs = Date.now() - scheduledEnd.getTime();
  const staleAfterMs = 30 * 60 * 1000;

  if (ageMs > staleAfterMs) {
    store.active = null;
    save();
    return;
  }

  $('activeSection').classList.remove('hidden');
  updateActive();
  interval = setInterval(updateActive, 250);
}

setupTheme();

renderTable();
renderAlerts();
renderHistory();
restoreActiveTimer();

setInterval(updateTimesOnly, 1000);

