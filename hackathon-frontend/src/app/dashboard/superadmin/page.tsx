"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function SuperAdminDashboard() {
  const [data, setData] = useState({
    users: [],
    branches: [],
    products: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch kol chay fard waqt
        const [usersRes, branchesRes, productsRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/users/list/", { headers }),
          axios.get("http://127.0.0.1:8000/api/branches/list/", { headers }),
          axios.get("http://127.0.0.1:8000/api/products/list/", { headers })
        ]);

        setData({
          users: usersRes.data,
          branches: branchesRes.data,
          products: productsRes.data
        });
      } catch (err) {
        console.error("Erreur lors du chargement des données", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className={styles.container}>Chargement...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tableau de Bord SuperAdmin</h1>
        <p>Gestion globale du système ShopNow</p>
      </div>

      {/* Stats Quick View */}
      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <h3>Total Utilisateurs</h3>
          <p>{data.users.length}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Branches</h3>
          <p>{data.branches.length}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Produits</h3>
          <p>{data.products.length}</p>
        </div>
      </div>

      {/* Branches Table */}
      <div className={styles.section}>
        <h2>Nos Branches (Foro3)</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nom de la branche</th>
              <th>Localisation</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            {data.branches.map((b: any) => (
              <tr key={b.id}>
                <td>{b.nom}</td>
                <td>{b.adresse || "N/A"}</td>
                <td>{b.manager_name || "Non assigné"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Users Table */}
      <div className={styles.section}>
        <h2>Utilisateurs & Rôles</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Rôle</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((u: any) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td style={{ fontWeight: 'bold', color: u.role === 'SUPERADMIN' ? 'red' : 'black' }}>
                  {u.role}
                </td>
                <td>{u.is_active ? "Actif" : "Inactif"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}