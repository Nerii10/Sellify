import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import { useAppContext } from "../../logic/AppContext";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function MobileSidebar({ currentPage, changePage }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        className={
          open ? "mobile-sidebar-wrapper open" : "mobile-sidebar-wrapper closed"
        }
      >
        {SidebarData.map((data, index) => {
          return (
            <div
              key={index}
              className={
                currentPage == data.text
                  ? "sidebar-mobile-input active"
                  : "sidebar-mobile-input inactive"
              }
              onClick={() => {
                changePage(data.text);
                setOpen(false);
              }}
            >
              <div className="sidebar-mobile-input-icon">{data.icon}</div>
              <div className="sidebar-mobile-input-label">{data.text}</div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}

export function DesktopSidebar({ currentPage, changePage }) {
  return (
    <div className="sidebar-wrapper open">
      {SidebarData.map((data, index) => {
        return (
          <div
            key={index}
            className={
              currentPage == data.text
                ? "sidebar-input active"
                : "sidebar-input inactive"
            }
            onClick={() => {
              changePage(data.text);
            }}
          >
            {data.icon}
            {data.text}
          </div>
        );
      })}
    </div>
  );
}

export default function Sidebar() {
  const { currentPage, changePage, windowWidth, windowMobileWidth } =
    useAppContext();

  const sidebarProps = { currentPage, changePage };

  return windowWidth > windowMobileWidth ? (
    <DesktopSidebar {...sidebarProps} />
  ) : (
    <MobileSidebar {...sidebarProps} />
  );
}
