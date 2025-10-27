import { Component } from "../common/Component.js";
import { TaskContext } from "../contexts/TasksContext.js";

interface SearchBarProps {
    allTasks: TaskContext[];
    onTaskClick: (task: TaskContext) => void;
  }
  
  export class SearchBar extends Component {
    props: SearchBarProps;
  
    constructor(props: SearchBarProps) {
      super(props);
      this.props = props;
    }
  
    render() {
      const container = document.createElement("div");
  
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Search task...";
      input.className = "search-input";
  
      const resultList = document.createElement("ul");
      resultList.className = "search-results";
  
      input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        resultList.innerHTML = "";
  
        if (query === "") return;
  
        const filtered = this.props.allTasks.filter((task) =>
          task.title.toLowerCase().includes(query)
        );
  
        filtered.forEach((task) => {
          const li = document.createElement("li");
          li.textContent = task.title;
          li.addEventListener("click", () => this.props.onTaskClick(task));
          resultList.appendChild(li);
        });
      });
  
      container.append(input, resultList);
      return container;
    }
  }
  