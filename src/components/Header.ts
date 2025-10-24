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
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #f4f4f4;
    color: #333;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .search-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    max-width: 400px;
    background-color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.2s ease-in-out;
  }

  .search-container:focus-within {
    border-color: #6c63ff;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
  }

  .search-icon {
    font-size: 1rem;
    color: #999;
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    color: #333;
  }

  .search-input::placeholder {
    color: #bbb;
  }

  .app-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.6rem;
    font-weight: 600;
    color: #333;
  }

  .info-button {
    font-size: 1.2rem;
    cursor: pointer;
    color: #888;
  }
`;
    
      document.head.appendChild(style);
      return header;
    }
  }
  