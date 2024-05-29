import { openEventModal, renderEvents } from './events.js';

const calendarEl = document.getElementById('calendar');
const currentMonthEl = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const selectedDate = new Date();

const renderDay = (day, month, year) => {
    const dayEl = document.createElement('div');
    dayEl.classList.add('day');
    dayEl.innerText = day;
    calendarEl.appendChild(dayEl);

    const today = new Date();
    if (
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year
    ) {
        dayEl.classList.add('current-day');
    }

    const dayKey = `${day}.${month + 1}.${year}`;
    dayEl.dataset.key = dayKey;
    renderEvents(dayEl);

    dayEl.addEventListener('click', element => {
        if (element.target === dayEl) {
            openEventModal(dayEl);
        }
    });
};

const renderCalendar = () => {
    calendarEl.innerHTML = '';

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
        renderDay(day, month, year);
    }
};

prevMonthBtn.addEventListener('click', () => {
    const prevMonth = selectedDate.getMonth() - 1;
    selectedDate.setMonth(prevMonth);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    const nextMonth = selectedDate.getMonth() + 1;
    selectedDate.setMonth(nextMonth);
    renderCalendar();
});

renderCalendar();
