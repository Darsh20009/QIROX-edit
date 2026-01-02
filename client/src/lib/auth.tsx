import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: "visitor" | "client" | "student" | "employee" | "admin";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<{ user: User; token: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("qirox-token");
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem("qirox-token");
          setToken(null);
          setUser(null);
        }
      } catch {
        localStorage.removeItem("qirox-token");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "فشل في تسجيل الدخول");
    }

    localStorage.setItem("qirox-token", data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (email: string, password: string, name: string, phone?: string) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, phone }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "فشل في إنشاء الحساب");
    }

    localStorage.setItem("qirox-token", data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("qirox-token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem("qirox-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
