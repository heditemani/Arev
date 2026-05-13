"use client";

import React from 'react';
import { LayoutDashboard, Users, Package, Grid2X2, BarChart3, Settings, LifeBuoy } from 'lucide-react';
import styles from './SidebarAdmin.module.css';

interface SidebarProps {
  activePage?: string;
}

export default function SidebarAdmin({ activePage = 'products' }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2 className={styles.logoTitle}>POS Master</h2>
        <p className={styles.logoSub}>Administrator</p>
      </div>

      <nav className={styles.nav}>
        <a href="#" className={`${styles.link} ${activePage === 'dashboard' ? styles.active : ''}`}>
          <LayoutDashboard size={18} /> Dashboard
        </a>
        <a href="#" className={`${styles.link} ${activePage === 'employees' ? styles.active : ''}`}>
          <Users size={18} /> Employees
        </a>
        <a href="#" className={`${styles.link} ${activePage === 'products' ? styles.active : ''}`}>
          <Package size={18} /> Products
        </a>
        <a href="#" className={`${styles.link} ${activePage === 'categories' ? styles.active : ''}`}>
          <Grid2X2 size={18} /> Categories
        </a>
        <a href="#" className={`${styles.link} ${activePage === 'statistics' ? styles.active : ''}`}>
          <BarChart3 size={18} /> Sales Statistics
        </a>
      </nav>

      <div className={styles.footerNav}>
        <a href="#" className={styles.link}><Settings size={18} /> Settings</a>
        <a href="#" className={styles.link}><LifeBuoy size={18} /> Support</a>
        
        <div className={styles.userProfile}>
          <img src="https://ui-avatars.com/api/?name=Alex+Rivera&background=0D8ABC&color=fff" alt="user" />
          <div>
            <p className={styles.userName}>Alex Rivera</p>
            <p className={styles.userRole}>Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}