const html = document.querySelector('html');
const botoes = document.querySelectorAll(".app__card-button");
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const titulo = document.querySelector(".app__title");
const banner = document.querySelector(".app__image");
const startPauseBT = document.querySelector('#start-pause');
const iniciarOuPausaBt = document.querySelector('#start-pause span')
const startPauseBtIcon = document.querySelectorAll('.app__card-primary-butto-icon')
const cronometro = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3'); //readFile()
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')


let tempoDecorridoEmSegundos = 7200
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 7200
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1800
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 3600
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(botao => {
        botao.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `<strong class="app__title-strong">Você tem esse tempo para focar.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `<strong class="app__title-strong">Se alongue / brinque com o DOG!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `<strong class="app__title-strong">Pratique no Duolingo.</strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
       audioTempoFinalizado.play()
       alert('Tempo finalizado!')
       zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBT.addEventListener('click', iniciarOuPausa)

function iniciarOuPausa() {
    if(intervaloId) {
        audioPausa.play();
        zerar()
        return
        
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausaBt.textContent = "Pausar"
    startPauseBtIcon.forEach(startPauseBtIcon => {
        startPauseBtIcon.src = '/imagens/pause.png';
      });
}

function zerar() {

    clearInterval(intervaloId)
    iniciarOuPausaBt.textContent = "Começar"
    startPauseBtIcon.forEach(startPauseBtIcon => {
        startPauseBtIcon.src = '/imagens/play_arrow.png';
      });
    intervaloId = null
}

function mostrarTempo() {
    const horas = Math.floor(tempoDecorridoEmSegundos / 3600);
    const minutos = Math.floor((tempoDecorridoEmSegundos % 3600) / 60);
    const segundos = tempoDecorridoEmSegundos % 60;

    // Formatando o tempo com o formato desejado
    const tempoFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    
    cronometro.innerHTML = tempoFormatado;
}


 mostrarTempo()