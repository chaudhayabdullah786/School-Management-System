
import React from 'react';

export const COLORS = {
  primary: '#4f46e5',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

export const Icons = {
  Dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 9.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-7.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  ),
  Students: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
  ),
  Teachers: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  ),
  Attendance: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  ),
  Fees: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
    </svg>
  ),
  AI: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
  Exams: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
    </svg>
  ),
  Timetable: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  ),
  Communication: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
    </svg>
  ),
  Reports: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A1 1 0 0111.293 2.293l4.414 4.414a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  ),
};

export const MOCK_STUDENTS: any[] = [
  { id: '1', name: 'Alex Thompson', rollNumber: '101', class: '10', section: 'A', attendance: 92, feesStatus: 'Paid', gpa: 3.8, lastExam: 'Mathematics (95/100)', parentsName: 'Sarah Thompson', photo: 'https://picsum.photos/seed/alex/100' },
  { id: '2', name: 'Maria Garcia', rollNumber: '102', class: '10', section: 'A', attendance: 88, feesStatus: 'Pending', gpa: 3.5, lastExam: 'History (82/100)', parentsName: 'Juan Garcia', photo: 'https://picsum.photos/seed/maria/100' },
  { id: '3', name: 'James Wilson', rollNumber: '103', class: '10', section: 'B', attendance: 75, feesStatus: 'Overdue', gpa: 2.4, lastExam: 'Biology (65/100)', parentsName: 'Robert Wilson', photo: 'https://picsum.photos/seed/james/100' },
  { id: '4', name: 'Emily Chen', rollNumber: '104', class: '11', section: 'A', attendance: 98, feesStatus: 'Paid', gpa: 4.0, lastExam: 'Physics (99/100)', parentsName: 'David Chen', photo: 'https://picsum.photos/seed/emily/100' },
  { id: '5', name: 'Liam O’Connor', rollNumber: '105', class: '9', section: 'C', attendance: 82, feesStatus: 'Paid', gpa: 3.1, lastExam: 'English (78/100)', parentsName: 'Siobhan O’Connor', photo: 'https://picsum.photos/seed/liam/100' },
];

export const MOCK_TEACHERS: any[] = [
  { id: 't1', name: 'Dr. Sarah Miller', subject: 'Mathematics', experience: '12 Years', assignedClasses: ['10A', '11B'], status: 'Active', photo: 'https://picsum.photos/seed/sarah/100' },
  { id: 't2', name: 'Prof. Robert Black', subject: 'Physics', experience: '15 Years', assignedClasses: ['12A', '12B'], status: 'Active', photo: 'https://picsum.photos/seed/robert/100' },
];

export const MOCK_TIMETABLE = [
  { time: '08:00 AM', mon: 'Mathematics', tue: 'History', wed: 'Physics', thu: 'Biology', fri: 'English' },
  { time: '09:00 AM', mon: 'Mathematics', tue: 'English', wed: 'Chemistry', thu: 'History', fri: 'Mathematics' },
  { time: '10:00 AM', mon: 'Break', tue: 'Break', wed: 'Break', thu: 'Break', fri: 'Break' },
  { time: '11:00 AM', mon: 'Physics', tue: 'Chemistry', wed: 'Mathematics', thu: 'English', fri: 'Biology' },
  { time: '12:00 PM', mon: 'English', tue: 'Mathematics', wed: 'History', thu: 'Physics', fri: 'Chemistry' },
];

export const MOCK_ANNOUNCEMENTS = [
  { id: '1', title: 'Annual Sports Meet 2023', content: 'The annual sports meet is scheduled for next Friday. All students must wear their house jerseys.', date: 'Oct 20, 2023', type: 'Event' },
  { id: '2', title: 'Parent-Teacher Meeting', content: 'Term 1 progress report discussion will be held this Saturday from 9 AM to 12 PM.', date: 'Oct 18, 2023', type: 'Academic' },
  { id: '3', title: 'Library Renovation', content: 'The school library will be closed for maintenance until further notice.', date: 'Oct 15, 2023', type: 'Notice' },
];
