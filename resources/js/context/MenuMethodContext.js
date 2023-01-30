import React from 'react'

const MenuMethodContext = React.createContext({});
//export const DashboardMethodProvider = DashboardMethodContext.Provider
export default MenuMethodContext;

export const MenuMethodProvider = ({ children }) => {

    let contextData = {
        HamburgerClick: hamburger_click,
    }

    function hamburger_click() {
        document.body.classList.toggle("sidebar-toggled"), document.querySelector(".sidebar").classList.toggle("toggled"), document.querySelector(".sidebar").classList.contains("toggled") && document.querySelector(".sidebar .collapse").collapse("hide")
    }

    return (
        <MenuMethodContext.Provider value={contextData}>
            {children}
        </MenuMethodContext.Provider>
    );
}