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
          background-color: #1a1a1a;
          color: white;
          position: relative;
        }
        .search-container {
    display: flex;
    align-items: center;
    background-color: #1a1a1a;
    border: 2px solid #aaa;
    border-radius: 12px;
    padding: 6px 12px;
    width: 240px;
    height: 40px;
    margin-left: 1rem;
    transition: border 0.2s ease;
  }

  .search-container:hover {
    border-color: #fff;
  }

  .search-icon {
    font-size: 18px;
    color: #ccc;
    margin-right: 8px;
  }

  .search-input {
    flex: 1;
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 14px;
    outline: none;
  }

  .search-results {
    position: absolute;
    top: 45px;
    background-color: #2a2a2a;
    width: 100%;
    border-radius: 8px;
    z-index: 10;
    padding: 0.5rem;
    display: none;
  }

  .search-result-item {
    color: white;
    padding: 0.3rem;
    border-radius: 6px;
    cursor: pointer;
  }

  .search-result-item:hover {
    background-color: #444;
  }

  .search-container:has(.search-result-item) .search-results {
    display: block;
  }
`;
      document.head.appendChild(style);
      return header;
    }
  }
  