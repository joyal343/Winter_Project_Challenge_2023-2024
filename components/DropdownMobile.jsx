import { useState, useEffect } from "react";
import styles from "./DropdownMobile.module.css";

const DropdownMobile = () => {

  useEffect(() => {
    const handleDropdownClick = (event) => {
      const rect = event.target.getBoundingClientRect();
      console.log(rect.x, rect.y);
      const dropdownContent = event.target.nextElementSibling;
      dropdownContent.style.display = 
          dropdownContent.style.display === "block" ? "none" : "block";
      dropdownContent.style.left = `${rect.x}px`;
      dropdownContent.style.top = `${rect.y + 30}px`;

      // Close other dropdowns
      document.querySelectorAll(`.${styles.dropdownContent}`).forEach(content => {
        if (content !== dropdownContent) content.style.display = "none";
      });

      event.stopPropagation();
    };

    const closeDropdowns = (event) => {
      document.querySelectorAll(`.${styles.dropdownContent}`).forEach(content => {
        content.style.display = "none";
      });
    };

    document.addEventListener("click", closeDropdowns);
    document.querySelectorAll(`.${styles.dropbtn}`).forEach((button) => {
      button.addEventListener("click", handleDropdownClick);
    });
    document.querySelectorAll(`.${styles.scrollContainer}`).forEach((container) => {
      container.addEventListener("scroll", closeDropdowns);
    })

    return () => {
      document.removeEventListener("click", closeDropdowns);
      document.querySelectorAll(`.${styles.dropbtn}`).forEach((button) => {
        button.removeEventListener("click", handleDropdownClick);
      });
      document.querySelectorAll(`.${styles.scrollContainer}`).forEach((container) => {
        container.removeEventListener("scroll", closeDropdowns);
      })
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        {["Dropdown 1", "Dropdown 2", "Dropdown 3","Dropdown 4","Dropdown 5","Dropdown 6","Dropdown 7"].map((label, index) => (
          <div key={index} className={styles.dropdown}>
            <button
              className={styles.dropbtn}
              onClick={() => toggleDropdown(index)}
              data-index={index}
            >
              {label}
            </button>
            <div 
              className={styles.dropdownContent}
              data-index={index}
            >
              <a href="#">Option A</a>
              <a href="#">Option B</a>
              <a href="#">Option C</a>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMobile;
