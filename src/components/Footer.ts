import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `<p>Kanban Board by Team MSB © 2025</p>`;

    const style = document.createElement("style");
    style.textContent = `
      .footer {
        text-align: center;
        padding: 1rem;
        color: #aaa;
        font-size: 0.9rem;
        background-color: #1a1a1a;
        border-top: 1px solid #333;
      }
    `;

    document.head.appendChild(style);
    return footer;
  }
}
