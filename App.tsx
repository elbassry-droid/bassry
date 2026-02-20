
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  LayoutDashboard, 
  Wallet, 
  Sparkles, 
  Menu, 
  X,
  Plus,
  AlertCircle,
  Printer,
  Camera,
  CheckCircle2,
  Trash2,
  UserCheck,
  Calendar,
  DollarSign,
  ArrowRight,
  QrCode,
  ArrowDownCircle,
  ArrowUpCircle,
  MessageSquare,
  FolderPlus,
  MinusCircle,
  Lock,
  LogOut,
  ShieldCheck,
  UserPlus,
  History,
  MessageSquareWarning,
  Search,
  ClipboardList,
  Edit3,
  StickyNote,
  PlusCircle,
  BadgeCheck,
  Smartphone,
  Banknote,
  Database,
  Loader2,
  Settings,
  Download,
  Upload,
  Tent,
  FlaskConical,
  Image as ImageIcon,
  BellRing,
  XCircle,
  CheckCircle,
  MessageCircle,
  KeyRound,
  PenTool,
  RotateCcw,
  Unlink
} from 'lucide-react';
import { Student, ClassGroup, Transaction, ViewState, User, ExamGrade, Note, Caravan } from './types';
import { getAIInsights } from './services/geminiService';
import { db, initDB } from './services/db';

const ADMIN_USER: User = {
  id: 'admin-main',
  username: 'bassry200809',
  password: '2008',
  role: 'admin',
  name: 'Admin',
  displayName: 'Bassry Store'
};

const MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", 
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const DAYS_AR = [
  "السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"
];

const GRADES_LIST = [
  "الصف الأول الإعدادي", "الصف الثاني الإعدادي", "الصف الثالث الإعدادي",
  "الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"
];

const EXPENSE_CATEGORIES = [
  "رواتب", "إيجار", "كهرباء", "صيانة", "نثريات", "مطبوعات", "تسويق", "أخرى"
];

const DAY_INDEX_MAP: { [key: string]: number } = {
  "الأحد": 0, "الاثنين": 1, "الثلاثاء": 2, "الأربعاء": 3, "الخميس": 4, "الجمعة": 5, "السبت": 6
};

// Function to get or create a unique device fingerprint
const getDeviceFingerprint = () => {
  let fingerprint = localStorage.getItem('app_device_fingerprint');
  if (!fingerprint) {
    fingerprint = 'dev_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('app_device_fingerprint', fingerprint);
  }
  return fingerprint;
};

const AIInsightsView = ({ students, transactions }: { students: Student[], transactions: Transaction[] }) => {
  const [insights, setInsights] = useState<{currentStatus: string, financialTips: string[], educationalTips: string[]} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
     setLoading(true);
     const result = await getAIInsights(students, transactions);
     setInsights(result);
     setLoading(false);
  };

  return (
     <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 text-center">
           <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"><Sparkles size={32}/></div>
           <h2 className="text-2xl font-black text-gray-800">تحليل الذكاء الاصطناعي</h2>
           <p className="text-gray-400 font-bold mt-2 mb-6">احصل على رؤى متعمقة حول أداء الطلاب والوضع المالي</p>
           <button onClick={handleAnalyze} disabled={loading} className="bg-amber-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-amber-100 hover:scale-[1.05] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto">
              {loading ? 'جاري التحليل...' : 'بدء التحليل الآن'}
              <Sparkles size={18} />
           </button>
        </div>

        {insights && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4">
              <div className="col-span-full bg-gray-800 text-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200">
                 <h3 className="text-xl font-black mb-4 flex items-center gap-3"><LayoutDashboard size={24}/> نظرة عامة</h3>
                 <p className="leading-relaxed font-bold opacity-90">{insights.currentStatus}</p>
              </div>
              
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm">
                 <h3 className="text-lg font-black text-amber-600 mb-6 flex items-center gap-2"><GraduationCap size={20}/> نصائح إدارية/تعليمية</h3>
                 <ul className="space-y-4">
                    {insights.educationalTips.map((tip, idx) => (
                       <li key={idx} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">{idx+1}</span>
                          <span className="text-gray-600 font-bold text-sm">{tip}</span>
                       </li>
                    ))}
                 </ul>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm">
                 <h3 className="text-lg font-black text-green-600 mb-6 flex items-center gap-2"><Wallet size={20}/> نصائح مالية</h3>
                 <ul className="space-y-4">
                    {insights.financialTips.map((tip, idx) => (
                       <li key={idx} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">{idx+1}</span>
                          <span className="text-gray-600 font-bold text-sm">{tip}</span>
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        )}
     </div>
  );
};

const App: React.FC = () => {
  const [appLoading, setAppLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<'online' | 'offline'>('offline');
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<ClassGroup[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [caravans, setCaravans] = useState<Caravan[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const scannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initApp = async () => {
      const isConnected = await initDB();
      setDbStatus(isConnected ? 'online' : 'offline');

      const loadedUsers = await db.getItem<User[]>('app_users', [ADMIN_USER]);
      const adminExists = loadedUsers.find(u => u.username === ADMIN_USER.username);
      let finalUsers = loadedUsers;
      if (!adminExists) {
        finalUsers = [...loadedUsers, ADMIN_USER];
      }
      setUsers(finalUsers);

      const savedUser = localStorage.getItem('current_user_session');
      if (savedUser) {
          const parsed = JSON.parse(savedUser);
          const validUser = finalUsers.find(u => u.id === parsed.id);
          if (validUser) {
             // Check device link on session restore
             const currentFingerprint = getDeviceFingerprint();
             if (validUser.deviceId && validUser.deviceId !== currentFingerprint) {
                localStorage.removeItem('current_user_session');
                setCurrentUser(null);
             } else {
                setCurrentUser(validUser);
             }
          }
      }

      setAppLoading(false);
    };
    initApp();
  }, []);

  useEffect(() => { 
      if(!appLoading) db.setItem('app_users', users); 
  }, [users, appLoading]);

  useEffect(() => {
    const loadUserData = async () => {
        if (!currentUser) {
            setStudents([]); setGroups([]); setTransactions([]); setNotes([]); setCaravans([]);
            setIsInitialLoadComplete(false);
            return;
        }
        
        setDataLoading(true);
        setIsInitialLoadComplete(false);
        const prefix = currentUser.id; 

        const loadedStudents = await db.getItem<Student[]>(`${prefix}_students`, []);
        const loadedGroups = await db.getItem<ClassGroup[]>(`${prefix}_groups`, []);
        const loadedTransactions = await db.getItem<Transaction[]>(`${prefix}_transactions`, []);
        const loadedNotes = await db.getItem<Note[]>(`${prefix}_notes`, []);
        const loadedCaravans = await db.getItem<Caravan[]>(`${prefix}_caravans`, []);

        setStudents(loadedStudents);
        setGroups(loadedGroups);
        setTransactions(loadedTransactions);
        setNotes(loadedNotes);
        setCaravans(loadedCaravans);
        setDataLoading(false);
        setIsInitialLoadComplete(true);
    };

    loadUserData();
    if (currentUser) {
        localStorage.setItem('current_user_session', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('current_user_session');
    }
  }, [currentUser]);

  useEffect(() => { if(currentUser && isInitialLoadComplete && !dataLoading) db.setItem(`${currentUser.id}_students`, students); }, [students, currentUser, dataLoading, isInitialLoadComplete]);
  useEffect(() => { if(currentUser && isInitialLoadComplete && !dataLoading) db.setItem(`${currentUser.id}_groups`, groups); }, [groups, currentUser, dataLoading, isInitialLoadComplete]);
  useEffect(() => { if(currentUser && isInitialLoadComplete && !dataLoading) db.setItem(`${currentUser.id}_transactions`, transactions); }, [transactions, currentUser, dataLoading, isInitialLoadComplete]);
  useEffect(() => { if(currentUser && isInitialLoadComplete && !dataLoading) db.setItem(`${currentUser.id}_notes`, notes); }, [notes, currentUser, dataLoading, isInitialLoadComplete]);
  useEffect(() => { if(currentUser && isInitialLoadComplete && !dataLoading) db.setItem(`${currentUser.id}_caravans`, caravans); }, [caravans, currentUser, dataLoading, isInitialLoadComplete]);
  
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [viewingGroupAttendance, setViewingGroupAttendance] = useState<ClassGroup | null>(null);
  const [viewingQuizGroup, setViewingQuizGroup] = useState<ClassGroup | null>(null);
  const [viewingNoteGroup, setViewingNoteGroup] = useState<ClassGroup | null>(null);
  const [viewingCaravan, setViewingCaravan] = useState<Caravan | null>(null);
  
  const [attendanceMonth, setAttendanceMonth] = useState(new Date().getMonth());
  const [attendanceYear, setAttendanceYear] = useState(new Date().getFullYear());
  const [mainStudentSearchTerm, setMainStudentSearchTerm] = useState('');
  const [studentGradeFilter, setStudentGradeFilter] = useState<string>('all');
  const [manualExtraSessions, setManualExtraSessions] = useState(0);

  const [studentForPayments, setStudentForPayments] = useState<Student | null>(null);
  const [studentForID, setStudentForID] = useState<Student | null>(null);
  const [receiptToPrint, setReceiptToPrint] = useState<{ student: Student, type: string, amount: number, date: string, details?: string } | null>(null);

  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);

  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState<ClassGroup | null>(null);

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddQuizModalOpen, setIsAddQuizModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAddCaravanModalOpen, setIsAddCaravanModalOpen] = useState(false);
  const [isRegisterStudentToCaravanModalOpen, setIsRegisterStudentToCaravanModalOpen] = useState(false);

  const [isBulkAbsenceModalOpen, setIsBulkAbsenceModalOpen] = useState(false);
  const [bulkAbsenceDate, setBulkAbsenceDate] = useState<{ dateStr: string, sessionIndex: number } | null>(null);

  const [newStudent, setNewStudent] = useState({ name: '', phone: '', parentPhone: '', grade: '', groupId: '', isExempted: false, notes: '' });
  const [newGroup, setNewGroup] = useState({ name: '', grade: '', day1: '', day2: '', time: '' });
  const [newExpense, setNewExpense] = useState({ amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] });
  const [newUserForm, setNewUserForm] = useState({ name: '', username: '', password: '' });
  
  const [newQuiz, setNewQuiz] = useState({ title: '', maxScore: '20' });
  const [newNote, setNewNote] = useState({ title: '', price: '', grade: '' });
  const [newCaravan, setNewCaravan] = useState({ title: '', date: '', price: '', grade: '' });
  const [studentToCaravan, setStudentToCaravan] = useState({ name: '', phone: '', parentPhone: '' });
  
  const [settingsForm, setSettingsForm] = useState({ displayName: '', phone: '' });
  const [passwordChangeForm, setPasswordChangeForm] = useState({ current: '', new: '', confirm: '' });

  const [monthlyAmountInputs, setMonthlyAmountInputs] = useState<{ [monthKey: string]: string }>({});
  const [monthlyPaymentMethods, setMonthlyPaymentMethods] = useState<{ [monthKey: string]: 'cash' | 'vodafone_cash' }>({});
  const [lastScannedStudent, setLastScannedStudent] = useState<Student | null>(null);
  const [scannerError, setScannerError] = useState<string | null>(null);

  const currentMonthKey = `${attendanceYear}-${attendanceMonth + 1}`;

  useEffect(() => {
    if (receiptToPrint) document.body.classList.add('print-mode-receipt');
    else document.body.classList.remove('print-mode-receipt');
    return () => document.body.classList.remove('print-mode-receipt');
  }, [receiptToPrint]);

  useEffect(() => {
    if (studentForID) document.body.classList.add('print-mode-idcard');
    else document.body.classList.remove('print-mode-idcard');
    return () => document.body.classList.remove('print-mode-idcard');
  }, [studentForID]);

  // Persistent focus for barcode scanner (High Frequency Refocus)
  useEffect(() => {
    if (activeView === 'attendance-scanner') {
      const interval = setInterval(() => {
        if (scannerInputRef.current && document.activeElement !== scannerInputRef.current) {
          scannerInputRef.current.focus();
        }
      }, 100); 
      return () => clearInterval(interval);
    }
  }, [activeView]);

  useEffect(() => {
      if(currentUser) {
          setSettingsForm({
              displayName: currentUser.displayName || currentUser.name,
              phone: currentUser.phone || ''
          });
      }
  }, [currentUser]);

  useEffect(() => {
    setManualExtraSessions(0);
  }, [viewingGroupAttendance, attendanceMonth, attendanceYear]);

  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};
    transactions.forEach(t => {
      const date = t.date;
      if (!groups[date]) groups[date] = [];
      groups[date].push(t);
    });
    return Object.keys(groups)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map(date => ({
        date,
        transactions: groups[date],
        income: groups[date].filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
        expense: groups[date].filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
      }));
  }, [transactions]);

  const generateSessionDates = (group: ClassGroup, year: number, monthIndex: number) => {
    const scheduleParts = group.schedule.split(' الساعة ')[0].split(' و ');
    const targetDays = scheduleParts.map(day => DAY_INDEX_MAP[day.trim()]).filter(d => d !== undefined);
    if (targetDays.length === 0) return []; 
    const dates = [];
    const date = new Date(year, monthIndex, 1);
    while (date.getMonth() === monthIndex) {
      if (targetDays.includes(date.getDay())) {
        dates.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const sessionDates = useMemo(() => {
    if (!viewingGroupAttendance) return [];
    return generateSessionDates(viewingGroupAttendance, attendanceYear, attendanceMonth);
  }, [viewingGroupAttendance, attendanceYear, attendanceMonth]);

  const totalSessionsToRender = useMemo(() => {
    if (!viewingGroupAttendance) return 8;
    const mKey = `${attendanceYear}-${attendanceMonth + 1}`;
    const maxInStudents = Math.max(0, ...students
        .filter(s => s.groupId === viewingGroupAttendance.id)
        .map(s => s.sessionAttendance?.[mKey]?.length || 0)
    );
    const baseCount = Math.max(8, sessionDates.length);
    return Math.max(baseCount + manualExtraSessions, maxInStudents);
  }, [sessionDates, students, viewingGroupAttendance, attendanceYear, attendanceMonth, manualExtraSessions]);


  const handlePrint = () => setTimeout(() => window.print(), 100);
  const handlePrintFinanceReport = () => {
    document.body.classList.add('print-mode-finance');
    setTimeout(() => { window.print(); setTimeout(() => document.body.classList.remove('print-mode-finance'), 1000); }, 100);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password);
    
    if (user) {
      const fingerprint = getDeviceFingerprint();
      
      // If user has a deviceId linked, compare it. Admin bypasses device locking.
      if (user.role !== 'admin' && user.deviceId && user.deviceId !== fingerprint) {
        setLoginError('هذا الحساب مربوط بجهاز آخر بالفعل. يرجى مراجعة المسؤول.');
        return;
      }

      // If no deviceId linked yet, link this device automatically
      if (user.role !== 'admin' && !user.deviceId) {
        const updatedUser = { ...user, deviceId: fingerprint };
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
        setCurrentUser(updatedUser);
      } else {
        setCurrentUser(user);
      }
      
      setLoginForm({ username: '', password: '' });
    } else {
      setLoginError('خطأ في اسم المستخدم أو كلمة المرور');
    }
  };

  const resetUserDevice = (userId: string) => {
     if (window.confirm('هل أنت متأكد من فك ارتباط الجهاز لهذا الحساب؟ سيتمكن المدرس من الدخول من أي جهاز جديد لمرة واحدة.')) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, deviceId: undefined } : u));
        alert('تم فك الارتباط بنجاح.');
     }
  };

  const handleLogout = () => {
    setCurrentUser(null); setActiveView('dashboard'); setStudents([]); setGroups([]); setTransactions([]); setIsInitialLoadComplete(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
      e.preventDefault();
      if(!currentUser) return;
      if(passwordChangeForm.current !== currentUser.password) {
          alert('كلمة المرور الحالية غير صحيحة');
          return;
      }
      if(passwordChangeForm.new.length < 3) {
          alert('كلمة المرور الجديدة قصيرة جداً');
          return;
      }
      if(passwordChangeForm.new !== passwordChangeForm.confirm) {
          alert('كلمات المرور الجديدة غير متطابقة');
          return;
      }

      const updatedUser = { ...currentUser, password: passwordChangeForm.new };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      setPasswordChangeForm({ current: '', new: '', confirm: '' });
      alert('تم تغيير كلمة المرور بنجاح');
  };

  const recordPayment = (studentId: string, monthKey: string, amount: number, method: 'cash' | 'vodafone_cash' = 'cash') => {
    if (!amount || isNaN(amount) || amount <= 0) { alert("يرجى إدخال مبلغ صحيح"); return; }
    const student = students.find(s => s.id === studentId);
    if (!student || student.paidMonths.includes(monthKey)) return;
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, paidMonths: [...s.paidMonths, monthKey], payments: { ...s.payments, [monthKey]: amount } } : s));
    const transaction: Transaction = { id: `TR${Date.now()}`, type: 'income', amount, category: 'مصاريف شهرية', date: new Date().toISOString().split('T')[0], description: `مصاريف شهر ${MONTHS_AR[parseInt(monthKey.split('-')[1]) - 1]} للطالب ${student.name}`, paymentMethod: method };
    setTransactions(prev => [transaction, ...prev]);
    setReceiptToPrint({ student, type: `مصاريف شهر ${MONTHS_AR[parseInt(monthKey.split('-')[1]) - 1]}`, amount, date: new Date().toLocaleDateString('ar-EG') });
    setMonthlyAmountInputs(prev => { const copy = {...prev}; delete copy[monthKey]; return copy; });
  };

  const sellNote = (studentId: string, noteId: string) => {
    const student = students.find(s => s.id === studentId);
    const note = notes.find(n => n.id === noteId);
    if (!student || !note) return;
    const purchased = student.purchasedNotes || [];
    if (purchased.includes(noteId)) { alert('الطالب اشترى هذه المذكرة مسبقاً'); return; }
    if (!window.confirm(`تأكيد بيع مذكرة "${note.title}" للطالب ${student.name} بمبلغ ${note.price} ج.م؟`)) return;

    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, purchasedNotes: [...(s.purchasedNotes || []), noteId] } : s));
    const transaction: Transaction = { id: `NOTE_TR${Date.now()}`, type: 'income', amount: note.price, category: 'مبيعات مذكرات', date: new Date().toISOString().split('T')[0], description: `شراء مذكرة: ${note.title} للطالب ${student.name}`, paymentMethod: 'cash' };
    setTransactions(prev => [transaction, ...prev]);
    setReceiptToPrint({ student, type: `مذكرة: ${note.title}`, amount: note.price, date: new Date().toLocaleDateString('ar-EG') });
  };

  const addNote = () => {
    if (!newNote.title || !newNote.price || !newNote.grade) return alert('يرجى ملء كافة البيانات');
    const note: Note = { id: `N${Date.now()}`, title: newNote.title, price: parseFloat(newNote.price), grade: newNote.grade };
    setNotes(prev => [...prev, note]);
    setIsAddNoteModalOpen(false);
    setNewNote({ title: '', price: '', grade: '' });
  };

  const handleRefund = (studentId: string, monthKey: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    const amount = student.payments[monthKey];
    if (!window.confirm(`هل أنت متأكد من استرداد مبلغ ${amount} ج.م للطالب عن شهر ${MONTHS_AR[parseInt(monthKey.split('-')[1]) - 1]}؟`)) return;
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const newPayments = { ...s.payments }; delete newPayments[monthKey];
      return { ...s, paidMonths: s.paidMonths.filter(m => m !== monthKey), payments: newPayments };
    }));
    const transaction: Transaction = { id: `REF${Date.now()}`, type: 'expense', amount: amount, category: 'استرداد مصاريف', date: new Date().toISOString().split('T')[0], description: `استرداد مصاريف شهر ${MONTHS_AR[parseInt(monthKey.split('-')[1]) - 1]} للطالب ${student.name}` };
    setTransactions(prev => [transaction, ...prev]);
  };

  const addExpense = () => {
    if (!newExpense.amount || !newExpense.category) { alert("يرجى ملء المبلغ والتصنيف"); return; }
    const transaction: Transaction = { id: `EX${Date.now()}`, type: 'expense', amount: parseFloat(newExpense.amount), category: newExpense.category, date: newExpense.date, description: newExpense.description || newExpense.category };
    setTransactions(prev => [transaction, ...prev]);
    setIsAddExpenseModalOpen(false);
    setNewExpense({ amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] });
  };

  const addUser = () => {
    if (!newUserForm.username || !newUserForm.password || !newUserForm.name) { alert("يرجى ملء كافة البيانات"); return; }
    if (users.some(u => u.username === newUserForm.username)) { alert("اسم المستخدم موجود بالفعل"); return; }
    const newUser: User = { id: `USER_${Date.now()}`, username: newUserForm.username, password: newUserForm.password, name: newUserForm.name, displayName: newUserForm.name, role: 'user' };
    setUsers(prev => [...prev, newUser]);
    setIsAddUserModalOpen(false);
    setNewUserForm({ name: '', username: '', password: '' });
  };

  const deleteUser = (id: string) => {
    if (id === ADMIN_USER.id) return alert('لا يمكن حذف المدير العام!');
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟ سيتم فقدان جميع البيانات المرتبطة به.')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const toggleSessionAttendance = (studentId: string, monthKey: string, sessionIndex: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const currentAttendance = (s.sessionAttendance && s.sessionAttendance[monthKey]) || [];
      const newAttendance = [...currentAttendance];
      newAttendance[sessionIndex] = !newAttendance[sessionIndex];
      return { ...s, sessionAttendance: { ...s.sessionAttendance, [monthKey]: newAttendance } };
    }));
  };

  const toggleSessionRecitation = (studentId: string, monthKey: string, sessionIndex: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const currentRecitation = (s.sessionRecitation && s.sessionRecitation[monthKey]) || [];
      const newRecitation = [...currentRecitation];
      if (newRecitation[sessionIndex] === null || newRecitation[sessionIndex] === undefined) { newRecitation[sessionIndex] = true; } 
      else if (newRecitation[sessionIndex] === true) { newRecitation[sessionIndex] = false; } 
      else { newRecitation[sessionIndex] = null; }
      return { ...s, sessionRecitation: { ...s.sessionRecitation, [monthKey]: newRecitation } };
    }));
  };

  const recordAttendance = (barcode: string) => {
    setScannerError(null);
    setLastScannedStudent(null);
    const cleanBarcode = barcode.trim();
    if (!cleanBarcode) return;
    
    const student = students.find(s => s.id === cleanBarcode || s.id.replace('ST', '') === cleanBarcode);
    if (!student) { setScannerError('كود الطالب غير صحيح أو غير مسجل'); return; }
    const today = new Date().toISOString().split('T')[0];
    if (student.attendance.includes(today)) { setScannerError('تم تسجيل حضور هذا الطالب مسبقاً اليوم'); setLastScannedStudent(student); return; }
    setStudents(prev => prev.map(s => s.id === student.id ? { ...s, attendance: [...s.attendance, today] } : s));
    setLastScannedStudent(student);
  };

  const addNewQuizToGroup = () => {
    if (!newQuiz.title || !newQuiz.maxScore) return alert('يرجى ملء بيانات الكويز');
    if (!viewingQuizGroup) return;
    const maxScoreNum = parseFloat(newQuiz.maxScore);
    const today = new Date().toLocaleDateString('ar-EG');
    const quizId = `QZ${Date.now()}`;
    setStudents(prev => prev.map(s => {
      if (s.groupId !== viewingQuizGroup.id) return s;
      const newGrade: ExamGrade = { id: quizId, title: newQuiz.title, score: 0, maxScore: maxScoreNum, date: today };
      return { ...s, grades: [...(s.grades || []), newGrade] };
    }));
    setIsAddQuizModalOpen(false);
    setNewQuiz({ title: '', maxScore: '20' });
  };

  const updateStudentQuizScore = (studentId: string, quizId: string, newScore: string) => {
    const scoreNum = parseFloat(newScore) || 0;
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return { ...s, grades: (s.grades || []).map(g => g.id === quizId ? { ...g, score: scoreNum } : g) };
    }));
  };

  const addCaravan = () => {
      if (!newCaravan.title || !newCaravan.date || !newCaravan.price || !newCaravan.grade) return alert('يرجى ملء كافة البيانات');
      const caravan: Caravan = { id: `C${Date.now()}`, title: newCaravan.title, date: newCaravan.date, price: parseFloat(newCaravan.price), grade: newCaravan.grade };
      setCaravans(prev => [...prev, caravan]);
      setIsAddCaravanModalOpen(false);
      setNewCaravan({ title: '', date: '', price: '', grade: '' });
  };

  const registerStudentToCaravan = (existingStudent?: Student) => {
      if (!viewingCaravan) return;
      let student = existingStudent;
      if (!student) {
          if (!studentToCaravan.name || !studentToCaravan.phone || !studentToCaravan.parentPhone) return alert('يرجى ملء بيانات الطالب');
          const newId = `ST${Date.now()}`;
          const newS: Student = {
              id: newId, name: studentToCaravan.name, phone: studentToCaravan.phone, parentPhone: studentToCaravan.parentPhone, grade: viewingCaravan.grade, balance: 0, isExempted: false, grades: [], attendance: [], paidMonths: [], purchasedNotes: [], payments: {}, sessionAttendance: {}, sessionRecitation: {}, caravans: {}
          };
          setStudents(prev => [...prev, newS]);
          student = newS;
      }
      setStudents(prev => prev.map(s => {
          if (s.id !== student!.id) return s;
          const caravans = s.caravans || {};
          if (caravans[viewingCaravan.id]) return s; 
          return { ...s, caravans: { ...caravans, [viewingCaravan.id]: { paid: false, attended: false, paidAmount: 0 } } };
      }));
      setIsRegisterStudentToCaravanModalOpen(false);
      setStudentToCaravan({ name: '', phone: '', parentPhone: '' });
  };

  const toggleCaravanAttendance = (studentId: string, caravanId: string) => {
      setStudents(prev => prev.map(s => {
          if (s.id !== studentId) return s;
          const caravans = { ...(s.caravans || {}) };
          if (!caravans[caravanId]) return s;
          caravans[caravanId] = { ...caravans[caravanId], attended: !caravans[caravanId].attended };
          return { ...s, caravans };
      }));
  };

  const payCaravan = (studentId: string, caravan: Caravan) => {
      const student = students.find(s => s.id === studentId);
      if (!student) return;
      if (!window.confirm(`تأكيد دفع ${caravan.price} ج.م للقافلة؟`)) return;
      setStudents(prev => prev.map(s => {
          if (s.id !== studentId) return s;
          const caravans = { ...(s.caravans || {}) };
          if (!caravans[caravan.id]) return s;
          caravans[caravan.id] = { ...caravans[caravan.id], paid: true, paidAmount: caravan.price };
          return { ...s, caravans };
      }));
      const transaction: Transaction = {
          id: `CAR_TR${Date.now()}`, type: 'income', amount: caravan.price, category: `قافلة: ${caravan.title}`, date: new Date().toISOString().split('T')[0], description: `اشتراك قافلة ${caravan.title} للطالب ${student.name}`, paymentMethod: 'cash'
      };
      setTransactions(prev => [transaction, ...prev]);
      setReceiptToPrint({ student, type: `قافلة تعليمية: ${caravan.title}`, amount: caravan.price, date: new Date().toLocaleDateString('ar-EG') });
  };

  const openEditGroupModal = (group: ClassGroup) => {
    setGroupToEdit(group);
    const parts = group.schedule.split(' الساعة ');
    const days = parts[0] ? parts[0].split(' و ') : [];
    setNewGroup({ 
        name: group.name, 
        grade: group.grade, 
        day1: days[0] || '', 
        day2: days[1] || '', 
        time: parts[1] || '' 
    });
    setIsEditGroupModalOpen(true);
  };

  const handleUpdateGroup = (e: React.FormEvent) => {
      e.preventDefault();
      if(!groupToEdit) return;
      const fullSchedule = `${newGroup.day1} و ${newGroup.day2} الساعة ${newGroup.time}`;
      setGroups(prev => prev.map(g => g.id === groupToEdit.id ? {
          ...g,
          name: newGroup.name,
          grade: newGroup.grade,
          schedule: fullSchedule
      } : g));
      setIsEditGroupModalOpen(false);
      setGroupToEdit(null);
      setNewGroup({ name: '', grade: '', day1: '', day2: '', time: '' });
  };

  const openEditStudentModal = (student: Student) => {
    setStudentToEdit(student);
    setNewStudent({ name: student.name, phone: student.phone, parentPhone: student.parentPhone, grade: student.grade, groupId: student.groupId || '', isExempted: student.isExempted, notes: student.notes || '' });
    setIsEditStudentModalOpen(true);
  };

  const handleUpdateStudent = (e: React.FormEvent) => {
      e.preventDefault();
      if(!studentToEdit) return;
      setStudents(prev => prev.map(s => s.id === studentToEdit.id ? {
          ...s,
          name: newStudent.name,
          phone: newStudent.phone,
          parentPhone: newStudent.parentPhone,
          grade: newStudent.grade,
          groupId: newStudent.groupId, 
          isExempted: newStudent.isExempted,
          notes: newStudent.notes
      } : s));
      setIsEditStudentModalOpen(false);
      setStudentToEdit(null);
      setNewStudent({ name: '', phone: '', parentPhone: '', grade: '', groupId: '', isExempted: false, notes: '' });
  };
  
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const s: Student = {
        id: `ST${Date.now()}`,
        name: newStudent.name,
        grade: newStudent.grade,
        groupId: newStudent.groupId, 
        phone: newStudent.phone,
        parentPhone: newStudent.parentPhone,
        balance: 0,
        isExempted: newStudent.isExempted,
        grades: [],
        attendance: [],
        paidMonths: [],
        purchasedNotes: [],
        payments: {},
        sessionAttendance: {},
        sessionRecitation: {},
        notes: newStudent.notes,
        caravans: {}
    };
    setStudents(prev => [...prev, s]);
    setIsAddStudentModalOpen(false);
    setNewStudent({ name: '', grade: '', groupId: '', phone: '', parentPhone: '', isExempted: false, notes: '' });
  };

  const openBulkAbsenceModal = (sessionIndex: number) => {
      const date = sessionDates[sessionIndex] || new Date();
      const dateStr = date.toLocaleDateString('ar-EG');
      setBulkAbsenceDate({ dateStr, sessionIndex });
      setIsBulkAbsenceModalOpen(true);
  };

  const SidebarLink = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button onClick={() => { setActiveView(view); setIsSidebarOpen(false); setSelectedGrade(null); setViewingGroupAttendance(null); setViewingQuizGroup(null); setViewingNoteGroup(null); setViewingCaravan(null); }} className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all ${activeView === view ? 'bg-amber-600 text-white shadow-lg shadow-amber-100' : 'text-gray-600 hover:bg-gray-100 hover:text-amber-600'}`}>
      <Icon size={20} /> <span className="font-semibold">{label}</span>
    </button>
  );

  const BackButton = ({ onClick, label = "رجوع" }: { onClick: () => void, label?: string }) => (
    <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-xl font-bold text-xs hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm">
      <ArrowRight size={16} /> <span>{label}</span>
    </button>
  );

  const MainBackToDashboard = () => (
    <div className="mb-6 no-print"><BackButton onClick={() => { setActiveView('dashboard'); setSelectedGrade(null); setViewingGroupAttendance(null); setViewingQuizGroup(null); setViewingNoteGroup(null); setViewingCaravan(null); }} label="العودة للوحة التحكم" /></div>
  );

  const VisualBarcode = ({ code }: { code: string }) => (
    <div className="flex items-end justify-center h-12 w-full bg-white p-1 gap-[2px]">
      {code.split('').map((char, i) => (<React.Fragment key={i}><div className={`h-full bg-black ${parseInt(char) % 2 === 0 ? 'w-[3px]' : 'w-[1px]'}`} /><div className="h-full bg-white w-[1px]" /></React.Fragment>))}
      <div className="h-full bg-black w-[4px]" /><div className="h-full bg-white w-[1px]" /><div className="h-full bg-black w-[1px]" />
    </div>
  );

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const paidThisMonth = students.filter(s => s.paidMonths.includes(currentMonthKey) || s.isExempted).length;
    return {
      studentCount: students.length,
      todayAttendance: students.filter(s => s.attendance.includes(new Date().toISOString().split('T')[0])).length,
      income, expenses, profit: income - expenses,
      collectionRate: students.length > 0 ? (paidThisMonth / students.length) * 100 : 0
    };
  }, [students, transactions, currentMonthKey]);

  const isAdmin = currentUser?.role === 'admin';

  const sendWhatsApp = (phone: string, message: string) => {
    const cleanPhone = phone.startsWith('0') ? '2' + phone : phone;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleExportBackup = () => {
    const backupData = { version: "1.1", timestamp: new Date().toISOString(), user: currentUser?.username, data: { students, groups, transactions, notes, caravans } };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `backup_${currentUser?.username}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const handleImportBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!window.confirm("تحذير: استعادة النسخة الاحتياطية ستقوم بحذف جميع البيانات الحالية لهذا الحساب. هل أنت متأكد؟")) { if(fileInputRef.current) fileInputRef.current.value = ''; return; }
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const content = e.target?.result as string; const parsed = JSON.parse(content);
            if (!parsed.data || !parsed.data.students) { alert("ملف غير صالح."); return; }
            setStudents(parsed.data.students || []); setGroups(parsed.data.groups || []); setTransactions(parsed.data.transactions || []); setNotes(parsed.data.notes || []); setCaravans(parsed.data.caravans || []);
            alert("تم استعادة النسخة الاحتياطية بنجاح!");
        } catch (error) { console.error("Backup import failed", error); alert("حدث خطأ أثناء قراءة الملف."); }
    };
    reader.readAsText(file);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
          const base64 = reader.result as string;
          if (currentUser) {
              const updatedUser = { ...currentUser, logo: base64 };
              setCurrentUser(updatedUser);
              setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
          }
      };
      reader.readAsDataURL(file);
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
      e.preventDefault();
      if (!currentUser) return;
      const updatedUser = { ...currentUser, displayName: settingsForm.displayName, phone: settingsForm.phone };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      alert("تم حفظ الإعدادات بنجاح");
  };

  if (appLoading) return <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4"><div className="w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center shadow-xl animate-bounce text-white"><FlaskConical size={40} /></div><div className="flex items-center gap-2 text-gray-600 font-black"><Loader2 className="animate-spin" /><span>جاري تحميل النظام...</span></div></div>;
  
  if (!currentUser) return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-right">
        <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in">
          <div className="p-12 bg-gradient-to-br from-amber-500 to-gray-600 text-white text-center">
             <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/20 shadow-lg"><FlaskConical size={40} /></div>
            <h2 className="text-2xl font-black mb-2">Bassry Store</h2>
            <p className="opacity-80 font-bold text-sm">نظام الإدارة التعليمي</p>
          </div>
          <form onSubmit={handleLogin} className="p-12 space-y-6">
            <div className="space-y-2"><label className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">اسم المستخدم</label><input required type="text" className="w-full bg-gray-50 p-5 rounded-2xl font-bold outline-none text-right border-2 border-transparent focus:border-amber-500 transition-all" placeholder="أدخل الاسم..." value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} /></div>
            <div className="space-y-2"><label className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">كلمة المرور</label><input required type="password" className="w-full bg-gray-50 p-5 rounded-2xl font-bold outline-none text-right border-2 border-transparent focus:border-amber-500 transition-all" placeholder="••••••••" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} /></div>
            {loginError && <p className="text-red-500 text-center font-bold text-sm bg-red-50 p-3 rounded-xl">{loginError}</p>}
            <button type="submit" className="w-full bg-amber-600 text-white py-5 rounded-[1.5rem] font-black shadow-xl shadow-amber-100 hover:scale-[1.02] active:scale-[0.98] transition-all">دخول النظام</button>
          </form>
        </div>
      </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-x-hidden">
      <aside className={`no-print fixed lg:static inset-y-0 right-0 w-72 bg-white border-l border-gray-100 z-50 transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center overflow-hidden">{currentUser.logo ? <img src={currentUser.logo} className="w-full h-full object-cover" /> : <FlaskConical size={24}/>}</div>
            <div><h1 className="text-lg font-bold truncate max-w-[140px]">{currentUser.displayName || currentUser.name}</h1><p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">{currentUser.role === 'admin' ? 'مدير النظام' : 'مدرس'}</p></div>
          </div>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}><X /></button>
        </div>
        <nav className="p-4 space-y-2">
            <SidebarLink view="dashboard" icon={LayoutDashboard} label="لوحة التحكم" />
            {isAdmin && <SidebarLink view="users" icon={Users} label="إدارة المستخدمين" />}
            <SidebarLink view="attendance-scanner" icon={Camera} label="ماسح الباركود" />
            <SidebarLink view="students" icon={Users} label="قائمة الطلاب" />
            <SidebarLink view="classes" icon={BookOpen} label="المجموعات" />
            <SidebarLink view="caravans" icon={Tent} label="القوافل التعليمية" />
            <SidebarLink view="quizzes" icon={ClipboardList} label="درجات الكويزات" />
            <SidebarLink view="notes" icon={StickyNote} label="المذكرات" />
            <SidebarLink view="finance" icon={Wallet} label="الحسابات المالية" />
            <SidebarLink view="ai-insights" icon={Sparkles} label="تحليل Gemini" />
          
          <div className="px-4 py-2 mt-4"><div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-bold ${dbStatus === 'online' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}><Database size={14} /><span>{dbStatus === 'online' ? 'متصل بقاعدة البيانات' : 'وضع عدم الاتصال'}</span></div></div>
          <div className="pt-8 mt-8 border-t border-gray-50 space-y-2">
             <SidebarLink view="settings" icon={Settings} label="الإعدادات والملف" />
             <button onClick={handleLogout} className="flex items-center gap-3 w-full p-4 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold"><LogOut size={20} /><span>تسجيل الخروج</span></button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="no-print bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <button className="lg:hidden p-2" onClick={() => setIsSidebarOpen(true)}><Menu /></button>
          <div className="flex items-center gap-4">
                <div className="hidden md:flex gap-3">
                    <button onClick={() => setIsAddGroupModalOpen(true)} className="px-4 py-2 bg-gray-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-gray-400"><FolderPlus size={14}/> مجموعة جديدة</button>
                    <button onClick={() => setIsAddStudentModalOpen(true)} className="px-4 py-2 bg-amber-600 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-100"><Plus size={14}/> تسجيل طالب</button>
                </div>
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}`} className="w-10 h-10 rounded-full border-2 border-amber-200" alt="profile" />
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto finance-view-content">
          {dataLoading ? <div className="text-center py-20"><Loader2 className="animate-spin mx-auto mb-4" /> جاري تحميل بياناتك...</div> : (
            <>
            {activeView === 'dashboard' && (
                <div className="space-y-8 animate-in fade-in no-print text-right">
                {isAdmin && (
                    <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center"><ShieldCheck size={24} /></div>
                            <div><h2 className="text-lg font-black text-gray-800">صلاحيات المدير</h2><p className="text-xs font-bold text-gray-500">لديك صلاحية إدارة المستخدمين الآخرين</p></div>
                        </div>
                        <button onClick={() => setActiveView('users')} className="bg-amber-600 text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg shadow-amber-200 hover:scale-[1.02] transition-all">الذهاب لإدارة المستخدمين</button>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm"><p className="text-gray-400 text-[10px] font-bold mb-1 uppercase tracking-widest">إجمالي الطلاب</p><h3 className="text-2xl font-black">{stats.studentCount}</h3></div>
                    <div className="bg-gray-700 p-6 rounded-3xl text-white shadow-xl shadow-gray-400"><p className="opacity-80 text-[10px] font-bold mb-1 uppercase tracking-widest">إجمالي الإيرادات</p><h3 className="text-2xl font-black">{stats.income} ج.م</h3></div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm"><p className="text-gray-400 text-[10px] font-bold mb-1 uppercase tracking-widest">مصروفات السنتر</p><h3 className="text-2xl font-black text-red-500">{stats.expenses} ج.م</h3></div>
                    <div className="bg-amber-600 p-6 rounded-3xl text-white shadow-xl shadow-amber-100"><p className="opacity-80 text-[10px] font-bold uppercase tracking-widest">صافي الربح</p><h3 className="text-2xl font-black">{stats.profit} ج.م</h3></div>
                </div>
                </div>
            )}

            {activeView === 'users' && isAdmin && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 no-print text-right">
                <MainBackToDashboard />
                <div className="flex justify-between items-center"><h2 className="text-2xl font-black text-gray-800">إدارة المستخدمين (المدرسين)</h2><button onClick={() => setIsAddUserModalOpen(true)} className="bg-gray-700 text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-gray-400"><UserPlus size={16}/> إضافة مدرس جديد</button></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(u => (
                    <div key={u.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm relative group">
                        {u.role !== 'admin' && (
                           <div className="absolute top-6 left-6 flex gap-2">
                              <button onClick={() => resetUserDevice(u.id)} className="text-amber-600 p-2 bg-amber-50 hover:bg-amber-600 hover:text-white rounded-xl transition-all" title="فك ارتباط الجهاز"><Unlink size={16}/></button>
                              <button onClick={() => deleteUser(u.id)} className="text-red-500 p-2 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all"><Trash2 size={16}/></button>
                           </div>
                        )}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">{u.logo ? <img src={u.logo} className="w-full h-full object-cover" /> : <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`} />}</div>
                            <div><h4 className="font-black text-gray-800">{u.name}</h4><p className={`text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'text-amber-600' : 'text-gray-500'}`}>{u.role === 'admin' ? 'مدير عام' : 'مدرس'}</p></div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col gap-2">
                            <div className="flex items-center gap-3"><div className="bg-gray-100 p-2 rounded-lg text-gray-400"><Lock size={12}/></div><p className="text-xs font-bold text-gray-500">اليوزر: <span className="text-gray-800">{u.username}</span></p></div>
                            <div className="flex items-center gap-3"><div className="bg-gray-100 p-2 rounded-lg text-gray-400"><Smartphone size={12}/></div><p className="text-[10px] font-bold text-gray-500">حالة الجهاز: <span className={u.deviceId ? "text-green-600" : "text-amber-600"}>{u.role === 'admin' ? 'غير مقيد' : (u.deviceId ? 'مربوط بجهاز' : 'بانتظار الربط')}</span></p></div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}

            {activeView === 'settings' && (
                <div className="space-y-8 animate-in fade-in no-print text-right max-w-4xl mx-auto">
                    <MainBackToDashboard />
                    <h2 className="text-2xl font-black text-gray-800">إعدادات الحساب</h2>
                    
                    <div className="bg-white p-8 rounded-[2rem] border border-amber-100 shadow-sm mb-6 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                             <div className={`p-4 rounded-2xl ${dbStatus === 'online' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}><Database size={24}/></div>
                             <div>
                                <h3 className="font-black">حالة التخزين السحابي</h3>
                                <p className="text-xs text-gray-400 font-bold">{dbStatus === 'online' ? 'جميع البيانات محمية ومخزنة سحابياً (مساحة غير محدودة نصوصياً)' : 'أنت تعمل في وضع غير متصل بالإنترنت'}</p>
                             </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center"><ImageIcon size={24}/></div>
                            <div><h3 className="text-xl font-black text-gray-800">الشعار وبيانات السنتر</h3><p className="text-gray-400 text-xs font-bold">هذه البيانات ستظهر في الإيصالات المطبوعة</p></div>
                        </div>
                        <form onSubmit={handleUpdateSettings} className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2"><label className="text-xs font-black text-gray-400">اسم السنتر (يظهر في الإيصال)</label><input className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-amber-500 text-right" value={settingsForm.displayName} onChange={e => setSettingsForm({...settingsForm, displayName: e.target.value})} placeholder="مثال: سنتر الأستاذ أحمد" /></div>
                                    <div className="space-y-2"><label className="text-xs font-black text-gray-400">رقم التواصل (يظهر في الإيصال)</label><input className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-amber-500 text-right" value={settingsForm.phone} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} placeholder="رقم الموبايل" /></div>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 w-full md:w-64">
                                    <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">{currentUser?.logo ? (<img src={currentUser.logo} className="w-full h-full object-cover" />) : (<ImageIcon size={32} className="text-gray-300" />)}</div>
                                    <input type="file" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                                    <button type="button" onClick={() => logoInputRef.current?.click()} className="text-xs font-black text-amber-600 hover:underline">{currentUser?.logo ? 'تغيير الشعار' : 'رفع شعار'}</button>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-gray-100"><button type="submit" className="bg-amber-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-amber-100 hover:scale-[1.02] transition-all w-full md:w-auto">حفظ الإعدادات</button></div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col gap-6 items-center text-center"><div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><Download size={24}/></div><div><h3 className="text-lg font-black text-gray-800">تصدير بياناتي</h3><p className="text-gray-400 font-bold text-xs mt-2">تحميل نسخة احتياطية من جميع بياناتك</p></div><button onClick={handleExportBackup} className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-xs shadow-lg hover:scale-[1.02] transition-all">تحميل الملف</button></div>
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col gap-6 items-center text-center relative"><div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center"><Upload size={24}/></div><div><h3 className="text-lg font-black text-gray-800">استعادة بياناتي</h3><p className="text-gray-400 font-bold text-xs mt-2">استرجاع البيانات من ملف (سيحذف البيانات الحالية)</p></div><input type="file" accept=".json" ref={fileInputRef} onChange={handleImportBackup} className="hidden" /><button onClick={() => fileInputRef.current?.click()} className="w-full py-3 bg-gray-700 text-white rounded-xl font-black text-xs shadow-lg hover:scale-[1.02] transition-all">رفع الملف</button></div>
                    </div>
                </div>
            )}

            {activeView === 'attendance-scanner' && (
                <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in no-print text-center">
                <MainBackToDashboard />
                <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 space-y-8" onClick={() => scannerInputRef.current?.focus()}>
                    <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner"><QrCode size={48} /></div>
                    <div><h2 className="text-3xl font-black text-gray-800">ماسح الحضور والغياب</h2><p className="text-gray-400 font-bold mt-2">النظام بانتظار مسح أي باركود الآن...</p></div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-600 transition-colors"><Camera size={24} /></div>
                        <input 
                            ref={scannerInputRef}
                            autoFocus 
                            type="text" 
                            placeholder="بانتظار المسح..." 
                            className={`w-full bg-gray-50 pr-16 pl-6 py-6 rounded-[2rem] text-center font-black text-2xl outline-none border-4 transition-all shadow-inner ${scannerError ? 'border-red-400 bg-red-50' : 'border-transparent focus:border-amber-500'}`} 
                            onKeyDown={e => { if (e.key === 'Enter') { recordAttendance((e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value = ''; } }} 
                        />
                    </div>
                    {scannerError && <div className="bg-red-50 p-6 rounded-[2rem] border-2 border-red-200 text-red-600 font-black flex items-center justify-center gap-3"><AlertCircle size={24}/> {scannerError}</div>}
                    {lastScannedStudent && !scannerError && (<div className="bg-green-50 p-8 rounded-[2.5rem] flex items-center justify-between border-2 border-green-200 animate-in bounce-in text-right"><div><p className="text-[10px] text-green-600 font-black uppercase tracking-widest mb-1">تم تسجيل الحضور بنجاح</p><h3 className="font-black text-green-800 text-xl">{lastScannedStudent.name}</h3><p className="text-sm font-bold text-green-700">{lastScannedStudent.grade}</p></div><div className="bg-green-600 text-white p-4 rounded-2xl shadow-lg shadow-green-100"><CheckCircle2 size={32}/></div></div>)}
                </div>
                </div>
            )}
            
            {activeView === 'students' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 no-print text-right">
                <MainBackToDashboard />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"><h2 className="text-2xl font-black text-gray-800">قائمة الطلاب</h2></div>
                <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
                    <button onClick={() => setStudentGradeFilter('all')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${studentGradeFilter === 'all' ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' : 'bg-transparent text-gray-500 hover:bg-gray-50'}`}>الكل</button>
                    {GRADES_LIST.map(grade => (<button key={grade} onClick={() => setStudentGradeFilter(grade)} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${studentGradeFilter === grade ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' : 'bg-transparent text-gray-500 hover:bg-gray-50'}`}>{grade}</button>))}
                </div>
                <div className="relative"><Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input type="text" placeholder="بحث عن طالب..." className="w-full bg-white border border-gray-200 py-4 pr-11 pl-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-100 font-bold text-sm shadow-sm" value={mainStudentSearchTerm} onChange={(e) => setMainStudentSearchTerm(e.target.value)} /><button onClick={() => setIsAddStudentModalOpen(true)} className="absolute left-2 top-2 bottom-2 bg-amber-600 text-white px-6 rounded-xl font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-100 hover:scale-[1.02] active:scale-[0.98] transition-all"><Plus size={16}/> تسجيل طالب</button></div>
                <div className="grid grid-cols-1 gap-4">
                    {students.filter(s => studentGradeFilter === 'all' || s.grade === studentGradeFilter).filter(s => s.name.toLowerCase().includes(mainStudentSearchTerm.toLowerCase()) || (s.phone && s.phone.includes(mainStudentSearchTerm)) || (s.parentPhone && s.parentPhone.includes(mainStudentSearchTerm)) || (s.id && s.id.includes(mainStudentSearchTerm))).map((s, idx) => (
                        <div key={s.id} className="bg-white p-5 rounded-[2rem] border border-gray-50 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-all group relative">
                        <div className="absolute top-5 left-5 md:static md:hidden"><button onClick={(e) => { e.stopPropagation(); openEditStudentModal(s); }} className="p-2 bg-gray-100 rounded-full text-gray-600"><PenTool size={16}/></button></div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center font-black text-xs">{idx + 1}</div>
                            <div className="w-14 h-14 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner">#{s.id.slice(-4)}</div>
                            <div className="text-right"><h4 className="font-bold text-gray-800 text-lg">{s.name}</h4><div className="flex flex-col gap-0.5"><p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{s.grade} — {groups.find(g => g.id === s.groupId)?.name || 'بدون مجموعة'}</p></div></div>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center items-center mt-4 md:mt-0">
                            <button onClick={() => setStudentForID(s)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-2 font-bold text-xs"><QrCode size={18}/> هوية الطالب</button>
                            <button onClick={() => sendWhatsApp(s.parentPhone, `أهلاً بك يا ولي أمر الطالب ${s.name} في ${currentUser?.displayName || 'Bassry Store'}...`)} className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"><MessageSquare size={18}/></button>
                            <button onClick={() => setStudentForPayments(s)} className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-black text-[11px] hover:bg-gray-600 hover:text-white transition-all">التحصيل المالي</button>
                            <button onClick={(e) => { e.stopPropagation(); openEditStudentModal(s); }} className="hidden md:flex p-3 text-gray-500 bg-gray-100 hover:bg-gray-600 hover:text-white rounded-xl transition-all shadow-sm" title="تعديل بيانات الطالب"><PenTool size={18}/></button>
                            <button onClick={(e) => { e.stopPropagation(); if (window.confirm('حذف الطالب؟')) setStudents(prev => prev.filter(st => st.id !== s.id)); }} className="p-3 text-red-500 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"><Trash2 size={18}/></button>
                        </div>
                        </div>
                    ))}
                </div>
                </div>
            )}

            {activeView === 'classes' && !viewingGroupAttendance && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 no-print text-right">
                <MainBackToDashboard />
                {!selectedGrade ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
                    {GRADES_LIST.map(grade => (<button key={grade} onClick={() => setSelectedGrade(grade)} className="bg-white p-12 rounded-[2.5rem] border border-gray-50 shadow-sm text-right hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative"><BookOpen size={32} className="text-gray-600 mb-6 relative" /><h3 className="text-2xl font-black text-gray-800 relative">{grade}</h3><p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-widest relative">عرض المجموعات والمواعيد</p></button>))}
                    </div>
                ) : (
                    <div className="space-y-6 animate-in slide-in-from-right-4">
                    <div className="flex items-center gap-4"><BackButton onClick={() => setSelectedGrade(null)} label="رجوع لاختيار الصف" /><h2 className="text-3xl font-black text-gray-800">{selectedGrade}</h2></div>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-print">
                        {groups.filter(g => g.grade === selectedGrade).map(g => (<button key={g.id} onClick={() => { setViewingGroupAttendance(g); }} className="flex-shrink-0 px-6 py-4 bg-white border-2 border-transparent hover:border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-right min-w-[200px] flex flex-col gap-1"><span className="font-black text-gray-900">{g.name}</span><span className="text-xs text-gray-400 font-bold">{g.schedule.split(' الساعة ')[0]}</span></button>))}
                        <button onClick={() => setIsAddGroupModalOpen(true)} className="flex-shrink-0 px-6 py-4 bg-amber-50 border-2 border-dashed border-amber-200 rounded-2xl flex items-center justify-center gap-2 text-amber-700 font-black hover:bg-amber-100 transition-all"><Plus size={18} /><span>مجموعة جديدة</span></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {groups.filter(g => g.grade === selectedGrade).map(g => (
                            <div key={g.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative group hover:shadow-xl transition-all">
                            <div className="absolute top-6 left-6 flex gap-2 z-20"><button onClick={(e) => { e.stopPropagation(); openEditGroupModal(g); }} className="text-gray-500 p-2 bg-gray-100 hover:bg-gray-600 hover:text-white rounded-xl transition-all shadow-sm"><Edit3 size={18}/></button><button onClick={(e) => { e.stopPropagation(); if(window.confirm('حذف المجموعة؟')) setGroups(prev=>prev.filter(gr=>gr.id!==g.id)); }} className="text-red-500 p-2 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"><Trash2 size={18}/></button></div>
                            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6"><Users size={24} /></div><h4 className="font-black text-xl text-gray-800 mb-2">{g.name}</h4><div className="flex items-center gap-2 text-gray-600 font-bold text-xs mb-8"><Calendar size={14} /><span>{g.schedule}</span></div><button onClick={() => { setViewingGroupAttendance(g); }} className="w-full py-4 bg-gray-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"><UserCheck size={18}/> إدارة الحضور</button>
                            </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            )}
            
            {viewingGroupAttendance && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4">
                    <div className="no-print mb-4 overflow-x-auto pb-2 border-b border-gray-100">
                         <div className="flex gap-2">
                            {groups.filter(g => g.grade === viewingGroupAttendance.grade).map(g => (
                                <button key={g.id} onClick={() => setViewingGroupAttendance(g)} className={`px-5 py-3 rounded-xl font-black text-xs whitespace-nowrap transition-all ${viewingGroupAttendance.id === g.id ? 'bg-amber-600 text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                                    {g.name}
                                </button>
                            ))}
                         </div>
                    </div>

                    <div className="flex items-center justify-between no-print">
                        <div className="flex items-center gap-4"><BackButton onClick={() => setViewingGroupAttendance(null)} label="رجوع" /><h2 className="text-2xl font-black text-gray-800">{viewingGroupAttendance.name} - إدارة الحضور</h2></div>
                        <div className="flex gap-2">
                            <button onClick={() => setManualExtraSessions(prev => prev + 1)} className="bg-green-600 text-white px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-green-700 shadow-lg shadow-green-100"><PlusCircle size={16}/> إضافة حصة جديدة</button>
                            <button onClick={() => window.print()} className="bg-gray-800 text-white px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-gray-900"><Printer size={16}/> طباعة</button>
                            <select value={attendanceMonth} onChange={(e) => setAttendanceMonth(parseInt(e.target.value))} className="bg-white border border-gray-200 rounded-xl px-4 py-2 font-bold text-xs">{MONTHS_AR.map((m, i) => <option key={i} value={i}>{m}</option>)}</select>
                        </div>
                    </div>
                    <div className="overflow-x-auto bg-white rounded-[2rem] shadow-sm border border-gray-100">
                        <table className="w-full text-right print-attendance-table">
                            <thead className="bg-gray-50 text-gray-600 text-xs font-black uppercase tracking-wider">
                                <tr>
                                    <th className="p-6 rounded-tr-[2rem]">اسم الطالب</th>
                                    {sessionDates.map((date, i) => (
                                        <th key={i} className="p-6 text-center whitespace-nowrap bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <div className="flex flex-col items-center gap-1">
                                                <span>{date.getDate()}</span>
                                                <span className="text-[9px] opacity-60">{MONTHS_AR[date.getMonth()]}</span>
                                                <button onClick={() => openBulkAbsenceModal(i)} className="text-amber-600 hover:text-amber-800 mt-1" title="إبلاغ الغياب مجمع"><BellRing size={14}/></button>
                                            </div>
                                        </th>
                                    ))}
                                    {[...Array(Math.max(0, totalSessionsToRender - sessionDates.length))].map((_, i) => (<th key={`extra-${i}`} className="p-6 text-center text-gray-300">-{i+1}-</th>))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm font-bold text-gray-700">
                                {students.filter(s => s.groupId === viewingGroupAttendance.id).map(student => {
                                    const mKey = `${attendanceYear}-${attendanceMonth + 1}`;
                                    const isPaid = student.paidMonths.includes(mKey) || student.isExempted;
                                    return (
                                    <tr key={student.id} className="hover:bg-amber-50/50 transition-colors group">
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500">{student.id.slice(-2)}</div>
                                            <div><p>{student.name}</p></div>
                                            <div className="mr-auto flex items-center gap-1">
                                                {isPaid ? (
                                                    <CheckCircle className="text-green-500" size={16} title="تم دفع الشهر" />
                                                ) : (
                                                    <div className="flex items-center gap-1">
                                                        <XCircle className="text-red-500" size={16} title="لم يتم الدفع" />
                                                        <button onClick={() => sendWhatsApp(student.parentPhone, `نود تذكيركم بسداد مصروفات شهر ${MONTHS_AR[attendanceMonth]} للطالب/ة ${student.name}`)} className="text-gray-400 hover:text-green-600"><MessageCircle size={14}/></button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        {[...Array(totalSessionsToRender)].map((_, i) => {
                                            const attended = student.sessionAttendance?.[mKey]?.[i];
                                            const recitation = student.sessionRecitation?.[mKey]?.[i];
                                            const currentDate = sessionDates[i];
                                            
                                            return (
                                                <td key={i} className="p-4 text-center">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <div className="flex items-center gap-1">
                                                            <button onClick={() => toggleSessionAttendance(student.id, mKey, i)} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${attended ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}`}>
                                                                {attended && <CheckCircle2 size={16} />}
                                                            </button>
                                                        </div>
                                                        <button onClick={() => toggleSessionRecitation(student.id, mKey, i)} className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all text-[10px] ${recitation === true ? 'bg-blue-100 text-blue-600' : recitation === false ? 'bg-red-100 text-red-600' : 'bg-transparent text-transparent hover:bg-gray-50 hover:text-gray-300'}`}>
                                                            {recitation === true ? 'جيد' : recitation === false ? 'سيء' : '-'}
                                                        </button>
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeView === 'quizzes' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 no-print text-right">
                    <MainBackToDashboard />
                    {!viewingQuizGroup ? (
                        <>
                            <h2 className="text-2xl font-black text-gray-800 mb-6">درجات الكويزات والامتحانات</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {groups.map(g => (
                                    <button key={g.id} onClick={() => setViewingQuizGroup(g)} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm text-right hover:shadow-xl transition-all group">
                                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all"><ClipboardList size={24} /></div>
                                        <h3 className="text-xl font-black text-gray-800 mb-1">{g.name}</h3>
                                        <p className="text-xs text-gray-400 font-bold">{g.grade}</p>
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4"><BackButton onClick={() => setViewingQuizGroup(null)} label="رجوع" /><h2 className="text-2xl font-black text-gray-800">{viewingQuizGroup.name} - الدرجات</h2></div>
                                <button onClick={() => setIsAddQuizModalOpen(true)} className="bg-amber-600 text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-100"><Plus size={16}/> كويز جديد</button>
                            </div>
                            <div className="overflow-x-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 p-2">
                                <table className="w-full text-right">
                                    <thead className="bg-gray-50 text-gray-600 text-xs font-black">
                                        <tr>
                                            <th className="p-6 rounded-tr-[1.5rem]">الطالب</th>
                                            {students.filter(s => s.groupId === viewingQuizGroup.id)[0]?.grades?.map(g => (
                                                <th key={g.id} className="p-6 text-center whitespace-nowrap">
                                                    <div className="flex flex-col items-center"><span>{g.title}</span><span className="text-[9px] opacity-60">Max: {g.maxScore}</span></div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-sm font-bold text-gray-700">
                                        {students.filter(s => s.groupId === viewingQuizGroup.id).map(student => (
                                            <tr key={student.id}>
                                                <td className="p-4">{student.name}</td>
                                                {student.grades.map(g => (
                                                    <td key={g.id} className="p-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <input type="number" className="w-16 bg-gray-50 border-none rounded-lg text-center font-bold focus:ring-2 focus:ring-amber-100" value={g.score} onChange={(e) => updateStudentQuizScore(student.id, g.id, e.target.value)} />
                                                            <button onClick={() => sendWhatsApp(student.parentPhone, `درجة الطالب/ة ${student.name} في ${g.title} هي: ${g.score} من ${g.maxScore}`)} className="text-gray-400 hover:text-green-600"><MessageCircle size={14}/></button>
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeView === 'notes' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 no-print text-right">
                    <MainBackToDashboard />
                    {!viewingNoteGroup ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black text-gray-800">المذكرات والمبيعات</h2>
                                <button onClick={() => setIsAddNoteModalOpen(true)} className="bg-amber-600 text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-100"><Plus size={16}/> مذكرة جديدة</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {notes.map(n => (
                                    <div key={n.id} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex items-center justify-between">
                                        <div><h4 className="font-black text-gray-800">{n.title}</h4><p className="text-xs text-gray-400 font-bold mt-1">{n.grade}</p></div>
                                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-black">{n.price} ج.م</span>
                                    </div>
                                ))}
                            </div>
                            <h3 className="text-xl font-black text-gray-800 mb-4">بيع لمجموعة</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {groups.map(g => (
                                    <button key={g.id} onClick={() => setViewingNoteGroup(g)} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm text-right hover:shadow-xl transition-all group">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><StickyNote size={24} /></div>
                                        <h3 className="text-xl font-black text-gray-800 mb-1">{g.name}</h3>
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <div className="flex items-center gap-4"><BackButton onClick={() => setViewingNoteGroup(null)} label="رجوع" /><h2 className="text-2xl font-black text-gray-800">{viewingNoteGroup.name} - بيع مذكرات</h2></div>
                            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                                    {students.filter(s => s.groupId === viewingNoteGroup.id).map(student => (
                                        <div key={student.id} className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between">
                                            <h4 className="font-bold text-gray-800">{student.name}</h4>
                                            <div className="flex gap-2">
                                                {notes.filter(n => n.grade === viewingNoteGroup.grade).map(note => {
                                                    const hasBought = student.purchasedNotes?.includes(note.id);
                                                    return (
                                                        <button key={note.id} disabled={hasBought} onClick={() => sellNote(student.id, note.id)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${hasBought ? 'bg-green-200 text-green-800 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-600 hover:border-amber-500 hover:text-amber-600'}`}>
                                                            {note.title} {hasBought && '✓'}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeView === 'caravans' && (
                <div className="space-y-8 animate-in fade-in no-print text-right">
                    <MainBackToDashboard />
                    {!viewingCaravan ? (
                        <>
                            <div className="flex justify-between items-center"><h2 className="text-2xl font-black text-gray-800">القوافل التعليمية</h2><button onClick={() => setIsAddCaravanModalOpen(true)} className="bg-amber-600 text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-100"><Plus size={16}/> قافلة جديدة</button></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {caravans.map(c => {
                                    const registeredCount = students.filter(s => s.caravans && s.caravans[c.id]).length;
                                    return (
                                        <div key={c.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative group hover:shadow-xl transition-all">
                                            <div className="absolute top-6 left-6 flex gap-2 z-20"><button onClick={(e) => { e.stopPropagation(); if(window.confirm('حذف القافلة؟')) setCaravans(prev=>prev.filter(x=>x.id!==c.id)); }} className="text-red-500 p-2 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"><Trash2 size={18}/></button></div>
                                            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6"><Tent size={24} /></div>
                                            <h4 className="font-black text-xl text-gray-800 mb-2">{c.title}</h4>
                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center gap-2 text-gray-600 font-bold text-xs"><Calendar size={14} /><span>{c.date}</span></div>
                                                <div className="flex items-center gap-2 text-gray-600 font-bold text-xs"><GraduationCap size={14} /><span>{c.grade}</span></div>
                                                <div className="flex items-center gap-2 text-green-600 font-bold text-xs"><DollarSign size={14} /><span>{c.price} ج.م</span></div>
                                            </div>
                                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl mb-6"><span className="text-[10px] font-black text-gray-400">المسجلين</span><span className="text-lg font-black text-gray-800">{registeredCount} طالب</span></div>
                                            <button onClick={() => { setViewingCaravan(c); }} className="w-full py-4 bg-gray-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"><UserCheck size={18}/> إدارة القافلة</button>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex items-center gap-4"><BackButton onClick={() => setViewingCaravan(null)} label="رجوع للقوافل" /><h2 className="text-2xl font-black text-gray-800">{viewingCaravan.title}</h2></div>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsRegisterStudentToCaravanModalOpen(true)} className="bg-amber-600 text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-100"><Plus size={16}/> تسجيل طالب</button>
                                </div>
                            </div>
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-right">
                                    <thead className="bg-gray-50 text-gray-600 text-xs font-black">
                                        <tr><th className="p-6">الطالب</th><th className="p-6">رقم الهاتف</th><th className="p-6 text-center">الدفع</th><th className="p-6 text-center">الحضور</th><th className="p-6"></th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-sm font-bold text-gray-700">
                                        {students.filter(s => s.caravans?.[viewingCaravan.id]).map(s => {
                                            const info = s.caravans![viewingCaravan.id];
                                            return (
                                                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="p-6">{s.name}</td>
                                                    <td className="p-6">{s.phone}</td>
                                                    <td className="p-6 text-center">{info.paid ? <span className="text-green-600 bg-green-50 px-3 py-1 rounded-lg text-xs font-black">تم الدفع</span> : <button onClick={() => payCaravan(s.id, viewingCaravan)} className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-black hover:bg-red-600 hover:text-white transition-all">تحصيل</button>}</td>
                                                    <td className="p-6 text-center"><button onClick={() => toggleCaravanAttendance(s.id, viewingCaravan.id)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all mx-auto ${info.attended ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-300'}`}>{info.attended && <CheckCircle2 size={16}/>}</button></td>
                                                    <td className="p-6"><button onClick={() => setStudentForID(s)} className="text-gray-400 hover:text-amber-600"><QrCode size={18}/></button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {activeView === 'finance' && (
                <div className="space-y-8 animate-in fade-in text-right">
                <MainBackToDashboard />
                <div className="no-print flex justify-between items-center">
                    <h2 className="text-2xl font-black text-gray-800">الحسابات المالية</h2>
                    <div className="flex gap-2">
                        <button onClick={handlePrintFinanceReport} className="bg-gray-800 text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg hover:bg-black transition-all"><Printer size={16}/> طباعة التقرير</button>
                        <button onClick={() => setIsAddExpenseModalOpen(true)} className="bg-amber-600 text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-100"><MinusCircle size={16}/> إضافة مصروف جديد</button>
                    </div>
                </div>
                <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-6 dashboard-stats">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex items-center gap-5"><div className="bg-green-100 text-green-600 p-5 rounded-[1.5rem]"><ArrowUpCircle size={28}/></div><div><p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">إجمالي الإيرادات</p><h4 className="text-2xl font-black text-green-600">{stats.income} ج.م</h4></div></div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex items-center gap-5"><div className="bg-red-100 text-red-600 p-5 rounded-[1.5rem]"><ArrowDownCircle size={28}/></div><div><p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">إجمالي المصروفات</p><h4 className="text-2xl font-black text-red-600">{stats.expenses} ج.م</h4></div></div>
                    <div className="bg-gray-700 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200 flex items-center gap-5 text-white"><div className="bg-white/20 p-5 rounded-[1.5rem]"><DollarSign size={28}/></div><div><p className="opacity-80 text-[10px] font-bold uppercase tracking-wider">صافي الربح المتبقي</p><h4 className="text-2xl font-black">{stats.profit} ج.م</h4></div></div>
                </div>
                <div className="finance-report-container space-y-4">
                    <div className="flex items-center gap-3 px-4 mb-4"><History className="text-gray-600" size={24} /><h3 className="text-xl font-black text-gray-800">سجل العمليات اليومي</h3></div>
                    {groupedTransactions.map(group => (
                        <div key={group.date} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 transition-all hover:shadow-md break-inside-avoid">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                                <div className="flex items-center gap-3"><div className="bg-gray-100 text-gray-600 p-2 rounded-xl"><Calendar size={20}/></div><div><h4 className="font-black text-gray-800 text-lg">{new Date(group.date).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</h4><p className="text-xs text-gray-400 font-bold dir-ltr text-right">{group.date}</p></div></div>
                                <div className="flex flex-col items-end gap-1"><div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg text-xs font-black"><ArrowUpCircle size={14}/> <span>{group.income} ج.م</span></div><div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg text-xs font-black"><ArrowDownCircle size={14}/> <span>{group.expense} ج.م</span></div></div>
                            </div>
                            <div className="space-y-3">
                                {group.transactions.map(t => (
                                    <div key={t.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{t.type === 'income' ? <ArrowUpCircle size={16}/> : <ArrowDownCircle size={16}/>}</div>
                                            <div><p className="font-bold text-gray-800 text-sm">{t.description}</p><div className="flex items-center gap-2 mt-1"><p className="text-[10px] text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded">{t.category}</p>{t.paymentMethod === 'vodafone_cash' && (<span className="text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-black flex items-center gap-1"><Smartphone size={10}/> فودافون</span>)}</div></div>
                                        </div>
                                        <span className={`font-black text-sm ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{t.type === 'income' ? '+' : '-'}{t.amount} ج.م</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}

            {activeView === 'ai-insights' && (
                <div className="space-y-6 animate-in fade-in no-print text-right"><MainBackToDashboard /><AIInsightsView students={students} transactions={transactions} /></div>
            )}
            
            </>
          )}
        </div>
      </main>

      {/* --- MODALS --- */}
      {receiptToPrint && (
        <div className="receipt-modal-container fixed inset-0 bg-black/80 z-[800] flex items-center justify-center p-4 backdrop-blur-md text-right font-sans">
          <div className="bg-white w-full max-w-sm rounded-[1.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in duration-300">
             <button onClick={() => setReceiptToPrint(null)} className="no-print absolute top-4 left-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 z-10"><X size={20}/></button>
             
             <div className="p-4 bg-white thermal-receipt text-black">
                <div className="text-center">
                   <h2 className="text-lg font-black">{currentUser?.displayName || 'Bassry Store'}</h2>
                   <p className="text-[10px] font-bold">إيصال استلام نقدية</p>
                   {currentUser?.phone && <p className="text-[10px] font-bold mt-1">ت: {currentUser.phone}</p>}
                </div>
                
                <div className="divider"></div>
                
                <div className="space-y-2">
                   <div className="flex justify-between items-center"><span className="text-[10px]">التاريخ:</span><span className="text-[10px] font-bold">{receiptToPrint.date}</span></div>
                   <div className="flex justify-between items-center"><span className="text-[10px]">الطالب:</span><span className="text-[11px] font-bold">{receiptToPrint.student.name}</span></div>
                   <div className="flex justify-between items-center"><span className="text-[10px]">المجموعة:</span><span className="text-[10px] font-bold">{groups.find(g => g.id === receiptToPrint.student.groupId)?.name || 'عام'}</span></div>
                   <div className="divider"></div>
                   <div className="text-center py-2 border-2 border-black">
                      <p className="text-[10px]">المبلغ المدفوع</p>
                      <h3 className="text-2xl font-black">{receiptToPrint.amount} ج.م</h3>
                   </div>
                   <div className="flex justify-between items-center mt-2"><span className="text-[10px]">مقابل:</span><span className="text-[10px] font-bold">{receiptToPrint.type}</span></div>
                   {receiptToPrint.details && (<div className="mt-1 border border-black p-1 text-center"><p className="text-[9px]">{receiptToPrint.details}</p></div>)}
                </div>
                
                <div className="divider"></div>
                <div className="text-center italic text-[10px]">شكراً لتعاملكم معنا</div>
             </div>

             <div className="p-5 bg-gray-50 flex gap-3 no-print border-t border-gray-100">
                <button onClick={() => window.print()} className="flex-1 bg-black text-white py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2"><Printer size={16}/> طباعة إيصال</button>
                <button onClick={() => setReceiptToPrint(null)} className="px-5 py-3 bg-gray-200 text-gray-700 rounded-xl font-black text-xs">إغلاق</button>
             </div>
          </div>
        </div>
      )}

      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[600] flex items-center justify-center p-4 backdrop-blur-md no-print text-right">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl animate-in slide-in-from-bottom-10">
            <h3 className="text-2xl font-black text-gray-600 mb-10 flex items-center gap-3"><UserPlus size={32} /> إضافة مدرس جديد</h3>
            <form onSubmit={e => { e.preventDefault(); addUser(); }} className="space-y-5">
              <input required className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none text-right" placeholder="اسم المدرس" value={newUserForm.name} onChange={e => setNewUserForm({...newUserForm, name: e.target.value})} />
              <input required className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none text-right" placeholder="اسم المستخدم" value={newUserForm.username} onChange={e => setNewUserForm({...newUserForm, username: e.target.value})} />
              <input required type="password" className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none text-right" placeholder="كلمة المرور" value={newUserForm.password} onChange={e => setNewUserForm({...newUserForm, password: e.target.value})} />
              <div className="flex gap-4 mt-6"><button type="submit" className="flex-1 bg-gray-600 text-white py-5 rounded-[1.5rem] font-black shadow-xl">حفظ</button><button type="button" onClick={() => setIsAddUserModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[1.5rem] font-black">إلغاء</button></div>
            </form>
          </div>
        </div>
      )}

      {isBulkAbsenceModalOpen && bulkAbsenceDate && viewingGroupAttendance && (
        <div className="fixed inset-0 bg-black/80 z-[800] flex items-center justify-center p-4 backdrop-blur-md text-right">
             <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => setIsBulkAbsenceModalOpen(false)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"><X size={20}/></button>
                    <div>
                        <h3 className="text-xl font-black text-gray-800 text-center">إبلاغ الغياب المجمع</h3>
                        <p className="text-xs text-gray-500 font-bold text-center mt-1">حصة يوم {bulkAbsenceDate.dateStr}</p>
                    </div>
                </div>
                <div className="overflow-y-auto flex-1 space-y-3 px-2">
                    {students
                        .filter(s => s.groupId === viewingGroupAttendance.id)
                        .filter(s => {
                            const mKey = `${attendanceYear}-${attendanceMonth + 1}`;
                            return !s.sessionAttendance?.[mKey]?.[bulkAbsenceDate.sessionIndex];
                        })
                        .map(student => (
                            <div key={student.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                                <span className="font-bold text-gray-800">{student.name}</span>
                                <button onClick={() => sendWhatsApp(student.parentPhone, `نود إبلاغكم بغياب الطالب/ة ${student.name} عن حصة يوم ${bulkAbsenceDate.dateStr}`)} className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-green-600 hover:text-white transition-all">
                                    <MessageSquareWarning size={14}/> إرسال
                                </button>
                            </div>
                        ))
                    }
                </div>
             </div>
        </div>
      )}

      {studentForID && (
          <div className="id-card-modal-container fixed inset-0 bg-black/80 z-[800] flex items-center justify-center p-4 backdrop-blur-md text-right font-sans">
              <div className="bg-white w-[85mm] h-[55mm] rounded-xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center p-4 border border-gray-200">
                  <button onClick={() => setStudentForID(null)} className="no-print absolute top-2 right-2 bg-gray-100 p-1 rounded-full"><X size={16}/></button>
                  <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">{currentUser?.logo ? <img src={currentUser.logo} className="w-full h-full object-cover rounded-full" /> : <FlaskConical size={16}/>}</div>
                    <h3 className="text-sm font-black text-gray-800">{currentUser?.displayName || 'Bassry Store'}</h3>
                  </div>
                  <h2 className="text-lg font-black text-gray-900 mb-1">{studentForID.name}</h2>
                  <p className="text-xs font-bold text-gray-500 mb-2">{studentForID.grade}</p>
                  <div className="w-full max-w-[80%] mx-auto"><VisualBarcode code={studentForID.id} /></div>
                  <p className="text-[10px] font-mono mt-1 tracking-widest">{studentForID.id}</p>
                  <button onClick={() => window.print()} className="no-print mt-2 px-4 py-1 bg-gray-800 text-white text-xs rounded-lg">طباعة</button>
              </div>
          </div>
      )}

      {isAddStudentModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[500] flex items-center justify-center p-4 no-print backdrop-blur-md text-right">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl animate-in slide-in-from-bottom-20">
            <h3 className="text-2xl font-black mb-10 text-amber-600">تسجيل طالب جديد</h3>
            <form onSubmit={handleAddStudent} className="space-y-5">
              <input required className="w-full bg-gray-50 p-5 rounded-2xl font-bold outline-none text-right" placeholder="الاسم الرباعي" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <select required className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right" value={newStudent.grade} onChange={e => setNewStudent({...newStudent, grade: e.target.value, groupId: ''})}>
                  <option value="">السنة الدراسية</option>
                  {GRADES_LIST.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <select required className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right" value={newStudent.groupId} onChange={e => setNewStudent({...newStudent, groupId: e.target.value})}>
                  <option value="">المجموعة</option>
                  {groups.filter(g => g.grade === newStudent.grade).map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
              <input required className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right" placeholder="رقم الموبايل" value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} />
              <input required className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right" placeholder="رقم ولي الأمر" value={newStudent.parentPhone} onChange={e => setNewStudent({...newStudent, parentPhone: e.target.value})} />
              <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5" checked={newStudent.isExempted} onChange={e => setNewStudent({...newStudent, isExempted: e.target.checked})} />
                  <label className="font-bold text-gray-600 text-sm">طالب معفى من المصاريف</label>
              </div>
              <textarea className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right outline-none resize-none h-32" placeholder="ملاحظات إضافية (اختياري)" value={newStudent.notes} onChange={e => setNewStudent({...newStudent, notes: e.target.value})}></textarea>
              <div className="flex gap-4 mt-6"><button type="submit" className="flex-1 bg-amber-600 text-white py-5 rounded-[1.5rem] font-black shadow-xl">حفظ الطالب</button><button type="button" onClick={() => setIsAddStudentModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[1.5rem] font-black">إلغاء</button></div>
            </form>
          </div>
        </div>
      )}

      {isEditStudentModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[500] flex items-center justify-center p-4 no-print backdrop-blur-md text-right">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl animate-in slide-in-from-bottom-20">
            <h3 className="text-2xl font-black mb-10 text-gray-700">تعديل بيانات طالب</h3>
            <form onSubmit={handleUpdateStudent} className="space-y-5">
              <input required className="w-full bg-gray-50 p-5 rounded-2xl font-bold outline-none text-right" placeholder="الاسم الرباعي" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <select required className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right" value={newStudent.grade} onChange={e => setNewStudent({...newStudent, grade: e.target.value, groupId: ''})}>
                  <option value="">السنة الدراسية</option>
                  {GRADES_LIST.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <select required className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right" value={newStudent.groupId} onChange={e => setNewStudent({...newStudent, groupId: e.target.value})}>
                  <option value="">المجموعة</option>
                  {groups.filter(g => g.grade === newStudent.grade).map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
              <input required className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right" placeholder="رقم الموبايل" value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} />
              <input required className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right" placeholder="رقم ولي الأمر" value={newStudent.parentPhone} onChange={e => setNewStudent({...newStudent, parentPhone: e.target.value})} />
              <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5" checked={newStudent.isExempted} onChange={e => setNewStudent({...newStudent, isExempted: e.target.checked})} />
                  <label className="font-bold text-gray-600 text-sm">طالب معفى من المصاريف</label>
              </div>
              <textarea className="w-full bg-gray-50 p-5 rounded-2xl font-bold text-right outline-none resize-none h-32" placeholder="ملاحظات إضافية (اختياري)" value={newStudent.notes} onChange={e => setNewStudent({...newStudent, notes: e.target.value})}></textarea>
              <div className="flex gap-4 mt-6"><button type="submit" className="flex-1 bg-gray-700 text-white py-5 rounded-[1.5rem] font-black shadow-xl">حفظ التعديلات</button><button type="button" onClick={() => setIsEditStudentModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[1.5rem] font-black">إلغاء</button></div>
            </form>
          </div>
        </div>
      )}

      {isAddGroupModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[600] flex items-center justify-center p-4 backdrop-blur-md no-print text-right">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl animate-in slide-in-from-bottom-10">
            <h3 className="text-2xl font-black text-gray-600 mb-10 flex items-center gap-3"><FolderPlus size={32} /> مجموعة جديدة</h3>
            <form onSubmit={e => {
              e.preventDefault();
              if (!newGroup.name || !newGroup.grade || !newGroup.day1 || !newGroup.day2 || !newGroup.time) { alert("يرجى ملء كافة البيانات"); return; }
              const fullSchedule = `${newGroup.day1} و ${newGroup.day2} الساعة ${newGroup.time}`;
              setGroups(prev => [...prev, { id: `g${Date.now()}`, name: newGroup.name, grade: newGroup.grade, schedule: fullSchedule }]);
              setIsAddGroupModalOpen(false);
              setNewGroup({ name: '', grade: '', day1: '', day2: '', time: '' });
            }} className="space-y-5">
              <input required className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none text-right" placeholder="اسم المجموعة" value={newGroup.name} onChange={e => setNewGroup({...newGroup, name: e.target.value})} />
              <select required className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-right" value={newGroup.grade} onChange={e => setNewGroup({...newGroup, grade: e.target.value})}><option value="">اختر الصف</option>{GRADES_LIST.map(g => <option key={g} value={g}>{g}</option>)}</select>
              <div className="grid grid-cols-2 gap-4">
                 <select required className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-xs text-right" value={newGroup.day2} onChange={e => setNewGroup({...newGroup, day2: e.target.value})}><option value="">اليوم الثاني</option>{DAYS_AR.map(d => <option key={d} value={d}>{d}</option>)}</select>
                 <select required className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-xs text-right" value={newGroup.day1} onChange={e => setNewGroup({...newGroup, day1: e.target.value})}><option value="">اليوم الأول</option>{DAYS_AR.map(d => <option key={d} value={d}>{d}</option>)}</select>
              </div>
              <input required className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-sm outline-none text-right" placeholder="الوقت (مثال: 4 عصرًا)" value={newGroup.time} onChange={e => setNewGroup({...newGroup, time: e.target.value})} />
              <div className="flex gap-4 mt-6"><button type="submit" className="flex-1 bg-gray-600 text-white py-5 rounded-[1.5rem] font-black shadow-xl">حفظ المجموعة</button><button type="button" onClick={() => setIsAddGroupModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[1.5rem] font-black">إلغاء</button></div>
            </form>
          </div>
        </div>
      )}

      {isAddQuizModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-[600] flex items-center justify-center p-4 backdrop-blur-md no-print text-right">
              <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl animate-in slide-in-from-bottom-10">
                  <h3 className="text-2xl font-black text-gray-600 mb-10 flex items-center gap-3"><ClipboardList size={32} /> إضافة كويز جديد</h3>
                  <form onSubmit={e => { e.preventDefault(); addNewQuizToGroup(); }} className="space-y-5">
                      <input required className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none text-right" placeholder="عنوان الكويز" value={newQuiz.title} onChange={e => setNewQuiz({...newQuiz, title: e.target.value})} />
                      <input required type="number" className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none text-right" placeholder="الدرجة العظمى" value={newQuiz.maxScore} onChange={e => setNewQuiz({...newQuiz, maxScore: e.target.value})} />
                      <div className="flex gap-4 mt-6"><button type="submit" className="flex-1 bg-amber-600 text-white py-5 rounded-[1.5rem] font-black shadow-xl">حفظ</button><button type="button" onClick={() => setIsAddQuizModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[1.5rem] font-black">إلغاء</button></div>
                  </form>
              </div>
          </div>
      )}

      {isAddExpenseModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-[600] flex items-center justify-center p-4 backdrop-blur-md no-print text-right">
              <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl animate-in slide-in-from-bottom-10">
                  <h3 className="text-2xl font-black text-gray-600 mb-10 flex items-center gap-3"><MinusCircle size={32} /> تسجيل مصروف</h3>
                  <form onSubmit={e => { e.preventDefault(); addExpense(); }} className="space-y-5">
                      <input required type="number" className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none text-right" placeholder="المبلغ" value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: e.target.value})} />
                      <select required className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-right" value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})}>
                          <option value="">نوع المصروف</option>
                          {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none text-right" placeholder="الوصف (اختياري)" value={newExpense.description} onChange={e => setNewExpense({...newExpense, description: e.target.value})} />
                      <input required type="date" className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none text-right" value={newExpense.date} onChange={e => setNewExpense({...newExpense, date: e.target.value})} />
                      <div className="flex gap-4 mt-6"><button type="submit" className="flex-1 bg-red-500 text-white py-5 rounded-[1.5rem] font-black shadow-xl">حفظ</button><button type="button" onClick={() => setIsAddExpenseModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[1.5rem] font-black">إلغاء</button></div>
                  </form>
              </div>
          </div>
      )}

      {studentForPayments && (
        <div className="fixed inset-0 bg-black/80 z-[500] flex items-center justify-center p-4 backdrop-blur-md no-print text-right">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in">
             <div className="p-10 bg-amber-600 text-white flex justify-between items-center"><button onClick={() => setStudentForPayments(null)} className="bg-white/20 p-3 rounded-2xl hover:bg-white/40"><X size={24}/></button><div><h3 className="text-2xl font-black">{studentForPayments.name}</h3></div></div>
             <div className="p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[50vh] overflow-y-auto pr-2">
                  {MONTHS_AR.map((m, idx) => {
                    const mKey = `${attendanceYear}-${idx + 1}`;
                    const isPaid = studentForPayments.paidMonths.includes(mKey);
                    const currentInput = monthlyAmountInputs[mKey] || "";
                    const currentMethod = monthlyPaymentMethods[mKey] || 'cash';
                    return (
                      <div key={mKey} className={`p-6 rounded-[2.5rem] border-2 transition-all flex flex-col gap-4 ${isPaid ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex justify-between items-center">{isPaid && <span className="text-[10px] font-black text-green-600 bg-green-100 px-3 py-1 rounded-full">تم التحصيل</span>}<span className="text-sm font-black">{m}</span></div>
                        {isPaid ? (
                           <div className="flex flex-col gap-2">
                               <div className="bg-white p-4 rounded-2xl border border-green-100 text-center"><p className="text-[10px] text-gray-400 font-bold mb-1">المبلغ المدفوع</p><h4 className="text-xl font-black text-green-600">{studentForPayments.payments[mKey]} ج.م</h4></div>
                               <button onClick={() => handleRefund(studentForPayments.id, mKey)} className="w-full bg-red-50 text-red-600 py-3 rounded-2xl text-[10px] font-black flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all"><RotateCcw size={14}/> استرداد المبلغ</button>
                           </div>
                        ) : (
                           <div className="space-y-4">
                              <input type="number" className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-center font-black text-lg outline-none" placeholder="المبلغ..." value={currentInput} onChange={(e) => setMonthlyAmountInputs(prev => ({ ...prev, [mKey]: e.target.value }))} />
                              <div className="flex gap-2 justify-center">
                                  <button onClick={() => setMonthlyPaymentMethods(prev => ({ ...prev, [mKey]: 'cash' }))} className={`flex items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${currentMethod === 'cash' ? 'bg-green-100 text-green-700 ring-2 ring-green-200' : 'bg-gray-100 text-gray-400'}`}><Banknote size={12}/> نقدي</button>
                                  <button onClick={() => setMonthlyPaymentMethods(prev => ({ ...prev, [mKey]: 'vodafone_cash' }))} className={`flex items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${currentMethod === 'vodafone_cash' ? 'bg-red-100 text-red-700 ring-2 ring-red-200' : 'bg-gray-100 text-gray-400'}`}><Smartphone size={12}/> فودافون</button>
                              </div>
                              <button onClick={() => recordPayment(studentForPayments.id, mKey, parseInt(currentInput), currentMethod)} className="w-full bg-amber-600 text-white py-4 rounded-2xl text-[10px] font-black">تأكيد التحصيل</button>
                           </div>
                        )}
                      </div>
                    );
                  })}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;