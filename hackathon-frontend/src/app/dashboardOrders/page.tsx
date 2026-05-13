"use client";

import React, { useState } from 'react';
import SidebarTable from '../component/sidebarTable/sidebartable';
import { Search, Bell, RotateCcw, HelpCircle, Lock, Trash2 } from 'lucide-react';
import styles from './dashboard.module.css';

const products = [
  { id: 1, name: 'Salade de Saison', price: 14.50, desc: 'Légumes bio, vinaigrette maison', category: 'Plats', img: '/salade.jpg' },
  { id: 2, name: 'Pancakes Maison', price: 9.00, desc: 'Sirop d’érable et fruits rouges', category: 'Desserts', img: '/pancakes.jpg' },
  { id: 3, name: 'Old Fashioned', price: 12.00, desc: 'Whisky, Angostura, Orange', category: 'Cocktails', img: '/cocktail.jpg' },
  { id: 4, name: 'Entrecôte 300g', price: 28.00, desc: 'Frites fraîches et sauce poivre', category: 'Plats', img: '/steak.jpg' },
  { id: 5, name: 'Le Classique Burger', price: 16.50, desc: 'Boeuf, Cheddar, Bacon fumé', category: 'Plats', img: '/burger.jpg' },
  { id: 6, name: 'Cœur Coulant', price: 8.50, desc: 'Chocolat noir 70%, Vanille', category: 'Desserts', img: '/cake.jpg' },
];

export default function OrdersPage() {
  const [cart, setCart] = useState([
    { id: 4, name: 'Entrecôte 300g', price: 28.00, qty: 1, note: 'Cuisson: Saignante' },
    { id: 3, name: 'Old Fashioned', price: 24.00, qty: 2, note: 'Classic' },
    { id: 1, name: 'Salade de Saison', price: 14.50, qty: 1, note: 'Sans oignons' },
  ]);

  return (
    <div className={styles.wrapper}>
      <SidebarTable />

      <main className={styles.mainContent}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.searchSection}>
            <h2 className={styles.logoTitle}>Bistro POS</h2>
            <div className={styles.searchBar}>
              <Search size={18} />
              <input type="text" placeholder="Search menu items..." />
            </div>
          </div>
          <div className={styles.topIcons}>
            <Bell size={20} /> <RotateCcw size={20} /> <HelpCircle size={20} />
            <button className={styles.lockBtn}><Lock size={16} /> Lock Screen</button>
          </div>
        </header>

        <div className={styles.layoutBody}>
          {/* Middle: Catalogue */}
          <section className={styles.catalogue}>
            <div className={styles.categories}>
              {['Tout', 'Boissons', 'Plats', 'Desserts', 'Cocktails'].map((cat, i) => (
                <button key={cat} className={i === 0 ? styles.activeCat : styles.catBtn}>{cat}</button>
              ))}
            </div>

            <h3 className={styles.sectionTitle}>Catalogue de produits</h3>
            <div className={styles.productGrid}>
              {products.map((p) => (
                <div key={p.id} className={styles.productCard}>
                  <div className={styles.productImg} style={{ backgroundColor: '#eee' }}>
                    {/* Img hna */}
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.namePrice}>
                      <h4>{p.name}</h4>
                      <span className={styles.price}>{p.price.toFixed(2)} €</span>
                    </div>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Order Summary kima image_639f81.png */}
          <aside className={styles.orderSidebar}>
            <div className={styles.orderHeader}>
              <div>
                <h3>Ajout commande</h3>
                <span>Serveur: Marc Dupont</span>
              </div>
              <div className={styles.tableBadge}>Table 05</div>
            </div>

            <div className={styles.cartList}>
              {cart.map((item, idx) => (
                <div key={idx} className={styles.cartItem}>
                  <div className={styles.qtyBadge}>{item.qty}</div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemNameRow}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemPrice}>{item.price.toFixed(2)} €</span>
                    </div>
                    <span className={styles.itemNote}>{item.note}</span>
                    <button className={styles.retirerBtn}>Retirer</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderFooter}>
              <div className={styles.totalRow}><span>Sous-total</span> <span>66,50 €</span></div>
              <div className={styles.totalRow}><span>TVA (10%)</span> <span>6,65 €</span></div>
              <div className={styles.finalTotal}>
                <strong>Total</strong>
                <strong>73,15 €</strong>
              </div>
              <div className={styles.actionBtns}>
                <button className={styles.validBtn}>Validation</button>
                <button className={styles.payBtn}>Paiement</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}