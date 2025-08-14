import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

export interface HistoryItem {
  id: string;
  type: "send" | "receive";
  amount: number;
  symbol: string;
  toOrFrom: string; // phone or wallet
  status: "pending" | "success" | "failed";
  timestamp: number;
  note?: string;
}

interface AppState {
  isReady: boolean;
  isAuthenticated: boolean;
  walletAddress?: string;
  phone?: string;
  otpSent?: boolean;
  history: HistoryItem[];
  balance: { [symbol: string]: number };
  storedPassword?: string;
  login: (addr: string, password: string) => boolean;
  logout: () => void;
  startSignup: (addr: string, phone: string, password: string) => void;
  sendOtp: () => void;
  verifyOtp: (code: string) => boolean;
  sendPayment: (
    phoneOrWallet: string,
    amount: number,
    symbol: string
  ) => Promise<void>;
  addMockReceive: (amount: number, symbol: string, from: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setReady] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();
  const [phone, setPhone] = useState<string | undefined>();
  const [otpSent, setOtpSent] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [balance, setBalance] = useState<{ [symbol: string]: number }>({
    ETH: 2.3456,
    USDT: 250,
  });
  const [storedPassword, setStoredPassword] = useState<string | undefined>();

  useEffect(() => {
    // simulate async init
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  const login = (addr: string, password: string) => {
    if (!phone || !storedPassword) {
      Alert.alert("No Account", "Please sign up first");
      return false;
    }
    
    // We've changed the login flow to use phone numbers instead of wallet addresses
    // For demo purposes, we'll ignore the addr parameter and just check the password
    
    if (password !== storedPassword) {
      Alert.alert("Invalid Password", "Incorrect password");
      return false;
    }
    setAuthenticated(true);
    return true;
  };

  const logout = () => {
    setAuthenticated(false);
    setWalletAddress(undefined);
    setPhone(undefined);
    setOtpSent(false);
  };

  const startSignup = (addr: string, p: string, password: string) => {
    setWalletAddress(addr);
    setPhone(p);
    setStoredPassword(password);
    setOtpSent(false);
  };

  const sendOtp = () => {
    if (!phone) return;
    setOtpSent(true);
    Alert.alert("OTP Sent", `Sent code to ${phone}`);
  };

  const verifyOtp = (code: string) => {
    if (code === "123456") {
      setAuthenticated(true);
      Alert.alert("Verified", "Phone linked successfully");
      return true;
    } else {
      Alert.alert("Invalid", "Incorrect code");
      return false;
    }
  };

  const sendPayment = async (
    phoneOrWallet: string,
    amount: number,
    symbol: string
  ) => {
    const id = Date.now().toString();
    setHistory((h) => [
      {
        id,
        type: "send",
        amount,
        symbol,
        toOrFrom: phoneOrWallet,
        status: "pending",
        timestamp: Date.now(),
      },
      ...h,
    ]);
    // simulate network
    await new Promise((r) => setTimeout(r, 1200));
    setHistory((h) =>
      h.map((item) => (item.id === id ? { ...item, status: "success" } : item))
    );
    setBalance((b) => ({ ...b, [symbol]: (b[symbol] || 0) - amount }));
  };

  const addMockReceive = (amount: number, symbol: string, from: string) => {
    const id = Date.now().toString();
    setHistory((h) => [
      {
        id,
        type: "receive",
        amount,
        symbol,
        toOrFrom: from,
        status: "success",
        timestamp: Date.now(),
      },
      ...h,
    ]);
    setBalance((b) => ({ ...b, [symbol]: (b[symbol] || 0) + amount }));
  };

  return (
    <AppContext.Provider
      value={{
        isReady,
        isAuthenticated,
        walletAddress,
        phone,
        otpSent,
        history,
        balance,
        storedPassword,
        login,
        logout,
        startSignup,
        sendOtp,
        verifyOtp,
        sendPayment,
        addMockReceive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
