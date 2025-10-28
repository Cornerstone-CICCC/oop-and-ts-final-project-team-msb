import { Component } from "../common/Component.js";
import { SearchBar } from "./SearchBar.js";
import { TaskContext } from "../contexts/TasksContext.js";

interface HeaderProps {
  getAllTasks?: () => TaskContext[];
  onTaskClick?: (task: TaskContext) => void;
}

export class Header extends Component {
  props: HeaderProps;

  constructor(props: HeaderProps = {}) {
    super(props);
    this.props = props;
  }

  render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "header";

    header.innerHTML = `
      <div class="header-content position-relative">
        <div id="search-slot"></div>
        <h1 class="app-title">KanbanMSB</h1>
        <div class="info-button">
          <i class="fas fa-circle-info"></i>
        </div>
      </div>
    `;

    const searchSlot = header.querySelector("#search-slot");

    if (searchSlot && this.props.getAllTasks && this.props.onTaskClick) {
      const searchBar = new SearchBar({
        allTasks: this.props.getAllTasks(),
        onTaskClick: this.props.onTaskClick,
      }).render();
      searchSlot.appendChild(searchBar);
    }

    return header;
  }
}
