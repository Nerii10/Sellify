import { createContext, memo, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { useUser } from "./hooks/useUser";
import axios from "axios";

const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [serverStatus, setServerStatus] = useState("offline");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const windowMobileWidth = 768;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const { token } = useUser();

  const { fetchData } = useFetch({ token });
  const navigate = useNavigate();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const keepServerAwake = () => {
      axios
        .get(`${API_URL}/`)
        .then(() => {
          console.log("Serwer online");
          setServerStatus("online");
        })
        .catch((err) => {
          console.error("Błąd podczas pingowania serwera:", err);
          setServerStatus("offline");
        });
    };

    keepServerAwake();

    const interval = setInterval(keepServerAwake, 2000);

    return () => clearInterval(interval);
  }, []);

  //Change Page Hook
  function changePage(page) {
    setCurrentPage(page);
    navigate(page);
  }

  useEffect(() => {
    const { pathname } = location;
    console.log(pathname);
    if (pathname) {
      changePage(pathname.slice(1, pathname.length));
    }
  }, []);
  //Window Size Hook
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Fetching
  const fetchItems = async () => {
    const data = await fetchData(`${API_URL}/items/all`);
    setItems(data);
  };

  const fetchSales = async () => {
    const data = await fetchData(`${API_URL}/sales/all`);
    setSales(data);
  };

  const fetchStats = async () => {
    const today = await fetchData(`${API_URL}/stat/today`);
    const allTime = await fetchData(`${API_URL}/stat/allTime`);
    const yearStats = await fetchData(`${API_URL}/stat/yearStats?year=${2025}`);

    setStats((prev) => ({
      ...prev,
      today: today,
      allTime: allTime,
      yearStats: yearStats,
    }));
  };

  //Sales
  async function addSale(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/sales/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      fetchSales();
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  async function removeSale(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/sales/remove`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      fetchSales();
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  //Items
  async function addItems(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/items/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      fetchItems();
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  useEffect(() => {
    if (token) {
      fetchItems();
      fetchSales();
      fetchStats();
    }
  }, [location, token, serverStatus]);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        changePage,
        windowWidth,
        windowMobileWidth,
        addSale,
        loading,
        removeSale,
        addItems,
        items,
        sales,
        stats,
        token,
        serverStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
