// ================= SLIDER PRINCIPAL =================
const slides = document.querySelectorAll('.slide');
const titulo = document.getElementById('titulo');
const texto = document.getElementById('texto');

let index = 0;

const conteudos = [
  { titulo: "Recicle Hoje 🌱", texto: "Pequenas ações fazem grandes mudanças" },
  { titulo: "Salve o Planeta 🌍", texto: "O futuro depende de nós" },
  { titulo: "Menos Lixo ♻️", texto: "Reciclar é cuidar do mundo" }
];

if (slides.length > 0 && titulo && texto) {
  const sliderPrincipal = setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');

    titulo.innerText = conteudos[index].titulo;
    texto.innerText = conteudos[index].texto;

    titulo.classList.remove('animar');
    texto.classList.remove('animar');

    void titulo.offsetWidth;

    titulo.classList.add('animar');
    texto.classList.add('animar');
  }, 3000);
}

// ================= SCROLL ANIMATION (MANTIDO E INTEGRADO) =================
const elements = document.querySelectorAll('.fade');

function mostrarAoScroll() {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add('show');
    }
  });
}

// Roda ao carregar
window.addEventListener('load', mostrarAoScroll);

// Roda no scroll
window.addEventListener('scroll', mostrarAoScroll);


// ================= SLIDER VERTICAL =================
const slidesV = document.querySelectorAll('.slide-v');
const titulo2 = document.getElementById('titulo2');
const texto2 = document.getElementById('texto2');

let indexV = 0;

const conteudosV = [
  { titulo: "Por que reciclar?", texto: "A reciclagem reduz o lixo e protege o meio ambiente." },
  { titulo: "Preserve a natureza 🌳", texto: "Menos poluição significa mais vida no planeta." },
  { titulo: "Faça a diferença ♻️", texto: "Pequenas atitudes mudam o mundo." }
];

if (slidesV.length > 0 && titulo2 && texto2) {
  const sliderVertical = setInterval(() => {

    // Guarda a imagem que está saindo
    const slideSaindo = slidesV[indexV];
    
    // Imagem atual sobe
    slideSaindo.classList.remove('active');
    slideSaindo.classList.add('up');

    // Tira a classe 'up' depois de 1 segundo (tempo da animação CSS)
    // Assim ela volta lá para o fundo (100%) escondida, sem o usuário ver
    setTimeout(() => {
      slideSaindo.classList.remove('up');
    }, 1000);

    // Atualiza o index para a próxima
    indexV = (indexV + 1) % slidesV.length;

    // Ativa próxima imagem
    slidesV[indexV].classList.add('active');

    // Troca texto
    titulo2.innerText = conteudosV[indexV].titulo;
    texto2.innerText = conteudosV[indexV].texto;

    // Anima texto
    titulo2.classList.remove('animar');
    texto2.classList.remove('animar');

    void titulo2.offsetWidth; // Força o reflow do navegador

    titulo2.classList.add('animar');
    texto2.classList.add('animar');
    
  }, 4000);
}

// Remove a tela branca e faz o site surgir suavemente
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});


// ================= GRÁFICO INTERATIVO E PDF (MANTIDO) =================
let ctx = document.getElementById('meuGraficoReal');
let dadosBase = [10, 25, 40, 55, 70, 90]; 
let graficoCarbono = null;

if (ctx) {
  graficoCarbono = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['2023', '2024', '2025', '2026', '2027', '2028'],
      datasets: [{
        label: 'Volume de Reciclagem Projetado (t)',
        data: dadosBase,
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderWidth: 3,
        fill: true,
        tension: 0.4 // Deixa a linha curvada e suave
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, suggestedMax: 300 }
      }
    }
  });
}

// Função que muda o gráfico quando o usuário mexe nos sliders
function atualizarGrafico() {
  if (!graficoCarbono) return;

  // Pega o valor atual dos 3 sliders
  let vReciclagem = parseInt(document.getElementById('sliderReciclagem').value);
  let vTransporte = parseInt(document.getElementById('sliderTransporte').value);
  let vConsumo = parseInt(document.getElementById('sliderConsumo').value);

  // Cria um multiplicador baseado no esforço do usuário
  let multiplicador = (vReciclagem + vTransporte + vConsumo) / 100;

  // Atualiza os dados da linha multiplicando a base pelo esforço
  let novosDados = dadosBase.map(valor => valor * multiplicador);
  
  graficoCarbono.data.datasets[0].data = novosDados;
  graficoCarbono.update(); // Manda o gráfico se redesenhar
}

// Atualiza o subtítulo com o nome preenchido
function atualizarNomeRelatorio() {
  let nome = document.getElementById('inputNome').value;
  let subtitulo = document.getElementById('subtituloGrafico');
  
  if (nome.trim() !== "") {
    subtitulo.innerText = "Relatório de Sustentabilidade: " + nome;
  } else {
    subtitulo.innerText = "Relatório Geral de Sustentabilidade";
  }
}

// Função para gerar e baixar o PDF
function baixarPDF() {
  // Pega a área inteira do gráfico
  let elemento = document.getElementById('areaRelatorio');
  let nomeUsuario = document.getElementById('inputNome').value || "Comunidade";
  
  // Configurações do PDF
  let opt = {
    margin:       10,
    filename:     `Relatorio_Sustentabilidade_${nomeUsuario}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
  };

  // Chama a biblioteca para criar o PDF
  html2pdf().set(opt).from(elemento).save();
}