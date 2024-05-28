const eventModalEl = document.getElementById('eventModal');
const eventDescriptionEl = document.getElementById('eventDescription');
const eventTimeEl = document.getElementById('eventTime');
const addEventBtn = document.getElementById('addEvent');
const closeModalBtn = document.getElementById('closeModal');
const colorOptions = document.querySelectorAll('.color-option');

let clicked = null;
let events = JSON.parse(localStorage.getItem('events')) || {};

const deleteEvent = (event, eventEl) => {
    const date = eventEl.dataset.key;
    const description = event.description;
    const time = event.time;
    const color = event.color;

    events[date] = events[date].filter(
        event =>
            event.description !== description ||
            event.time !== time ||
            event.color !== color
    );

    if (events[date].length === 0) {
        delete events[date];
    }

    eventEl.remove();
    localStorage.setItem('events', JSON.stringify(events));
};

const renderEvents = dayEl => {
    events = JSON.parse(localStorage.getItem('events')) || {};
    const dayEvents = events[dayEl.dataset.key] || [];

    for (const event of dayEvents) {
        const eventEl = document.createElement('div');
        eventEl.classList.add('event');
        eventEl.style.backgroundColor = event.color;

        eventEl.innerHTML = `<span class="event-time">${
            event.time ? `${event.time}` : ''
        }</span><span class="event-description">${event.description}</span>`;

        dayEl.appendChild(eventEl);

        eventEl.dataset.key = dayEl.dataset.key;
        eventEl.addEventListener('click', () => {
            deleteEvent(event, eventEl);
        });
    }
};

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

const setColor = (option = colorOptions[0]) => {
    colorOptions.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
};

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        setColor(option);
    });
});

const openEventModal = dayEl => {
    eventModalEl.style.display = 'block';
    clicked = dayEl;
};

addEventBtn.addEventListener('click', () => {
    const date = clicked.dataset.key;
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

    let color = '#d7d7d7';
    for (const option of colorOptions) {
        if (option.classList.contains('selected')) {
            setColor();
            color = option.style.backgroundColor;
        }
    }

    events[date].push({ description, time, color });
    events[date].sort((a, b) => comparator(a, b));

    eventDescriptionEl.value = '';
    eventTimeEl.value = '';
    eventModalEl.style.display = 'none';
    localStorage.setItem('events', JSON.stringify(events));

    clicked.innerText = clicked.dataset.key.split('.')[0];
    renderEvents(clicked);
});

closeModalBtn.addEventListener('click', () => {
    eventDescriptionEl.value = '';
    eventTimeEl.value = '';
    eventModalEl.style.display = 'none';
    setColor();
    eventDescriptionEl.classList.remove('error');
});

export { openEventModal, renderEvents };
