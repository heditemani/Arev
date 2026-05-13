"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./nouveau.module.css";

const NouveauProduit = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]); // Categories mel base
  
  // State mta3 el form
  const [formData, setFormData] = useState({
    nom: "",
    reference: "",
    prix: "",
    stock: 0,
    description: "",
    categorie: "", // ID mta3 el categorie
    is_active: true
  });

  // 1. Njibou el categories mel base ki yit7al el form
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://127.0.0.1:8000/api/produits/categories/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(response.data.results || response.data);
      } catch (error) {
        console.error("Erreur categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Logic Enregistrer
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      
      // Houni el Payload kima tlobt (nom, desc, prix, stock, ref, cat)
      const dataToSend = {
        nom: formData.nom,
        description: formData.description,
        prix: formData.prix,
        stock: formData.stock,
        reference: formData.reference,
        categorie: formData.categorie, // ID
        is_active: formData.is_active
      };

      await axios.post("http://127.0.0.1:8000/api/produits/items/", dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Produit ajouté avec succès!");
      router.push("/produit"); // yarja3 lel lista
    } catch (error) {
      console.error("Erreur ajout produit:", error);
      alert("Famma ghalta, thabbet fil les champs");
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
          {/* Section 1: Nom w Reference */}
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nom du produit</label>
              <input
                required
                className={styles.input}
                placeholder="ex. Cocka Cola"
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

          {/* Section Description */}
          <div className={styles.formGroup} style={{ marginTop: '15px' }}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.input}
              rows={2}
              placeholder="Description du produit..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Section 2: Prix w Stock */}
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Prix (TND)</label>
              <input
                type="number" step="0.01" required
                className={styles.input}
                placeholder="0.00"
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

          {/* Section 3: Catégorie w État */}
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Catégorie</label>
              <select 
                required
                className={styles.select}
                value={formData.categorie}
                onChange={(e) => setFormData({...formData, categorie: e.target.value})}
              >
                <option value="">Sélectionner</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.nom}</option>
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
            <button type="submit" className={styles.btnEnregistrer}>Enregistrer Produit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NouveauProduit;