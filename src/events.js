const eventModalEl = document.getElementById('eventModal');
const eventDescriptionEl = document.getElementById('eventDescription');
const eventTimeEl = document.getElementById('eventTime');
const addEventBtn = document.getElementById('addEvent');
const closeModalBtn = document.getElementById('closeModal');
const colorOptions = document.querySelectorAll('.color-option');

let clicked = null;

const getEvents = () => JSON.parse(localStorage.getItem('events')) || {};

const saveEvents = events => {
    localStorage.setItem('events', JSON.stringify(events));
};

let events = getEvents();

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
    saveEvents(events);
};

const renderEvents = dayEl => {
    events = getEvents();
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

const setSelectedColor = (option = colorOptions[0]) => {
    colorOptions.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
};

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        setSelectedColor(option);
    });
});

const openEventModal = dayEl => {
    clicked = dayEl;

    eventModalEl.style.display = 'block';
    eventDescriptionEl.value = '';
    eventTimeEl.value = '';
    eventDescriptionEl.classList.remove('error');
    setSelectedColor();
};

addEventBtn.addEventListener('click', () => {
    const date = clicked.dataset.key;
    const description = eventDescriptionEl.value;
    const time = eventTimeEl.value;

    if (!description) {
        eventDescriptionEl.classList.add('error');
        return;
    }

    if (!events[date]) {
        events[date] = [];
    }

    let color = colorOptions[0];
    for (const option of colorOptions) {
        if (option.classList.contains('selected')) {
            color = option.style.backgroundColor;
        }
    }

    events[date].push({ description, time, color });
    events[date].sort((a, b) => comparator(a, b));
    saveEvents(events);

    clicked.innerText = clicked.dataset.key.split('.')[0];
    renderEvents(clicked);

    eventModalEl.style.display = 'none';
});

closeModalBtn.addEventListener('click', () => {
    eventModalEl.style.display = 'none';
});

export { openEventModal, renderEvents };
