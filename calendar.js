import { openModal } from './eventModal.js';

const calendarEl = document.getElementById('calendar');
const currentMonthEl = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const selectedDate = new Date();

const renderCalendar = () => {
    const events = JSON.parse(localStorage.getItem('events')) || {};

    calendarEl.innerHTML = '';
    const today = new Date();
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    currentMonthEl.innerText = selectedDate.toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
    });

    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < startOffset; i++) {
        const emptyEl = document.createElement('div');
        calendarEl.appendChild(emptyEl);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day');
        dayEl.innerText = day;
        calendarEl.appendChild(dayEl);

        if (
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year
        ) {
            dayEl.classList.add('current-day');
        }

        const dayKey = `${day}.${month + 1}.${year}`;
        const dayEvents = events[dayKey] || [];
        for (const event of dayEvents) {
            const eventEl = document.createElement('div');
            eventEl.classList.add('event');
            eventEl.innerHTML = `<span class="event-time">${
                event.time ? `${event.time}` : ''
            }</span><span class="event-description">${
                event.description
            }</span>`;
            dayEl.appendChild(eventEl);

            eventEl.addEventListener('click', () => {
                const date = dayKey;
                const description = event.description;
                const time = event.time;

                events[date] = events[date].filter(
                    event =>
                        event.description !== description || event.time !== time
                );
                if (events[date].length === 0) {
                    delete events[date];
                }

                localStorage.setItem('events', JSON.stringify(events));
                renderCalendar();
            });
        }

        dayEl.addEventListener('click', el => {
            if (el.target === dayEl) {
                openModal(dayKey);
            }
        });
    }
};

prevMonthBtn.addEventListener('click', () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();

export { renderCalendar };
