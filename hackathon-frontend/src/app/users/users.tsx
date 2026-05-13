"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarSuperAdmin from "../component/SidebarSuperAdmin/SidebarSuperAdmin";
import { UserPlus, Mail, Phone, Building2, ShieldCheck, MoreVertical, Search, Loader2, ExternalLink, Fingerprint } from "lucide-react";
import styles from "./users.module.css";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  departement: number | null;
  departement_name?: string; // Kima fil Postman
  telephone: string | null;   // Kima fil Postman
  cin: string | null;         // Zidna el CIN kima fil JSON
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/users/all/";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data.results || response.data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <SidebarSuperAdmin />
      
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.titleSection}>
            <h1>Équipe & Collaborateurs</h1>
            <p>{filteredUsers.length} membres configurés</p>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Rechercher par pseudo ou email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={styles.btnAdd}>
              <UserPlus size={18} />
              <span>Nouveau Membre</span>
            </button>
          </div>
        </header>

        {loading ? (
          <div className={styles.loader}>
            <Loader2 className={styles.spinner} />
            <p>Chargement des comptes...</p>
          </div>
        ) : (
          <div className={styles.userGrid}>
            {filteredUsers.map((u) => (
              <div key={u.id} className={styles.userCard}>
                <div className={styles.cardTop}>
                  <div className={styles.avatar}>
                    {u.username.charAt(0).toUpperCase()}
                  </div>
                  <span className={`${styles.roleBadge} ${styles[u.role.toLowerCase()]}`}>
                    <ShieldCheck size={12} />
                    {u.role}
                  </span>
                </div>

                <div className={styles.cardInfo}>
                  <h3>{u.username}</h3>
                  <div className={styles.cinRow}>
                    <Fingerprint size={14} />
                    <span>CIN: {u.cin || "Non renseigné"}</span>
                  </div>
                  
                  <div className={styles.deptTag}>
                    <Building2 size={14} />
                    <span>{u.departement_name || "Sans Département"}</span>
                  </div>
                </div>

                <div className={styles.cardContacts}>
                  <div className={styles.contactItem}>
                    <Mail size={14} />
                    <span className={styles.truncate}>{u.email || "Email non fourni"}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Phone size={14} />
                    <span>{u.telephone || "Pas de téléphone"}</span>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button className={styles.btnEditProfile}>
                    <ExternalLink size={14} />
                    Détails
                  </button>
                  <button className={styles.btnMenu}><MoreVertical size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UsersPage;