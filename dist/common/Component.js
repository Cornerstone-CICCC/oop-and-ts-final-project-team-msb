export class Component {
    constructor(props = {}) {
        this.props = props;
        this.element = null;
    }
    render() {
        throw new Error("Component should have a render() method!");
    }
    mount(container) {
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
//# sourceMappingURL=Component.js.map