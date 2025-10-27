import { Component } from "../common/Component.js";

export class Header {
    render(): HTMLElement {
      const header = document.createElement("header");
      header.className = "header";
      header.innerHTML = `
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input type="text" placeholder="Search..." class="search-input" />
        </div>
        <h1 class="app-title">KanbanMSB</h1>
        <div class="info-button">
          <i class="fas fa-circle-info"></i>
        </div>
      `;
  
      const style = document.createElement("style");
      style.textContent = `
      /* ======== BASE HEADER ======== */
  .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: #333;
  position: sticky;       
  top: 0;                 
  z-index: 1000; 
  flex-wrap: wrap;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* ======== SEARCH BAR ======== */
.search-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #2a2a2a;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s ease-in-out;

  flex: 0 0 auto;
  width: 400px;
  max-width: 90%;
  margin-right: auto; 
}

.search-container:focus-within {
  border-color: #6c63ff;
  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
}

.search-icon {
  font-size: 1rem;
  color: #d6d6d6;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #eee;
}

.search-input::placeholder {
  color: #bbb;
}

/* ======== TITLE ======== */
.app-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.6rem;
  font-weight: 600;
  color: #d6d6d6;
  white-space: nowrap;
}

/* ======== INFO BUTTON ======== */
.info-button {
  font-size: 1.2rem;
  cursor: pointer;
  color: #d6d6d6;
}

/* ======== RESPONSIVE ======== */
@media (max-width: 1060px) {
  .header {
    flex-direction: row;
    justify-content: space-between; 
    padding: 0.8rem 1rem;
    gap: 0.5rem;
  }

  .app-title {
    display: none;
  }

  .search-container {
    width: 360px;
    max-width: 90%;
    margin-right: auto; 
  }
}

`;
  

  
  
      document.head.appendChild(style);
      return header;
    }
  }
  