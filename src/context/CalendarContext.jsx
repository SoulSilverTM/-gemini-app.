import { createContext, useState, useContext, useEffect } from 'react';

const CalendarContext = createContext();

const initialEvents = [
    { id: 1, title: 'Team Meeting', date: new Date().toISOString().split('T')[0], type: 'meeting' },
    { id: 2, title: 'Project Deadline', date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], type: 'deadline' },
];

export const CalendarProvider = ({ children }) => {
    const [events, setEvents] = useState(() => {
        const storedEvents = localStorage.getItem('erp_events');
        return storedEvents ? JSON.parse(storedEvents) : initialEvents;
    });

    useEffect(() => {
        localStorage.setItem('erp_events', JSON.stringify(events));
    }, [events]);

    const addEvent = (event) => {
        setEvents([...events, { ...event, id: Date.now() }]);
    };

    const deleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <CalendarContext.Provider value={{ events, addEvent, deleteEvent }}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendar = () => useContext(CalendarContext);
