"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./nouveau.module.css";

interface Categorie {
  id: number;
  nom: string;
}

const NouveauProduit = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nom: "",
    reference: "",
    prix: "",
    stock: 0,
    description: "",
    categorie: "", 
    is_active: true
  });

  // 1. Njibou el categories (Thabbet fil URL)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Dima ista3mel accessToken kima fil Login
        if (!token) return;

        const response = await axios.get("http://127.0.0.1:8000/api/products/categories/", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data.results || response.data;
        setCategories(data);
      } catch (error) {
        console.error("Erreur fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 2. Enregistrer le produit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken"); // Thabbet esm el key houni zeda
      
      const dataToSend = {
        nom: formData.nom,
        description: formData.description,
        prix: parseFloat(formData.prix),
        stock: formData.stock,
        reference: formData.reference,
        categorie: formData.categorie, 
        is_active: formData.is_active
      };

      // ❌ Ghalta fil URL kount 7at "produits", tawa wallat "products"
      await axios.post("http://127.0.0.1:8000/api/products/items/", dataToSend, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      alert("Produit ajouté avec succès !");
      router.push("/produit"); 
    } catch (error: any) {
      console.error("Erreur ajout produit:", error.response?.data || error.message);
      alert("Erreur: Check el console mta3 el browser");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>Nouveau Produit</h2>
          <Link href="/produit" className={styles.btnClose}>✕</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nom du produit</label>
              <input
                required
                className={styles.input}
                placeholder="ex. Coca Cola 1.5L"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Référence</label>
              <input 
                className={styles.input} 
                placeholder="ex. REF-001" 
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.formGroup} style={{ marginTop: '15px' }}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.input}
              rows={2}
              placeholder="Détails du produit..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Prix (TND)</label>
              <input
                type="number" step="0.001" required
                className={styles.input}
                placeholder="0.000"
                value={formData.prix}
                onChange={(e) => setFormData({...formData, prix: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Stock Initial</label>
              <input 
                type="number" required
                className={styles.input} 
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Catégorie</label>
              <select 
                required
                className={styles.select}
                value={formData.categorie}
                onChange={(e) => setFormData({...formData, categorie: e.target.value})}
              >
                <option value="">-- Sélectionner une catégorie --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>État</label>
              <div className={styles.radioGroup}>
                <div className={styles.radioItem}>
                  <input 
                    type="radio" name="etat" id="actif" 
                    checked={formData.is_active === true}
                    onChange={() => setFormData({...formData, is_active: true})}
                  />
                  <label htmlFor="actif">Actif</label>
                </div>
                <div className={styles.radioItem}>
                  <input 
                    type="radio" name="etat" id="inactif" 
                    checked={formData.is_active === false}
                    onChange={() => setFormData({...formData, is_active: false})}
                  />
                  <label htmlFor="inactif">Inactif</label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <Link href="/produit" className={styles.btnAnnuler}>Annuler</Link>
            <button 
                type="submit" 
                className={styles.btnEnregistrer}
                disabled={loading}
            >
              {loading ? "Enregistrement..." : "Enregistrer Produit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NouveauProduit;