class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get span() {
        return this.querySelectorAll('button span');
    }

    render() {
        this.innerHTML = `
            <nav class="navbar fixed-top">
                <a href="#" class="navbar-brand text-white font-weight-bold logo" style="font-size: 1.5em ;">
                    <div class="icon-wrapper mr-2">
                        <img src="img/iconsepakbola.png" alt="logo">
                    </div>
                    Soccer Apps
                </a>
                <button class="btn toggler" type="button" data-toggle="collapse" data-target="#side-bar"
                    aria-expanded="false" aria-controls="collapseExample">
                    <span></span><span></span><span></span>
                </button>
            </nav>
        `;
        this.querySelector('.toggler').addEventListener('click', this._clickEvent);
    }
}
customElements.define('app-bar', AppBar);