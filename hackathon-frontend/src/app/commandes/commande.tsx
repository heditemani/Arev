import React from "react";
import SidebarSuperAdmin from "../component/SidebarSuperAdmin/SidebarSuperAdmin";
import styles from "./commande.module.css";

const Commandes = () => {
  // Data fake bch nchoufou el design
  const orders = [
    {
      id: "#CMD-001",
      date: "13 Mai 2026",
      client: "Ahmed Ben Ali",
      total: "45.500 DT",
      status: "Payé",
    },
    {
      id: "#CMD-002",
      date: "13 Mai 2026",
      client: "Sara Mansour",
      total: "12.000 DT",
      status: "En attente",
    },
  ];

  return (
    <div className={styles.container}>
      <SidebarSuperAdmin />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.title}>
            <h1>Liste des Commandes</h1>
            <p>Suivez vos transactions en temps réel</p>
          </div>
          <button
            style={{
              background: "#0f172a",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Exporter PDF
          </button>
        </header>

        {/* Stats Grid kima l-inventaire */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Commandes</span>
            <span className={styles.statValue}>150</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Chiffre d'affaires</span>
            <span className={styles.statValue}>1,450.000 DT</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Moyenne Panier</span>
            <span className={styles.statValue}>22.500 DT</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Commandes Payées</span>
            <span className={styles.statValue}>142</span>
          </div>
        </div>

        {/* List Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Réf</th>
                <th>Date</th>
                <th>Users</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: "700" }}>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.client}</td>
                  <td style={{ fontWeight: "600" }}>{order.total}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${order.status === "Payé" ? styles.statusPaid : styles.statusPending}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Commandes;
