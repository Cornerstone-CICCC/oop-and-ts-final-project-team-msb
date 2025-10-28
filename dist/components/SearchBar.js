import { Component } from "../common/Component.js";
import { Modal } from "./Modal.js";
export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const container = document.createElement("div");
        container.className = "search-container";
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search task...";
        input.className = "search-input";
        const resultList = document.createElement("ul");
        resultList.className = "search-results";
        resultList.style.display = "none";
        input.addEventListener("input", () => {
            const query = input.value.trim().toLowerCase();
            resultList.innerHTML = "";
            if (query === "") {
                resultList.style.display = "none";
                return;
            }
            const filteredTasks = this.props.allTasks.filter((task) => task.title.toLowerCase().includes(query));
            if (filteredTasks.length === 0) {
                resultList.style.display = "none";
                return;
            }
            filteredTasks.forEach((task) => {
                const li = document.createElement("li");
                li.className = "search-result-item";
                li.textContent = task.title;
                li.addEventListener("click", () => {
                    const modal = new Modal({
                        task,
                        onSave: (updatedData) => {
                            Object.assign(task, updatedData);
                            console.log("Task updated:", task);
                        },
                        onClose: () => console.log("Modal closed"),
                    });
                    const modalElement = modal.render();
                    document.body.appendChild(modalElement);
                    input.value = "";
                    resultList.innerHTML = "";
                    resultList.style.display = "none";
                });
                resultList.appendChild(li);
            });
            resultList.style.display = "block";
        });
        document.addEventListener("click", (e) => {
            if (!container.contains(e.target)) {
                resultList.style.display = "none";
            }
        });
        container.append(input, resultList);
        return container;
    }
}
//# sourceMappingURL=SearchBar.js.map