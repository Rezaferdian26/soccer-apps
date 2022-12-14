class HeaderBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }
    render() {
        this.innerHTML = `
        <h1 class="text-center mb-4" id="title"><img src="img/premierleague.png" width="70"
        class="mr-2">Premier League</h1>
        <hr>
        <div class="row" id="menu">
            <div class="col-3 button">
                <p class="button-active text-center" id="standings"><b>Standings</b></p>
            </div>
            <div class="col-3 button">
                <p class="text-center" id="result"><b>Results</b></p>
            </div>
            <div class="col-3 button">
                <p class="text-center" id="fixtures"><b>Fixtures</b></p>
            </div>
            <div class="col-3 button">
                <p class="text-center" id="news"><b>News</b></p>
            </div>
        </div>
        `;
        this.querySelectorAll('.button p').forEach(element => {
            element.addEventListener('click', this._clickEvent)
        });
    }

}
customElements.define('header-bar', HeaderBar);