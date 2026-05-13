"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import SidebarSuperAdmin from "../component/SidebarSuperAdmin/SidebarSuperAdmin";
import { Package, Edit, Trash2, Search, Loader2, AlertTriangle } from "lucide-react";
import styles from "./produit.module.css";

interface Product {
  id: number;
  nom: string;
  categorie_name: string;
  prix: string | number;
  stock: number;
  image_url?: string;
}

const Produit = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/products/items/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Django results handle
        setProducts(response.data.results || response.data);
      } catch (error) {
        console.error("Erreur loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <SidebarSuperAdmin />
      
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.title}>
            <h1>Inventaire</h1>
            <p>Consultez les quantités disponibles en stock</p>
          </div>
          <div className={styles.searchWrapper}>
            <input 
              type="text" 
              placeholder="Chercher produit..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <Link href="/nouveauProduit" className={styles.btnProduit}>
            + Nouveau Produit
          </Link>
        </header>

        <div className={styles.tableWrapper}>
          {loading ? (
            <div className={styles.loader}>
              <Loader2 className={styles.spinner} />
              <p>Récupération du stock...</p>
            </div>
          ) : (
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Catégorie</th>
                  <th>Prix Unit.</th>
                  <th>Quantité en Stock</th>
                  <th>Etat</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className={styles.productCell}>
                      <div className={styles.productImg}>
                        {product.nom.charAt(0).toUpperCase()}
                      </div>
                      <span className={styles.productName}>{product.nom}</span>
                    </td>
                    <td><span className={styles.categoryName}>{product.categorie_name}</span></td>
                    <td>{Number(product.prix).toFixed(2)} TND</td>
                    
                    {/* Houni el Stock el wadhah */}
                    <td className={styles.stockCell}>
                      <span className={product.stock === 0 ? styles.outOfStock : styles.inStock}>
                         {product.stock}
                      </span>
                    </td>

                    <td>
                      {product.stock === 0 ? (
                        <span className={styles.badgeCritical}><AlertTriangle size={12} /> Rupture</span>
                      ) : product.stock < 5 ? (
                        <span className={styles.badgeWarning}>Stock Faible</span>
                      ) : (
                        <span className={styles.badgeSuccess}>Disponible</span>
                      )}
                    </td>

                    <td className={styles.actionCell}>
                      <button className={styles.iconBtn} title="Modifier"><Edit size={16} /></button>
                      <button className={`${styles.iconBtn} ${styles.delete}`} title="Supprimer"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Produit;