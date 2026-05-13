"use client";

import React, { useState, useEffect } from 'react';
import SidebarTable from '../component/sidebarTable/sidebartable'; // Path hasb image_641bc0.png
import { Search, Bell, RotateCcw, HelpCircle, Lock, Plus } from 'lucide-react';
import styles from './floorplan.module.css';

const tables = [
  { id: 'T01', status: 'occupied', pers: 4, time: '45 min' },
  { id: 'T02', status: 'available', pers: 2, time: '' },
  { id: 'T03', status: 'bill', pers: 6, time: '1h 20' },
  { id: 'T04', status: 'occupied', pers: 2, time: '15 min' },
  { id: 'T05', status: 'available', pers: 4, time: '' },
  { id: 'T06', status: 'available', pers: 8, time: '' },
  { id: 'T07', status: 'occupied', pers: 4, time: '30 min' },
  { id: 'T08', status: 'bill', pers: 2, time: '55 min' },
  { id: 'T09', status: 'occupied', pers: 2, time: '10 min' },
  { id: 'T10', status: 'available', pers: 4, time: '' },
];

export default function FloorPlanPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className={styles.wrapper}>
      <SidebarTable />

      <main className={styles.main}>
        {/* Topbar kima fi image_641c02.png */}
        <header className={styles.topbar}>
          <h2>Plan de salle</h2>
          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input type="text" placeholder="Rechercher une table..." />
          </div>
          <div className={styles.topActions}>
            <Bell size={20} />
            <RotateCcw size={20} />
            <HelpCircle size={20} />
            <div className={styles.userInfo}>
              <p>Jean Dupont</p>
              <span>Manager</span>
            </div>
            <button className={styles.lockBtn}><Lock size={16} /> Lock Screen</button>
          </div>
        </header>

        <div className={styles.content}>
          {/* Top Stats */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}><span>Occupancy</span> <h3>74%</h3></div>
            <div className={styles.statCard}><span>Available Tables</span> <h3>8</h3></div>
            <div className={styles.statCard}><span>Active Orders</span> <h3>14</h3></div>
            <div className={styles.statCard}><span>Pending Bills</span> <h3>3</h3></div>
          </div>

          {/* Floor Map Area */}
          <div className={styles.floorMap}>
            <div className={styles.tabs}>
              <button className={styles.activeTab}>Salle Principale</button>
              <button>Terrasse</button>
              <button>Bar</button>
            </div>

            <div className={styles.grid}>
              {tables.map((table) => (
                <div key={table.id} className={`${styles.tableCard} ${styles[table.status]}`}>
                  <div className={styles.tableHeader}>
                    <span className={styles.tableId}>{table.id}</span>
                    {table.status === 'bill' ? '🧾' : '👤'}
                  </div>
                  <div className={styles.tableBody}>
                    <p className={styles.statusText}>
                      {table.status === 'occupied' ? 'OCCUPÉE' : table.status === 'available' ? 'DISPONIBLE' : 'FACTURE'}
                    </p>
                    <span className={styles.details}>{table.pers} Pers {table.time && `• ${table.time}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className={styles.newShiftBtn}><Plus size={18} /> New Shift</button>
      </main>
    </div>
  );
}