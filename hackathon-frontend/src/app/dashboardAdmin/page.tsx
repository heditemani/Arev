"use client";

import React, { useState } from 'react';
import { 
  Search, Bell, LogOut, Plus, UserCheck, 
  CalendarClock, ShieldCheck, Pencil, Trash2, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../component/SidebarAdmin/SidebarAdmin'; 
import styles from './page.module.css';

// Type definition lel Employee
interface Employee {
  id: string;
  name: string;
  initials: string;
  email: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
}

// Data el bedaya
const initialEmployees: Employee[] = [
  { id: '1', name: 'Alex Lindquist', initials: 'AL', email: 'a.lindquist@quicksync.com', status: 'Active', createdDate: 'Oct 24, 2023' },
  { id: '2', name: 'Sarah Miller', initials: 'SM', email: 'sarah.m@quicksync.com', status: 'Active', createdDate: 'Nov 12, 2023' },
  { id: '3', name: 'John Doe', initials: 'JD', email: 'j.doe@quicksync.com', status: 'Inactive', createdDate: 'Dec 05, 2023' },
];

export default function DashboardAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State mta3 el list elli bech tetbaddel
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  // State mta3 el inputs west el popup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Function bech t-talla3 initials (e.g. "Ahmed Ali" -> "AA")
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Logic ki t-cliqui "Add Employee" west el popup
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const newEmployee: Employee = {
      id: Date.now().toString(), // ID unique b-el wa9t
      name: formData.name,
      initials: getInitials(formData.name) || '??',
      email: formData.email,
      status: 'Active',
      createdDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };

    // Zid el jdid fil awwel w khalli el baki
    setEmployees([newEmployee, ...employees]);

    // Sakker el modal w nthef el form
    setIsModalOpen(false);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input type="text" placeholder="Search employees..." className={styles.searchInput} />
          </div>
          
          <div className={styles.headerActions}>
            <button className={styles.iconButton}><Bell size={20} /></button>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin" />
              </div>
              <button className={styles.logoutBtn}>Logout <LogOut size={16} /></button>
            </div>
          </div>
        </header>

        <div className={styles.contentArea}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.title}>Employee Management</h2>
              <p className={styles.subtitle}>Manage your staff accounts and system permissions</p>
            </div>
            <motion.button 
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={styles.addBtn}
            >
              <Plus size={20} /> Add Employee
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <StatCard icon={<UserCheck size={20} />} label="Total Active" value={`${employees.filter(e => e.status === 'Active').length} Staff`} trend="+2 this month" color="emerald" />
            <StatCard icon={<CalendarClock size={20} />} label="Produits" value="16" color="amber" />
            <StatCard icon={<ShieldCheck size={20} />} label="Commandes" value="52" color="blue" />
          </div>

          {/* Table Area */}
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <div>NAME</div>
              <div>EMAIL</div>
              <div>STATUS</div>
              <div>CREATED DATE</div>
              <div style={{ textAlign: 'right' }}>ACTIONS</div>
            </div>
            <div className={styles.tableBody}>
              {employees.map((emp) => (
                <div key={emp.id} className={styles.tableRow}>
                  <div className={styles.empInfo}>
                    <div className={styles.empAvatar}>{emp.initials}</div>
                    <span className={styles.empName}>{emp.name}</span>
                  </div>
                  <div className={styles.empEmail}>{emp.email}</div>
                  <div>
                    <span className={`${styles.badge} ${emp.status === 'Active' ? styles.badgeActive : styles.badgeInactive}`}>
                      {emp.status}
                    </span>
                  </div>
                  <div className={styles.empDate}>{emp.createdDate}</div>
                  <div className={styles.actions}>
                    <button className={styles.editBtn}><Pencil size={18} /></button>
                    <button className={styles.deleteBtn}><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Logic */}
        <AnimatePresence>
          {isModalOpen && (
            <div className={styles.modalOverlay}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={styles.modalContent}
              >
                <div className={styles.modalHeader}>
                  <h3>Add New Employee</h3>
                  <button onClick={() => setIsModalOpen(false)} className={styles.closeBtn}>
                    <X size={20} />
                  </button>
                </div>

                <form className={styles.modalForm} onSubmit={handleAddEmployee}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="employee@company.com" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Password</label>
                      <input 
                        type="password" 
                        placeholder="Create password" 
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Confirm Password</label>
                      <input 
                        type="password" 
                        placeholder="Confirm password" 
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className={styles.modalFooter}>
                    <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>
                      Cancel
                    </button>
                    <button type="submit" className={styles.submitBtn}>
                      Add Employee
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Helpers
function StatCard({ icon, label, value, trend, color }: any) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statTop}>
        <div className={`${styles.statIcon} ${styles[color]}`}>{icon}</div>
        {trend && <span className={styles.trend}>{trend}</span>}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}