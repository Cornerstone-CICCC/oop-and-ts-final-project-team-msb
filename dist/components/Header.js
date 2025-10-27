export class Header {
    constructor(allTasks, onTaskClick) {
        this.allTasks = allTasks;
        this.onTaskClick = onTaskClick;
    }
    render() {
        const header = document.createElement("header");
        header.className = "header";
        header.innerHTML = `
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input type="text" placeholder="Search..." class="search-input" />
        <ul class="search-results"></ul>
      </div>
      <h1 class="app-title">KanbanMSB</h1>
      <div class="info-button">
        <i class="fas fa-circle-info"></i>
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        background-color: #1a1a1a;
        color: white;
        position: sticky;
        top: 0;
        z-index: 1000;
        flex-wrap: wrap;
        gap: 1rem;
        font-family: 'Inter', sans-serif;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .search-container {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: #2a2a2a;
        padding: 0.5rem 1rem;
        border-radius: 12px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        width: 400px;
        max-width: 90%;
        margin-right: auto;
        transition: all 0.2s ease-in-out;
      }

      .search-container:focus-within {
        border-color: #6c63ff;
        box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
      }

      .search-icon {
        font-size: 1rem;
        color: #d6d6d6;
        position: absolute;
        top: 10px;
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
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.6rem;
        font-weight: 600;
        color: #d6d6d6;
        white-space: nowrap;
      }

      .info-button {
        font-size: 1.2rem;
        cursor: pointer;
        color: #d6d6d6;
      }

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
        }
      }
    `;
        document.head.appendChild(style);
        return header;
    }
}
//# sourceMappingURL=Header.js.map