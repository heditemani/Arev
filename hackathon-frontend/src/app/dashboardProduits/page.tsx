"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarAdmin from '../component/SidebarAdmin/SidebarAdmin';
import { Search, Bell, User, Plus, Edit2, Trash2, X, Package } from 'lucide-react';
import styles from './dashboardPrduit.module.css';

interface Category {
  id: number;
  nom: string;
}

interface Product {
  id: number;
  nom: string;
  categorie_id: number;
  categorie_name: string;
  prix: number | string;
  stock: number;
}

export default function DashboardPrduit() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    catId: '',
    price: '',
    stock: ''
  });

  // URL de base mte3ek (thabbet dima mel port 8000)
  const API_BASE = "http://127.0.0.1:8000/api/produits";

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // 1. Fetching automatique mel Router
      const [prodRes, catRes] = await Promise.all([
        axios.get(`${API_BASE}/items/`, config),
        axios.get(`${API_BASE}/categories/`, config) 
      ]);

      // Thabbet ken el data jaya fi .results (Pagination) wala Array direct
      const prodData = prodRes.data.results || prodRes.data;
      const catData = catRes.data.results || catRes.data;

      setProducts(prodData);
      setCategories(catData);
      
      if (catData.length > 0 && !newProduct.catId) {
        setNewProduct(prev => ({ ...prev, catId: catData[0].id.toString() }));
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const data = {
        nom: newProduct.name,
        categorie: parseInt(newProduct.catId),
        prix: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock)
      };

      // POST lel items
      await axios.post(`${API_BASE}/items/`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsModalOpen(false);
      setNewProduct({ name: '', catId: categories[0]?.id.toString() || '', price: '', stock: '' });
      fetchData(); 
    } catch (err) {
      console.error("Ghalta fil ajout:", err);
    }
  };

  const filteredProducts = products.filter(p => 
    p.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <SidebarAdmin activePage="products" />

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.searchBar}>
            <Search size={16} />
            
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.topIcons}>
            <Bell size={20} />
            <div className={styles.userProfile}>
              <User size={20} />
              <span>Admin</span>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.pageTitleRow}>
            <div>
              <h1>Product Management</h1>
              <p className={styles.subtitle}>Manage your inventory and stock levels</p>
            </div>
            <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
              <Plus size={18} /> Add Product
            </button>
          </div>

          <div className={styles.tableContainer}>
            {loading ? (
              <div className={styles.statusMessage}>Chargement en cours...</div>
            ) : filteredProducts.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id}>
                      <td className={styles.productCell}>
                        <div className={styles.imgPlaceholder}>{p.nom.charAt(0)}</div>
                        <div>
                          <p className={styles.pName}>{p.nom}</p>
                          <p className={styles.pId}>#{p.id}</p>
                        </div>
                      </td>
                      <td>{p.categorie_name}</td>
                      <td className={styles.pPrice}>{p.prix} TND</td>
                      <td>
                        <span className={`${styles.stockBadge} ${p.stock < 10 ? styles.lowStock : ''}`}>
                          {p.stock} Units
                        </span>
                      </td>
                      <td className={styles.actions}>
                        <button className={styles.actionBtn}><Edit2 size={14} /></button>
                        <button className={`${styles.actionBtn} ${styles.deleteBtn}`}><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>
                <Package size={40} />
                <p>Aucun produit trouvé</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add New Product</h2>
              <X className={styles.closeIcon} onClick={() => setIsModalOpen(false)} />
            </div>
            <form onSubmit={handleAddProduct}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Product Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newProduct.name} 
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
                  />
                </div>
                
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Category</label>
                    <select 
                      value={newProduct.catId} 
                      onChange={(e) => setNewProduct({...newProduct, catId: e.target.value})}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nom}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Price (TND)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required 
                      value={newProduct.price} 
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Stock Quantity</label>
                  <input 
                    type="number" 
                    required 
                    value={newProduct.stock} 
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} 
                  />
                </div>
              </div>
              
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}