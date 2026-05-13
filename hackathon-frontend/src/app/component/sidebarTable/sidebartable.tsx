import { LayoutGrid, Receipt, Package, BarChart3, Settings, Plus, Utensils } from 'lucide-react';
import styles from './sidebarTable.module.css';
import { motion } from 'motion/react';
interface SidebarProps {
  activePage: string;
}

const navItems = [
  { id: 'floor-plan', label: 'Floor Plan', icon: LayoutGrid, active: true },
  { id: 'orders', label: 'Orders', icon: Receipt },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function SideBarTable() {
  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.brandHeader}>
        <div className={styles.brandIcon}>
          <Utensils size={24} />
        </div>
        <div>
          <h1 className={styles.brandTitle}>Bistro POS</h1>
          <p className={styles.brandSubtitle}>Station 01</p>
        </div>
      </div>

      <nav className={styles.navContainer}>
        {navItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
          >
            <item.icon size={20} />
            <span className={styles.navLabel}>{item.label}</span>
          </motion.div>
        ))}
      </nav>

      <motion.button 
        className={styles.newShiftBtn}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={20} />
        New Shift
      </motion.button>
    </aside>
  );
}
