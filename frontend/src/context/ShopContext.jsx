import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Keep only quantities > 0
  const normalizeCartData = (data) => {
    const normalized = {};
    if (!data || typeof data !== "object") return normalized;
    for (const [id, sizes] of Object.entries(data)) {
      const filtered = Object.fromEntries(
        Object.entries(sizes || {}).filter(([, qty]) => qty > 0)
      );
      if (Object.keys(filtered).length) normalized[id] = filtered;
    }
    return normalized;
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          {
            itemId,
            size,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        getUserCart(token);
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (!cartData[itemId]) cartData[itemId] = {};

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  // Clear both local and server cart
  const clearCart = async () => {
    const current = structuredClone(cartItems); // snapshot before clearing
    setCartItems({}); // instant UI clear

    if (!token) return;

    try {
      // If you add a dedicated clear endpoint later, you can use this instead:
      // await axios.post(`${backendUrl}/api/cart/clear`, {}, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      // Fallback: set each line item to 0 on the server
      const updates = [];
      for (const itemId in current) {
        for (const size in current[itemId]) {
          if (current[itemId][size] > 0) {
            updates.push(
              axios.post(
                `${backendUrl}/api/cart/update`,
                { itemId, size, quantity: 0 },
                { headers: { Authorization: `Bearer ${token}` } }
              )
            );
          }
        }
      }
      if (updates.length) await Promise.allSettled(updates);
    } catch (e) {
      console.warn("Failed to clear server cart", e);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = async () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);
      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalAmount += itemInfo.price * cartItems[itemId][size];
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (tokenArg) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenArg}`,
          },
        }
      );

      if (response.data.success) {
        const normalized = normalizeCartData(response.data.cartData);
        setCartItems(normalized);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Initial product fetch
  useEffect(() => {
    getProductsData();
  }, []);

  // Restore token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch cart after setting token
  useEffect(() => {
    if (token) {
      getUserCart(token);
    } else {
      setCartItems({});
    }
  }, [token]);

  useEffect(() => {
    console.log("Cart Items: ", cartItems);
  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;