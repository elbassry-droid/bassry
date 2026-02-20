
export interface ExamGrade {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface Note {
  id: string;
  title: string;
  price: number;
  grade: string;
}

export interface Caravan {
  id: string;
  title: string;
  date: string;
  price: number;
  grade: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  groupId?: string;
  phone: string;
  parentPhone: string;
  balance: number;
  isExempted: boolean;
  grades: ExamGrade[];
  attendance: string[]; 
  paidMonths: string[]; 
  purchasedNotes: string[]; // IDs of purchased notes
  payments: { [monthKey: string]: number }; 
  sessionAttendance: { [monthKey: string]: boolean[] };
  sessionRecitation: { [monthKey: string]: (boolean | null)[] }; // New: Recitation status (true=good, false=bad, null=none)
  caravans?: { [caravanId: string]: { paid: boolean, attended?: boolean, paidAmount?: number } };
  notes?: string;
}

export interface ClassGroup {
  id: string;
  name: string;
  grade: string;
  schedule: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
  paymentMethod?: 'cash' | 'vodafone_cash';
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
  deviceId?: string; // New: To lock the account to a single device
  displayName?: string; 
  logo?: string; 
  phone?: string; 
}

export type ViewState = 'dashboard' | 'students' | 'classes' | 'finance' | 'attendance-scanner' | 'ai-insights' | 'users' | 'quizzes' | 'notes' | 'settings' | 'caravans';
