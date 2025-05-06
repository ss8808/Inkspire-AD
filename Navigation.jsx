import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FaBars, 
  FaTimes, 
  FaBell, 
  FaHome, 
  FaCalendarAlt, 
  FaComments, 
  FaTachometerAlt, 
  FaSignOutAlt,
  FaBriefcase
} from "react-icons/fa";
import axios from "../AxiosInstance";
import "./Navigation.css";
import Logo from "../../assets/NewLogo.png";
const Navigation = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ws, setWs] = useState(null);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userType = localStorage.getItem("user_type");

  useEffect(() => {
    fetchNotifications();
    setupWebSocket();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.closest('.hamburger-menu')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (ws) ws.close();
    };
  }, [menuOpen]);

  
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get("/api/notifications/", {
        headers: { Authorization: `Token ${token}` },
      });
      setNotifications(response.data);
      setUnreadCount(response.data.filter(notif => !notif.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const setupWebSocket = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const socketUrl = `ws://127.0.0.1:8000/ws/notifications/${userId}/`;
    const newWs = new WebSocket(socketUrl);
    setWs(newWs);

    newWs.onopen = () => console.log("WebSocket Connected");
    newWs.onmessage = handleWebSocketMessage;
    newWs.onerror = (e) => console.error("WebSocket Error:", e);
    newWs.onclose = () => {
      console.warn("WebSocket Disconnected. Reconnecting in 5s...");
      setTimeout(setupWebSocket, 5000);
    };
  };

  const handleWebSocketMessage = (event) => {
    try {
      const newNotification = JSON.parse(event.data);
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    } catch (err) {
      console.error("WebSocket Message Error:", err);
    }
  };

  const toggleDropdown = async () => {
    setDropdownOpen(!dropdownOpen);
    if (!dropdownOpen && unreadCount > 0) {
      try {
        const token = localStorage.getItem("access");
        await axios.post(
          "/api/notifications/mark-as-read/",
          {},
          { headers: { Authorization: `Token ${token}` } }
        );
        setUnreadCount(0);
        // Update notifications to show they've been read
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, read: true }))
        );
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    }
  };

  const clearAllNotifications = async () => {
    const token = localStorage.getItem("access");
    try {
      await axios.delete("/api/notifications/clear-all/", {
        headers: { Authorization: `Token ${token}` },
      });
      setNotifications([]);
      setUnreadCount(0);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };


  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getDashboardLink = () => {
    switch(userType) {
      case "admin":
        return "/admin";
      case "service_provider":
        return "/provider-dashboard";
      default:
        return "/dashboard";
    }
  };

  const getDashboardIcon = () => {
    switch(userType) {
      case "service_provider":
        return <FaBriefcase />;
      default:
        return <FaTachometerAlt />;
    }
  };

  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/home" className="navbar-brand">
            <img src={Logo} alt="Logo " height={70} />
        </Link>

        <button className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`} ref={menuRef}>
          <li>
            <Link to="/home" className={isActive('/home')}>
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/booking-history" className={isActive('/booking-history')}>
              <FaCalendarAlt /> Bookings
            </Link>
          </li>

          <li>
            <Link to="/view-requests" className={isActive('/view-requests')}>
              <FaCalendarAlt /> CustomBookings
            </Link>
          </li>
          <li>
            <Link to="/chat" className={isActive('/chat')}>
              <FaComments /> Chat
            </Link>
          </li>

          <li className="nav-notification1" ref={dropdownRef}>
            <button className="notification-bell1" onClick={toggleDropdown}>
              <FaBell />
              {unreadCount > 0 && (
                <span className="notification-badge1">{unreadCount}</span>
              )}
            </button>

            {dropdownOpen && (
              <div className="notification-dropdown1">
                <div className="notification-header1">
                  <span className="notification-title1">Notifications</span>
                  {notifications.length > 0 && (
                    <button className="notification-clear1" onClick={clearAllNotifications}>
                      Clear all
                    </button>
                  )}
                </div>
                <div className="notification-list1">
                  {notifications.length > 0 ? (
                    notifications.map((notif, index) => (
                      <div key={index} className="notification-item1">
                        <div className="notification-content1">
                          <span className="notification-message1">{notif.message}</span>
                          <span className="notification-time1">
                            {formatNotificationTime(notif.created_at)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="notification-empty">
                      Your notifications will appear here
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>

          <li>
            <button className="nav-button" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;