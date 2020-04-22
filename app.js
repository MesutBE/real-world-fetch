class fetchInit {
    method = '';
    body = '';
    headers = '';

    constructor (data){
        this.method = "POST";
        this.body = JSON.stringify(data);
        this.headers = { "content-type": "application/json" };
    }
}

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    fetch(`https://pokeapi.co/api/v2/pokemon/${data.pokemonName}`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then(json => {
            const h1El = document.createElement('h1');
            h1El.innerText = json.name;

            const pEl = document.createElement('p');
            const imgEl = document.createElement('img');
            imgEl.src = json.sprites.front_default;

            pEl.appendChild(imgEl);

            const resultEl = document.getElementById('result');
            resultEl.appendChild(h1El);
            resultEl.appendChild(pEl);
            console.log(json);
        })
        .catch(error => {
            const divEl = document.createElement('div');
            divEl.innerText = `! Couldn't find \"${data.pokemonName}\"`
            
            const resultEl = document.getElementById('result');
            resultEl.appendChild(divEl);

            console.log(resultEl);
            console.error(error)
        });
});

