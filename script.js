let btn = document.querySelector('#app form button')
let input = document.querySelector('#app form input')
let content = document.querySelector('#app main')

btn.addEventListener('click', (event) => {
    event.preventDefault()

    let champion = input.value.trim()

    champion = champion.toLowerCase()

    let split = champion.split(' ')

    for (let i = 0; i < split.length; i++) {
        let j = split[i].charAt(0).toUpperCase();
        split[i] = j + split[i].substr(1);
    }

    champion = split.join("");

    axios
        .get('https://ddragon.leagueoflegends.com/cdn/11.18.1/data/pt_BR/champion/' + champion + '.json')

    .then((response) => {
        content.innerHTML = ''
        input.value = ''
        createLine(response.data.data[champion].name, 'nome')
        createLine(response.data.data[champion].title, 'titulo')
        createImg(response.data.data[champion].id)
    })

    .catch(() => {
        input.value = ''
        content.innerHTML = ''
        createLine('Ops, algo deu errado!')
    })

    function createLine(text, classe) {
        let line = document.createElement('p')
        let texto = document.createTextNode(text)
        line.className = classe
        line.appendChild(texto)
        content.appendChild(line)
    }

    function createImg(img) {
        let background = document.createElement('div')
        let championImg = document.createElement('img')
        championImg.src = 'tiles/' + img + '_0.jpg'
        content.appendChild(background)
        background.appendChild(championImg)
        console.log(championImg.src)
    }

})