import '../component/side-bar.js';
import '../component/header-bar.js';
import '../component/app-bar.js';
import { async } from 'regenerator-runtime';

const main = () => {
    const baseUrl = 'https://football98.p.rapidapi.com';
    const key = 'e7b3edc066mshea564c840564b1cp1c7531jsn1797995ece92';

    const renderError = () => {
        const article = document.querySelector('article');
        article.innerHTML = '';
        const content = document.createElement('div');
        content.classList.add('content')
        article.append(content);
        content.innerHTML += `
                <h5 class="text-center text-secondary">Sorry, we have exceeded the daily quota for requests on the current API!</h5>
                `;
    }

    const sideElement = document.querySelector('side-bar');
    function onSideBarClicked() {
        sideElement.querySelectorAll('.leagues').forEach(element => {
            element.classList.remove('active')
        });
        this.classList.add("active")
        if (this.id === 'premierleague') {
            document.querySelector('#title').innerHTML = '<h1><img src="img/premierleague.png" class="mr-2" width="70">PREMIER LEAGUE</h1>';
            renderData(this.id);
        } else if (this.id === 'liga') {
            document.querySelector('#title').innerHTML = '<h1><img src="img/la-liga.png" class="mr-2" width="70">LA LIGA</h1>';
            renderData(this.id);
        } else if (this.id === 'seriea') {
            document.querySelector('#title').innerHTML = '<h1><img src="img/serie-a.png" class="mr-2" width="70">SERIE A</h1>';
            renderData(this.id);
        } else if (this.id === 'bundesliga') {
            document.querySelector('#title').innerHTML = '<h1><img src="img/bundes-liga.png" class="mr-2" width="70">BUNDES LIGA</h1>';
            renderData(this.id);
        } else if (this.id === 'ligue1') {
            document.querySelector('#title').innerHTML = '<h1><img src="img/league-1.png" class="mr-2" width="70">LIGUE 1</h1>';
            renderData(this.id);
        } else if (this.id === 'championsleague') {
            document.querySelector('#title').innerHTML = '<h1><img src="img/championsleague.png" class="mr-2" width="70">CHAMPIONS LEAGUE</h1>';
            renderData(this.id);
        } else if (this.id === 'europaleague') {
            document.querySelector('#title').innerHTML = '<h1><img src="img/europa-league.png" class="mr-2" width="100">EUROPA LEAGUE</h1>';
            renderData(this.id);
        } else if (this.id === 'fifaworldcup') {
            document.querySelector('#title').innerHTML = '<h1><img src="img/fifa.png" class="mr-2" width="100">FIFA WORLD CUP 2022</h1>';
            renderData(this.id);
        }

    }
    sideElement.clickEvent = onSideBarClicked;

    const headerBarElement = document.querySelector('header-bar');
    function onHeaderBarClicked() {
        headerBarElement.querySelectorAll('.button p').forEach(el => {
            el.classList.remove("button-active");
        });
        this.classList.add("button-active");
        renderData(sideElement.querySelector('.leagues.active').id);
    }
    headerBarElement.clickEvent = onHeaderBarClicked;

    const getLeagues = async (league = 'premierleague') => {
        try {
            const response = await fetch(`${baseUrl}/${league}/table`, {
                headers: {
                    'X-RapidAPI-Key': key,
                    'X-RapidAPI-Host': 'football98.p.rapidapi.com'
                }
            });
            const responseJson = await response.json();
            showLeagues(responseJson);
        } catch {
            renderError();
        }
    }

    const showLeagues = response => {
        const article = document.querySelector('article');
        article.innerHTML = '';
        const content = document.createElement('div');
        content.classList.add('content')
        article.append(content);
        response.forEach(el => {
            content.innerHTML += `
                                    <div class="club mb-3">
                                        <div class="position"><b>${el.Position}</b></div>
                                        <div class="squad-logo"><img src="${el.SquadLogo}" width="35">
                                        </div>
                                        <div class="info-standing">
                                            <div class="">${el.Name}</div>
                                            <div class="status-match">
                                                <div class="win">${el.Winned} W</div>
                                                <div class="draw">${el.Tie} D</div>
                                                <div class="lose">${el.Loosed} L</div>
                                            </div>
                                        </div>
                                        <div class="match">
                                            ${el.Played}
                                        </div>
                                        <div class="points">
                                            <b>${el.Points}</b>
                                        </div>
                                    </div>`;

        })
    }

    const getNews = async (league = 'premierleague') => {
        try {
            const response = await fetch(`${baseUrl}/${league}/news`, {
                headers: {
                    'X-RapidAPI-Key': key,
                    'X-RapidAPI-Host': 'football98.p.rapidapi.com'
                }
            });
            const responseJson = await response.json();
            showNews(responseJson);
        } catch {
            renderError()
        }
    }

    const showNews = response => {
        const article = document.querySelector('article');
        article.innerHTML = '';
        const content = document.createElement('div');
        content.classList.add('content');
        article.append(content);
        const row = document.createElement('div');
        row.classList.add('row');
        content.append(row);
        response.forEach(el => {
            row.innerHTML += `
                            <div class="col-md-4">
                                <div class="card mb-3">
                                    <img class="card-img-top" src="${el.Image}">
                                    <div class="card-body">
                                        <p class="card-text">${el.Title}
                                        </p>
                                        <p class="card-text"><small class="text-muted"><img src='${el.PublisherLogo}' width='20'>${el.PublisherName}</small>
                                        </p>
                                        <p class="card-text"><small class="text-muted">Last updated ${el.PublisherDate}</small></p>
                                        <a href="${el.NewsLink}" class="card-link" target='_blank'>Read more</a>
                                    </div>
                                </div>
                            </div>
                            `;
        })
    }

    const getFixtures = async (league = 'premierleague') => {
        try {
            const response = await fetch(`${baseUrl}/${league}/fixtures`, {
                headers: {
                    'X-RapidAPI-Key': key,
                    'X-RapidAPI-Host': 'football98.p.rapidapi.com'
                }
            });
            const responseJson = await response.json();
            showFixtures(responseJson[0]);
        } catch {
            renderError();
        }
    }

    const showFixtures = response => {
        const article = document.querySelector('article');
        article.innerHTML = "";
        for (let result in response) {
            let div = document.createElement('div');
            div.classList.add('content');
            let h5 = document.createElement('h5');
            h5.innerText = `${result}`;
            div.append(h5);
            response[result].forEach(el => {
                div.innerHTML += `
                                    <div class="club fixtures">
                                        <div class="homeTeam">
                                            <img src="${el.homeLogo}" width="40" class="mr-2">
                                            <p>${el.homeTeam}</p>
                                        </div>
                                        <div class="time">
                                            <img src="img/calendar.png" width="20">
                                            <p>${el.MatchDay}</p>
                                        </div>
                                        <div class="awayTeam">
                                            <p>${el.awayTeam}</p>
                                            <img src="${el.awayLogo}" width="40" class="ml-2">
                                        </div>
                                    </div>
                                `;
            });
            article.append(div);
        }
    }

    const getResult = async (league = 'premierleague') => {
        try {
            const response = await fetch(`${baseUrl}/${league}/results`, {
                headers: {
                    'X-RapidAPI-Key': key,
                    'X-RapidAPI-Host': 'football98.p.rapidapi.com'
                }
            });
            const responseJson = await response.json();
            showResult(responseJson[0]);
        } catch {
            renderError()
        }
    }

    const showResult = response => {
        const article = document.querySelector('article');
        article.innerHTML = "";
        if (Object.values(response).length == 0) {
            article.innerHTML += '<div class="content"><h4 class="text-center text-secondary">The Match Hasn\'t Started Yet!</h4></div>';
        } else {
            for (let result in response) {
                let div = document.createElement('div');
                div.classList.add('content');
                let h5 = document.createElement('h5');
                h5.innerText = `${result}`;
                div.append(h5);
                response[result].forEach(el => {
                    div.innerHTML += `
                                    <div class="club result" >
                                        <div class="homeTeam">
                                            <img src="${el.homeLogo}" class="mr-3">
                                            <p>${el.homeTeam}</p>
                                        </div>
                                        <div class="time">
                                            <p><b>${el.homeTeamScore === "" ? 0 : el.homeTeamScore} - ${el.awayTeamScore === "" ? 0 : el.awayTeamScore}</b></p>
                                        </div>
                                        <div class="awayTeam">
                                            <p>${el.awayTeam} <img src="${el.awayLogo}" class="ml-3"></p>
                                        </div>
                                    </div >
                                    `;
                });
                article.append(div);
            }
        }
    }

    const renderData = (league = 'premierleague') => {
        const article = document.querySelector('article');
        article.innerHTML = `
                            <div class="content loading">
                                <img src="./img/spinning-loading.gif" width="100">
                            </div>`;
        const headerButton = document.querySelector('header-bar .button-active');
        if (headerButton.id === 'fixtures') {
            getFixtures(league);
        } else if (headerButton.id === 'news') {
            getNews(league);
        } else if (headerButton.id === 'standings') {
            getLeagues(league);
        } else {
            getResult(league);
        }
    }

    renderData();


    // toggler
    const appBarElement = document.querySelector('app-bar');
    const onTogglerClicked = () => {
        appBarElement.span[0].classList.toggle('rotate45');
        appBarElement.span[1].classList.toggle('isLost')
        appBarElement.span[2].classList.toggle('rotate-45');
    }
    appBarElement.clickEvent = onTogglerClicked;

    // responsive
    if (window.innerWidth >= 991) {
        sideElement.classList.add('show');
    } else {
        sideElement.classList.remove('show')
        appBarElement.span[0].classList.remove('rotate45');
        appBarElement.span[1].classList.remove('isLost');
        appBarElement.span[2].classList.remove('rotate-45');
    }

    const onresize = function (e) {
        const width = e.target.outerWidth;
        if (width >= 991) {
            sideElement.classList.add('show');
        } else if (width) {
            sideElement.classList.remove('show')
            appBarElement.span[0].classList.remove('rotate45');
            appBarElement.span[1].classList.remove('isLost');
            appBarElement.span[2].classList.remove('rotate-45');
        }
    }
    window.addEventListener("resize", onresize);
}

export default main;