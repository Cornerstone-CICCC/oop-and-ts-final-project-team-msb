export class Header {
    render() {
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
          gap: 0.5rem;
          flex: 1;
          max-width: 300px;
        }
        .search-icon {
          font-size: 1.2rem;
          color: #ccc;
        }
        .search-input {
          padding: 0.5rem 1rem;
          background-color: #2a2a2a;
          border: none;
          border-radius: 8px;
          color: white;
          flex: 1;
        }
        .search-input::placeholder {
          color: #888;
        }
        .app-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
          font-weight: 600;
        }
        .info-button {
          font-size: 1.2rem;
          cursor: pointer;
          color: #ccc;
        }
      `;
        document.head.appendChild(style);
        return header;
    }
}
//# sourceMappingURL=Header.js.map