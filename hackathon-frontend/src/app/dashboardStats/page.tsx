"use client";

import React from 'react';
import SidebarAdmin from '../component/SidebarAdmin/SidebarAdmin';
import { 
  Search, Bell, User, Download, Calendar, 
  TrendingUp, TrendingDown, Minus, ArrowUpRight 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import styles from './stats.module.css';

// Data lel Line Chart
const salesData = [
  { name: 'Mon', sales: 1200, trans: 800 },
  { name: 'Tue', sales: 1900, trans: 1200 },
  { name: 'Wed', sales: 1500, trans: 1000 },
  { name: 'Thu', sales: 2200, trans: 1500 },
  { name: 'Fri', sales: 1800, trans: 1300 },
  { name: 'Sat', sales: 2800, trans: 2000 },
  { name: 'Sun', sales: 3500, trans: 2400 },
];

// Data lel Donut Chart
const staffData = [
  { name: 'Sarah J.', value: 45, color: '#10b981' },
  { name: 'Michael K.', value: 30, color: '#065f46' },
  { name: 'Elena R.', value: 25, color: '#d1fae5' },
];

export default function StatisticsDashboard() {
  return (
    <div className={styles.wrapper}>
      <SidebarAdmin activePage="statistics" />

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.searchBar}>
            <Search size={16} />
            <input type="text" placeholder="Search analytics..." />
          </div>
          <div className={styles.topIcons}>
            <div className={styles.refreshTag}>● Auto-refreshing in 30s</div>
            <Bell size={20} />
            <User size={20} />
            <button className={styles.logoutBtn}>Logout</button>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.headerText}>
              <h1>Statistics Dashboard</h1>
              <p>Real-time performance metrics for RetailSync POS.</p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.dateBtn}><Calendar size={16} /> Last 30 Days</button>
              <button className={styles.exportBtn}><Download size={16} /> Export PDF</button>
            </div>
          </div>

          {/* Metrics Row */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.iconBox}>💵</div>
                <span className={styles.trendUp}>+12% <ArrowUpRight size={14}/></span>
              </div>
              <p className={styles.metricLabel}>Today's Sales</p>
              <h3>$4,280.50</h3>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.iconBox}>📅</div>
                <span className={styles.trendStable}>Stable <Minus size={14}/></span>
              </div>
              <p className={styles.metricLabel}>This Week</p>
              <h3>$28,450.00</h3>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.iconBox}>📊</div>
                <span className={styles.trendDown}>-2% <TrendingDown size={14}/></span>
              </div>
              <p className={styles.metricLabel}>This Month</p>
              <h3>$104,200.15</h3>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.iconBox}>📦</div>
                <span className={styles.totalItems}>1,240 Total</span>
              </div>
              <p className={styles.metricLabel}>Total Products</p>
              <h3>452 SKUs</h3>
            </div>
          </div>

          {/* Charts Row */}
          <div className={styles.chartsGrid}>
            <div className={styles.chartCard}>
              <h4>Weekly Sales Trend</h4>
              <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <YAxis hide />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                    <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="trans" stroke="#cbd5e1" strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.donutCard}>
              <h4>Staff Contribution</h4>
              <div className={styles.donutArea}>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={staffData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {staffData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.donutCenter}>
                  <p>$4.2k</p>
                  <span>Total Today</span>
                </div>
              </div>
              <div className={styles.donutLegend}>
                {staffData.map((s) => (
                  <div key={s.name} className={styles.legendItem}>
                    <span style={{background: s.color}}></span>
                    <p>{s.name}</p>
                    <span className={styles.legendVal}>{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}