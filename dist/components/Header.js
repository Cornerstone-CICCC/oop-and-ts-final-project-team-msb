export class Header {
    constructor(allTasks, onTaskClick) {
        this.allTasks = allTasks;
        this.onTaskClick = onTaskClick;
    }
    render() {
        const header = document.createElement("header");
        header.className = "header";
        header.innerHTML = `
      <div class="header-content">
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input type="text" placeholder="Search..." class="search-input" />
          <ul class="search-results"></ul>
        </div>
        <h1 class="app-title">KanbanMSB</h1>
        <div class="info-button">
          <i class="fas fa-circle-info"></i>
        </div>
      </div>
    `;
        const input = header.querySelector(".search-input");
        const results = header.querySelector(".search-results");
        input.addEventListener("input", () => {
            const query = input.value.trim().toLowerCase();
            results.innerHTML = "";
            if (query === "")
                return;
            const filtered = this.allTasks.filter(task => task.title.toLowerCase().includes(query));
            filtered.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.title;
                li.className = "search-result-item";
                li.addEventListener("click", () => this.onTaskClick(task));
                results.appendChild(li);
            });
        });
        const style = document.createElement("style");
        style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

  .header {
    width: 100%;
    padding: 1rem 2rem;
    background-color: #1a1a1a;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    font-family: 'Inter', sans-serif;
  }

  .header-content {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: "search title info";
    align-items: center;
    gap: 1rem;
    position: relative;
  }

  .search-container {
    grid-area: search;
    display: flex;
    align-items: center;
    background-color: #2a2a2a;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    min-width: 200px;
    max-width: 400px;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .search-container:focus-within {
    border-color: #6c63ff;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
  }

  .search-icon {
    font-size: 1.3rem;
    color: #d6d6d6;
    position: absolute;
    top: 15px;
    left: 10px;
  }

  .search-input {
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #eee;
    width: 100%;
  }

  .search-input::placeholder {
    color: #bbb;
  }

  .search-results {
    list-style: none;
    margin: 0.3rem 0 0;
    padding: 0.5rem;
    background: #2a2a2a;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .search-result-item {
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    border-radius: 4px;
    color: #eee;
  }

  .search-result-item:hover {
    background-color: #444;
  }

  .search-container:has(.search-result-item) .search-results {
    display: block;
  }

  .app-title {
    grid-area: title;
    font-size: 1.6rem;
    font-weight: 600;
    color: #d6d6d6;
    white-space: nowrap;
    justify-self: center;
  }

  .info-button {
    grid-area: info;
    font-size: 1.2rem;
    color: #d6d6d6;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  @media (max-width: 1000px) {
    .header-content {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        "search info";
    }

    .app-title {
      display: none;
    }

    .info-button {
      justify-content: flex-end;
    }
  }
`;
        document.head.appendChild(style);
        return header;
    }
}
//# sourceMappingURL=Header.js.map