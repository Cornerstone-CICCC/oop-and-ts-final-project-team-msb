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
        flex-direction: column;
        flex: 1;
        max-width: 300px;
        gap: 0.3rem;
        position: relative;
      }

      .search-icon {
        font-size: 1.2rem;
        color: #ccc;
        position: absolute;
        top: 10px;
        left: 8px;
      }

      .search-input {
        padding: 0.5rem 1rem 0.5rem 2rem;
        background-color: #2a2a2a;
        border: none;
        border-radius: 8px;
        color: white;
        flex: 1;
      }

      .search-input::placeholder {
        color: #888;
      }

      .search-results {
        list-style: none;
        margin: 0;
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