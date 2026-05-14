"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  Calculator,
  UserCircle
} from "lucide-react";
import styles from "./SidebarSuperAdmin.module.css";

const SidebarSuperAdmin = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState({
    username: "Utilisateur",
    role: "Admin"
  });

  useEffect(() => {
    // Njibou el data mel localStorage
    const storedUsername = localStorage.getItem("username") || "";
    const storedRole = localStorage.getItem("userRole") || "ADMIN";
    
    setUserData({
      username: storedUsername,
      role: storedRole
    });
  }, []);

  // Function bech n'verifiw el active link
  const isActive = (path: string) => pathname === path;

  return (
    <aside className={styles.sidebar}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>Q</div>
        <div>
          <div className={styles.logoTitle}>QuickPOS</div>
          <div className={styles.logoSubtitle}>SAAS CORE</div>
        </div>
      </div>

      {/* User Card - Dynamique tawa */}
      <div className={styles.userCard}>
        <div className={styles.userMain}>
          <div className={styles.avatar}>
            {userData.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className={styles.userName}>{userData.username}</div>
            <div className={styles.userRole}>{userData.role.toLowerCase()}</div>
          </div>
        </div>
        <span className={styles.badge}>
          {userData.role === "SUPERADMIN" ? "S.ADM" : "ADM"}
        </span>
      </div>

      {/* Navigation */}
      <nav className={styles.navLinks}>
        <div className={styles.sectionTitle}>Main Menu</div>
        
        <Link 
          href="/dashboardsuperadmin" 
          className={`${styles.navItem} ${isActive("/dashboard/superadmin") ? styles.active : ""}`}
        >
          <LayoutDashboard size={18} />
          <span>Tableau de bord</span>
        </Link>
        <Link href="/users" className={styles.navItem}>
          Users
        </Link>
        <Link href="/commandes" className={styles.navItem}>
          Commandes
        </Link>

        <div className={styles.sectionTitle}>Gestion</div>

        <Link 
          href="/produit" 
          className={`${styles.navItem} ${isActive("/dashboard/superadmin/produits") ? styles.active : ""}`}
        >
          <Package size={18} />
          <span>Produits</span>
        </Link>

        <Link 
          href="/dashboard/superadmin/comptabilite" 
          className={`${styles.navItem} ${isActive("/dashboard/superadmin/comptabilite") ? styles.active : ""}`}
        >
          <Calculator size={18} />
          <span>Comptabilité</span>
        </Link>
      </nav>
    </aside>
  );
};

export default SidebarSuperAdmin;