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
          <input type="text" placeholder="Search task..." class="search-input" />
          <ul class="search-results"></ul>
        </div>
        <h1 class="app-title">KanbanMSB</h1>
        <div class="info-button">
          <i class="fas fa-circle-info"></i>
        </div>
      </div>
    `;
        // Obtiene los elementos
        const input = header.querySelector(".search-input");
        const results = header.querySelector(".search-results");
        input.addEventListener("input", () => {
            const query = input.value.trim().toLowerCase();
            results.innerHTML = "";
            if (query === "") {
                results.style.display = "none";
                return;
            }
            // Filtra correctamente usando title (seguro que las tareas tienen ese campo)
            const filtered = this.allTasks.filter((task) => task.title.toLowerCase().includes(query));
            // Muestra resultados
            filtered.forEach((task) => {
                const li = document.createElement("li");
                li.textContent = task.title;
                li.className = "search-result-item";
                li.addEventListener("click", () => {
                    this.onTaskClick(task); // <-- abre el modal ya funcional
                    input.value = "";
                    results.innerHTML = "";
                    results.style.display = "none";
                });
                results.appendChild(li);
            });
            results.style.display = filtered.length > 0 ? "block" : "none";
        });
        // Oculta resultados si haces clic fuera del contenedor
        document.addEventListener("click", (e) => {
            if (!header.contains(e.target)) {
                results.innerHTML = "";
                results.style.display = "none";
            }
        });
        return header;
    }
}
//# sourceMappingURL=Header.js.map