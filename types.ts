
import React from 'react';

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  attendance: number; // percentage
  feesStatus: 'Paid' | 'Pending' | 'Overdue';
  gpa: number;
  lastExam: string;
  parentsName: string;
  photo: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  experience: string;
  assignedClasses: string[];
  status: 'Active' | 'On Leave';
  photo: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  avgAttendance: number;
  feesCollected: number;
  totalFees: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
