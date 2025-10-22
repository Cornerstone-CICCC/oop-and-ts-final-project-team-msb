export class Component {
  props: any;
  element: HTMLElement | null;

  constructor(props = {}) {
    this.props = props;
    this.element = null;
  }

  render(): HTMLElement {
    throw new Error("Component should have a render() method!");
  }

  mount(container: HTMLElement | null) {
    if (container) {
      this.element = this.render();
      container.appendChild(this.element);
    }
  }

  unmount() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
      this.element = null;
    }
  }
}
