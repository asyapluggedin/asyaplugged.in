const KEY = 'timekeeper.v1';
const THEME_KEY = 'theme';

const store = JSON.parse(localStorage.getItem(KEY) || '{}');

const detectedZone =
  Intl.DateTimeFormat().resolvedOptions().timeZone ||
  'UTC';

store.zones ||= [detectedZone];
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
  ['Chicago, United States — Central Time', 'America/Chicago', 'chicago illinois terre haute indiana central usa united states'],
  ['New York, United States — Eastern Time', 'America/New_York', 'new york ny eastern usa united states'],
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

  const systemTheme = matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
    ? 'dark'
    : 'light';

  setTheme(savedTheme || systemTheme);

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

function dateLine(date, zone) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone: zone,
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function timeLine(date, zone) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone: zone,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

function fullTime(date, zone) {
  return `${dateLine(date, zone)} ${timeLine(date, zone)}`;
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
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    audioContext = new AudioContextClass();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return audioContext;
}

function tone(
  frequency,
  at,
  duration = 0.16,
  volume = 0.18,
  type = 'triangle'
) {
  const context = ensureAudio();

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, at);

  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(volume, at + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);

  oscillator.connect(gain).connect(context.destination);

  oscillator.start(at);
  oscillator.stop(at + duration + 0.02);
}

function playBeepCount(count) {
  const context = ensureAudio();
  const beeps = Math.min(Math.max(1, count), 20);

  for (let index = 0; index < beeps; index += 1) {
    tone(880, context.currentTime + index * 0.27);
  }
}

function playFinalPhrase() {
  const context = ensureAudio();

  tone(880, context.currentTime, 0.16, 0.2, 'sine');
  tone(660, context.currentTime + 0.23, 0.16, 0.2, 'sine');
  tone(880, context.currentTime + 0.46, 0.22, 0.2, 'sine');
}

function startFinalAlert() {
  if (finalAlertInterval) return;

  playFinalPhrase();
  finalAlertInterval = setInterval(playFinalPhrase, 2000);
}

function stopFinalAlert() {
  if (!finalAlertInterval) return;

  clearInterval(finalAlertInterval);
  finalAlertInterval = null;
}

function flashAlert() {
  const timer = $('timer');

  timer.classList.add('alert');

  setTimeout(() => {
    const active =
      store.active &&
      new Date(store.active.finalEnd) > new Date();

    if (active) {
      timer.classList.remove('alert');
    }
  }, 1600);
}

function renderTimeCell(cell, date, zone) {
  cell.className = 'time-cell';

  cell.innerHTML = `
    <span class="date">${dateLine(date, zone)}</span>
    <span class="time">${timeLine(date, zone)}</span>
  `;
}

function zonePicker(zone, index) {
  const wrapper = document.createElement('div');
  const input = document.createElement('input');
  const list = document.createElement('ul');

  wrapper.className = 'zone-cell';

  input.type = 'search';
  input.className = 'zone-search';
  input.autocomplete = 'off';
  input.value = optionLabel(zone);

  input.setAttribute(
    'aria-label',
    `Time zone ${index + 1}`
  );

  list.className = 'zone-results';

  function drawResults(query) {
    const normalized = query.toLowerCase().trim();

    const matches = normalized
      ? zoneOptions.filter(([label, id, searchTerms]) => {
          const searchable =
            `${label} ${id} ${searchTerms}`.toLowerCase();

          return searchable.includes(normalized);
        })
      : zoneOptions.slice(0, 8);

    list.innerHTML = '';

    matches.slice(0, 10).forEach(([label, id]) => {
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
  }

  input.onfocus = () => {
    input.select();
    drawResults('');
  };

  input.oninput = () => {
    drawResults(input.value);
  };

  input.onblur = () => {
    setTimeout(() => {
      list.innerHTML = '';
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

    row.innerHTML = isFirstRow
      ? `
        <td>
          <input id="hours" type="number" min="0" value="${store.hours}">
        </td>
        <td>
          <input id="minutes" type="number" min="0" value="${store.minutes}">
        </td>
        <td>
          <input id="seconds" type="number" min="0" max="59" value="${store.seconds}">
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      `
      : `
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="row-actions"></td>
      `;

    row.children[3].appendChild(zonePicker(zone, index));

    renderTimeCell(row.children[4], now, zone);
    renderTimeCell(row.children[5], end, zone);

    if (!isFirstRow) {
      const remove = document.createElement('button');

      remove.textContent = '−';
      remove.title = 'Remove time zone';

      remove.onclick = () => {
        store.zones.splice(index, 1);
        save();
        renderTable();
      };

      row.lastElementChild.appendChild(remove);
    }

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
  renderTable();
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
  const entered = prompt('Alert time in minutes:', '3');
  const minutes = Number(entered);

  const valid =
    Number.isFinite(minutes) &&
    minutes > 0 &&
    !store.alerts.includes(minutes);

  if (!valid) return;

  store.alerts.push(minutes);
  store.alerts.sort((first, second) => second - first);

  save();
  renderAlerts();
}

function selectedAlerts() {
  return [...document.querySelectorAll('#alerts input:checked')]
    .map((checkbox) => {
      return store.alerts[Number(checkbox.dataset.index)];
    });
}

function start() {
  ensureAudio();
  playBeepCount(1);

  const totalSeconds = durationSeconds();
  const startedAt = new Date();

  stopFinalAlert();

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

  active.alerts.forEach((minutes) => {
    const shouldPlay =
      remaining <= minutes * 60 &&
      !active.played.includes(minutes);

    if (!shouldPlay) return;

    active.played.push(minutes);

    save();
    playBeepCount(minutes);
    flashAlert();
  });

  if (remaining === 0 && !active.finalAlertPlayed) {
    active.finalAlertPlayed = true;

    save();
    startFinalAlert();
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

  const originalMinutes = active.originalSeconds / 60;

  const grace = Math.min(
    10,
    Math.max(2, originalMinutes * 0.2)
  );

  const outcome =
    delta <= grace * 60
      ? 'SUCCESS'
      : 'FAILURE';

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
    grace,
    outcome,
  });

  store.active = null;

  save();

  clearInterval(interval);
  stopFinalAlert();

  $('timer').className = '';

  renderHistory();

  $('result').textContent = [
    `Result: ${deltaText(delta)}`,
    `Outcome: ${outcome}`,
  ].join('\n');
}

function addFive() {
  if (!store.active) return;

  stopFinalAlert();

  $('timer').className = '';

  store.active.finalEnd = new Date(
    new Date(store.active.finalEnd).getTime() + 300000
  ).toISOString();

  store.active.addedSeconds += 300;
  store.active.finalAlertPlayed = false;

  save();
  updateActive();
}

function historyText() {
  return store.history
    .map((entry) => {
      const zoneTimes = entry.zones
        .map((zone) => {
          const start = fullTime(
            new Date(entry.started),
            zone
          );

          const end = fullTime(
            new Date(entry.ended),
            zone
          );

          return `${zone}: ${start} → ${end}`;
        })
        .join(' | ');

      const details = [
        `Plan: ${planText(entry.originalSeconds)}`,
        `Added: ${planText(entry.addedSeconds)}`,
        `Final: ${planText(entry.finalSeconds)}`,
        `Result: ${deltaText(entry.delta)}`,
        entry.outcome,
      ].join(' | ');

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

$('testSound').onclick = () => {
  ensureAudio();
  playFinalPhrase();
};

$('startBtn').onclick = start;
$('endBtn').onclick = endTask;
$('addFiveBtn').onclick = addFive;

$('copyHistory').onclick = async () => {
  await navigator.clipboard.writeText(
    $('history').value
  );
};

$('exportHistory').onclick = downloadHistory;

setupTheme();

renderTable();
renderAlerts();
renderHistory();

if (store.active) {
  $('activeSection').classList.remove('hidden');

  updateActive();

  interval = setInterval(updateActive, 250);
}

setInterval(updateTimesOnly, 1000);