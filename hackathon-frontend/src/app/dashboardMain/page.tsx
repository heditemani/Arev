"use client";

import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../component/SidebarAdmin/SidebarAdmin';
import { 
  Search, Bell, LogOut, Plus, 
  ShoppingBag, Users, AlertTriangle, TrendingUp 
} from 'lucide-react';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import styles from './dashboard.module.css';

const data = [
  { name: 'Mon', sales: 400, amt: 240 },
  { name: 'Tue', sales: 700, amt: 210 },
  { name: 'Wed', sales: 500, amt: 290 },
  { name: 'Thu', sales: 900, amt: 200 },
  { name: 'Fri', sales: 600, amt: 250 },
  { name: 'Sat', sales: 1100, amt: 210 },
  { name: 'Sun', sales: 1000, amt: 250 },
];

export default function MainDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className={styles.wrapper}>
      <SidebarAdmin activePage="dashboard" />

      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input type="text" placeholder="Search orders, products..." />
          </div>
          <div className={styles.topActions}>
            <Bell size={20} className={styles.icon} />
            <button className={styles.logoutBtn}>Logout</button>
          </div>
        </header>

        <div className={styles.content}>
          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <ShoppingBag className={styles.cardIcon} />
                <span className={styles.badge}>↗ 12%</span>
              </div>
              <p>Daily Revenue</p>
              <h3>$4,285.50</h3>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <ShoppingBag className={styles.cardIcon} color="#8b5cf6" />
                <span className={styles.badge}>↗ 8%</span>
              </div>
              <p>Total Orders</p>
              <h3>142</h3>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <AlertTriangle className={styles.cardIcon} color="#ef4444" />
                <span className={`${styles.badge} ${styles.danger}`}>Critical</span>
              </div>
              <p>Low Stock Alerts</p>
              <h3>12</h3>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <Users className={styles.cardIcon} color="#10b981" />
                <span className={`${styles.badge} ${styles.success}`}>Active</span>
              </div>
              <p>Active Staff</p>
              <h3>8</h3>
            </div>
          </div>

          <div className={styles.middleGrid}>
            {/* Sales Overview Chart */}
            <div className={styles.chartContainer}>
              <div className={styles.chartHeader}>
                <h4>Sales Overview</h4>
                <select><option>Last 7 Days</option></select>
              </div>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <ComposedChart data={data}>
                    <CartesianGrid stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#d1fae5" radius={[4, 4, 0, 0]} barSize={40} />
                    <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.activityCard}>
              <h4>Recent Activity</h4>
              <ul className={styles.activityList}>
                <li>
                  <span className={styles.dot} style={{background: '#10b981'}}></span>
                  <div>
                    <p>New product added</p>
                    <small>2 mins ago</small>
                  </div>
                </li>
                <li>
                  <span className={styles.dot} style={{background: '#10b981'}}></span>
                  <div>
                    <p>Employee clocked in</p>
                    <small>15 mins ago</small>
                  </div>
                </li>
                <li>
                  <span className={styles.dot} style={{background: '#ef4444'}}></span>
                  <div>
                    <p>Low stock alert</p>
                    <small>1 hour ago</small>
                  </div>
                </li>
              </ul>
              <button className={styles.viewAll}>View All Activity</button>
            </div>
          </div>

          <div className={styles.bottomGrid}>
            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <h4>Quick Actions</h4>
              <div className={styles.actionBtns}>
                <button><Plus size={20} /> Add Product</button>
                <button><Users size={20} /> Add Staff</button>
                <button><TrendingUp size={20} /> View Reports</button>
                <button><Plus size={20} /> POS Settings</button>
              </div>
            </div>

            {/* Latest Orders */}
            <div className={styles.ordersTable}>
              <div className={styles.tableHeader}>
                <h4>Latest Orders</h4>
                <button className={styles.viewAll}>View All Orders</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#ORD-8924</td>
                    <td>Walk-in Customer</td>
                    <td>$45.50</td>
                    <td><span className={styles.statusPaid}>Completed</span></td>
                  </tr>
                  <tr>
                    <td>#ORD-8923</td>
                    <td>Elena Rodriguez</td>
                    <td>$128.00</td>
                    <td><span className={styles.statusPaid}>Paid</span></td>
                  </tr>
                </tbody>
              </table>
              <button className={styles.fab}><Plus size={24} color="white" /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}