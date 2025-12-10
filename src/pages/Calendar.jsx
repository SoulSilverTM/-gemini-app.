import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useCalendar } from '../context/CalendarContext';

const Calendar = () => {
    const { events, addEvent, deleteEvent } = useCalendar();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState(new Date().toISOString().split('T')[0]);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (!newEventTitle.trim()) return;

        addEvent({
            title: newEventTitle,
            date: newEventDate,
            type: 'meeting'
        });

        setNewEventTitle('');
        setIsModalOpen(false);
    };

    const getEventsForDay = (day) => {
        const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
        // Adjust for timezone offset if necessary, but simple string comparison works for local dates if consistent
        // A better approach for production is using a library like date-fns
        // Here we construct the date string manually to match the input format YYYY-MM-DD
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const checkDate = `${year}-${month}-${dayStr}`;

        return events.filter(event => event.date === checkDate);
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Calendar</h1>
                    <p className="text-white/60">Manage your schedule and events</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                >
                    <Plus size={20} />
                    <span>New Event</span>
                </button>
            </div>

            <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <div className="flex space-x-2">
                        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-white/60 font-medium py-2">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-4">
                    {blanks.map((blank) => (
                        <div key={`blank-${blank}`} className="h-32 rounded-xl bg-white/5 opacity-50"></div>
                    ))}
                    {days.map((day) => {
                        const dayEvents = getEventsForDay(day);
                        return (
                            <div key={day} className="h-32 rounded-xl bg-white/5 border border-white/5 p-3 hover:border-white/20 transition-colors cursor-pointer group relative overflow-y-auto">
                                <span className={clsx(
                                    "w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mb-1",
                                    day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()
                                        ? "bg-blue-600 text-white"
                                        : "text-white/60 group-hover:text-white"
                                )}>
                                    {day}
                                </span>
                                <div className="space-y-1">
                                    {dayEvents.map(event => (
                                        <div key={event.id} className="group/event relative p-1.5 rounded bg-purple-500/20 text-purple-300 text-xs truncate">
                                            {event.title}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }}
                                                className="absolute right-1 top-1/2 -translate-y-1/2 text-red-400 opacity-0 group-hover/event:opacity-100 hover:text-red-300"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Add Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1a1f2e] p-6 rounded-2xl border border-white/10 w-full max-w-md m-4">
                        <h2 className="text-xl font-bold text-white mb-4">Add New Event</h2>
                        <form onSubmit={handleAddEvent} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Event Title</label>
                                <input
                                    type="text"
                                    value={newEventTitle}
                                    onChange={(e) => setNewEventTitle(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Enter event title"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Date</label>
                                <input
                                    type="date"
                                    value={newEventDate}
                                    onChange={(e) => setNewEventDate(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                                >
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
