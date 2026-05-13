"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { 
  Receipt, 
  ArrowRight, 
  ArrowLeft, 
  Mail, 
  Lock, 
  HelpCircle,
} from "lucide-react";
import styles from "./login.module.css";

interface LocalNavigationProps {
  onNavigate?: (page: string, action?: string) => void;
}

// --- AuthLayout: El Design el High-end mte3ek ---
const AuthLayout = ({ 
  children, 
  onNavigate 
}: { 
  children: ReactNode, 
  onNavigate?: LocalNavigationProps["onNavigate"] 
}) => (
  <div className={styles.mainWrapper}>
    <div className={styles.topBar}>
      <button 
        onClick={() => onNavigate?.("homepage", "push_back")}
        className={styles.backButton}
      >
        <ArrowLeft className={styles.iconSm} />
        <span>Retour à l'accueil</span>
      </button>
      <a href="#" className={styles.helpLink}>
        <HelpCircle className={styles.iconXs} />
        Aide
      </a>
    </div>

    <section className={styles.leftPanel}>
      <div className={styles.glowEffect} />
      <div className={styles.leftContent}>
        <div className={styles.brandLogo}>
          <div className={styles.logoBox}>
            <Receipt className={styles.iconWhite} />
          </div>
          <span className={styles.brandName}>QuickPOS</span>
        </div>
        <h2 className={styles.heroTitle}>Gérez votre magasin en toute confiance.</h2>
        <p className={styles.heroSub}>
          Rejoignez des milliers de commerçants qui font confiance à QuickPOS.
        </p>
        <ul className={styles.featureList}>
          <li className={styles.featureItem}><span>✓ Suivi d'inventaire en temps réel</span></li>
          <li className={styles.featureItem}><span>✓ Mode hors ligne inclus</span></li>
        </ul>
      </div>
      <div className={styles.footerCopyright}>© 2026 ShopNow SaaS Inc.</div>
    </section>

    <section className={styles.rightPanel}>
      <div className={styles.formContainer}>{children}</div>
    </section>
  </div>
);

// --- Login Component: Rabet m3a Django ---
export default function Login({ onNavigate }: LocalNavigationProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username,
        password,
      });

      const { access, refresh, role } = response.data;

      // 1. Stockage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userRole", role);

      // 2. Role-Based Redirection
      if (role === "SUPERADMIN") {
        router.push("/dashboardsuperadmin");
      } else if (role === "ADMIN") {
        router.push("/dashboardAdmin");
      } else {
        router.push("/pos/sales"); 
      }

    } catch (err: any) {
      setError("Username wala password ghalet. Thabbet mlih!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout onNavigate={onNavigate}>
      <div className={styles.header}>
        <h3 className={styles.title}>Connecter</h3>
        <p className={styles.subtitle}>Entrez vos détails pour accéder au tableau de bord.</p>
      </div>
      
      <form className={styles.form} onSubmit={handleLogin}>
        {error && <div className={styles.errorBanner}>{error}</div>}

        <div className={styles.inputGroup}>
          <label className={styles.label}>Username</label>
          <div className={styles.inputWrapper}>
            <Mail className={styles.inputIcon} />
            <input 
              type="text" 
              className={styles.inputField} 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.label}>Mot de passe</label>
            <a href="#" className={styles.forgotPass}>Mot de passe oublié ?</a>
          </div>
          <div className={styles.inputWrapper}>
            <Lock className={styles.inputIcon} />
            <input 
              type="password" 
              className={styles.inputField} 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Connexion..." : "Se Connecter"}
          {!loading && <ArrowRight className={styles.iconSm} />}
        </button>
      </form>
    </AuthLayout>
  );
}