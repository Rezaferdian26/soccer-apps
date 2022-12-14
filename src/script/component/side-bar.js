class SideBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    render() {
        this.innerHTML = `
                <h5>TOP LEAGUES</h5>
                <div class="leagues mb-2 active" id="premierleague">
                    <div class="icon-wrapper">
                        <img src="img/premierleague.png" width="40">
                    </div>
                    <span class="ml-2">Premier League</span>
                </div>
                <div class="leagues mb-2" id="liga">
                    <div class="icon-wrapper">
                        <img src="img/la-liga.png" width="40">
                    </div>
                    <span class="ml-2">La Liga</span>
                </div>
                <div class="leagues mb-2" id="seriea">
                    <div class="icon-wrapper">
                        <img src="img/serie-a.png" width="40">
                    </div>
                    <span class="ml-2">Serie A</span>
                </div>
                <div class="leagues mb-2" id="bundesliga">
                    <div class="icon-wrapper">
                        <img src="img/bundes-liga.png" width="40">
                    </div>
                    <span class="ml-2">Bundesliga</span>
                </div>
                <div class="leagues mb-2" id="ligue1">
                    <div class="icon-wrapper">
                        <img src="img/league-1.png" width="40">
                    </div>
                    <span class="ml-2">Ligue 1</span>
                </div>
                <div class="leagues mb-2" id="championsleague">
                    <div class="icon-wrapper">
                        <img src="img/championsleague.png" width="40">
                    </div>
                    <span class="ml-2">Champions League</span>
                </div>
                <div class="leagues mb-2" id="europaleague">
                    <div class="icon-wrapper">
                        <img src="img/europa-league.png" width="40">
                    </div>
                    <span class="ml-2">Europa League</span>
                </div>
                <div class="leagues mb-2" id="fifaworldcup">
                    <div class="icon-wrapper">
                        <img src="img/fifa.png" width="40">
                    </div>
                    <span class="ml-2">Fifa World Cup 2022</span>
                </div>
            `;

        this.querySelectorAll('.leagues').forEach(element => {
            element.addEventListener('click', this._clickEvent);
        });
    }
}

customElements.define('side-bar', SideBar);