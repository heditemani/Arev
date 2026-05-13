"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarAdmin from '../component/SidebarAdmin/SidebarAdmin';
import { 
  Search, Bell, User, Plus, Pencil, Trash2, 
  LayoutGrid, CheckCircle, X, Loader2 
} from 'lucide-react';
import styles from './categories.module.css';

interface Category {
  id: number;
  nom: string; // Taba3 el esm fil Django (nom)
  description?: string;
  product_count?: number; 
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({ name: '', desc: '' });

  // URL de base mta3 el categories (Router integration)
  const API_URL = "http://127.0.0.1:8000/api/produits/categories/";

  // 1. Njibou el data mel Base
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Thabbet ken famma pagination (.results)
      setCategories(response.data.results || response.data);
    } catch (error) {
      console.error("Erreur fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Logic Add Category lel Base
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(API_URL, 
        { nom: formData.name, description: formData.desc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setIsModalOpen(false);
      setFormData({ name: '', desc: '' });
      fetchCategories(); // Refresh list
    } catch (error) {
      console.error("Erreur ajout category:", error);
    }
  };

  // 3. Logic Delete mel Base
  const handleDelete = async (id: number) => {
    if(!confirm("T7eb tfassakh el category hedhi?")) return;
    
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (error) {
      console.error("Erreur delete:", error);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <SidebarAdmin activePage="categories" />

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.searchBar}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.topIcons}>
            <Bell size={20} />
            <User size={20} />
            <button className={styles.logoutBtn}>Logout</button>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.headerText}>
              <h1>Category Management</h1>
              <p>Organize and manage your product catalog sections.</p>
            </div>
            <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
              <Plus size={18} /> Add Category
            </button>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.bgBlue}`}><LayoutGrid size={20} /></div>
              <div>
                <p className={styles.statLabel}>Total Categories</p>
                <p className={styles.statValue}>{categories.length}</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.bgGreen}`}><CheckCircle size={20} /></div>
              <div>
                <p className={styles.statLabel}>Status</p>
                <p className={styles.statValue}>Live</p>
              </div>
            </div>
          </div>

          <div className={styles.tableCard}>
            {loading ? (
              <div className={styles.loadingWrapper}>
                <Loader2 className={styles.spinner} />
                <p>Loading database...</p>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Count</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map(cat => (
                    <tr key={cat.id}>
                      <td>
                        <div className={styles.nameCell}>
                          <span className={styles.catEmoji}>📁</span>
                          <span className={styles.catName}>{cat.nom}</span>
                        </div>
                      </td>
                      <td className={styles.descCell}>{cat.description || "No description"}</td>
                      <td><span className={styles.countBadge}>{cat.product_count || 0} Products</span></td>
                      <td>
                        <div className={styles.actions}>
                          <Pencil size={18} className={styles.editIcon} />
                          <Trash2 size={18} className={styles.deleteIcon} onClick={() => handleDelete(cat.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* --- ADD CATEGORY MODAL --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add New Category</h2>
              <X className={styles.closeIcon} onClick={() => setIsModalOpen(false)} />
            </div>
            
            <form onSubmit={handleAddCategory}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Category Name</label>
                  <input 
                    type="text" required placeholder="e.g. Vegetables"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea 
                    rows={3} placeholder="Brief description..."
                    value={formData.desc}
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Create Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

