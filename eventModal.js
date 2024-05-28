import { renderCalendar } from './calendar.js';

const eventModalEl = document.getElementById('eventModal');
const eventDescriptionEl = document.getElementById('eventDescription');
const eventTimeEl = document.getElementById('eventTime');
const addEventBtn = document.getElementById('addEvent');
const closeModalBtn = document.getElementById('closeModal');

let events = {};
let day = null;

const comparator = (a, b) => {
    if (a.time) {
        if (b.time) {
            return a.time.localeCompare(b.time);
        } else {
            return 1;
        }
    } else {
        return -1;
    }
};

const openModal = x => {
    eventModalEl.style.display = 'block';
    events = JSON.parse(localStorage.getItem('events')) || {};
    day = x;
};

addEventBtn.addEventListener('click', () => {
    const date = day;
    const description = eventDescriptionEl.value;
    const time = eventTimeEl.value;

    if (!description) {
        eventDescriptionEl.classList.add('error');
        return;
    }

    eventDescriptionEl.classList.remove('error');

    if (!events[date]) {
        events[date] = [];
    }

    events[date].push({ description, time });
    events[date].sort((a, b) => comparator(a, b));

    eventDescriptionEl.value = '';
    eventTimeEl.value = '';
    eventModalEl.style.display = 'none';

    localStorage.setItem('events', JSON.stringify(events));
    renderCalendar();
});

closeModalBtn.addEventListener('click', () => {
    eventDescriptionEl.value = '';
    eventTimeEl.value = '';
    eventModalEl.style.display = 'none';
    eventDescriptionEl.classList.remove('error');
});

export { openModal };
