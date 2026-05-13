import React from "react";
import SidebarSuperAdmin from "../component/SidebarSuperAdmin/SidebarSuperAdmin";
import styles from "./pos.module.css";

const POS = () => {
  return (
    <div className={styles.appContainer}>
      {/* Sidebar Component */}
      <SidebarSuperAdmin />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className={styles.searchField}
          />
          <button className={styles.btnSession}>Nouvelle Session</button>
        </header>

        <div className={styles.contentArea}>
          <div className={styles.tabs}>
            <span className={styles.tabActive}>Tout les produits</span>
          </div>

          <div className={styles.emptyState}>
            <div className={styles.iconLarge}>📦</div>
            <p>Aucun produit disponible dans le stock</p>
          </div>
        </div>
      </main>

      {/* Right Cart Sidebar */}
      <aside className={styles.cartSidebar}>
        <div className={styles.cartHeader}>
          <strong>Panier Actuel</strong>
          <button className={styles.btnClient}>👤 Client</button>
        </div>

        <div className={styles.emptyState}>
          <div className={styles.iconSmall}>🛒</div>
          <p>Votre panier est vide</p>
        </div>
      </aside>
    </div>
  );
};

export default POS;
