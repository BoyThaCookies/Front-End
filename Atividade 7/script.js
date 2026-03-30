// =============================================
//  BICHINHO VIRTUAL - script.js (corrigido + completo)
// =============================================

// --- Elementos do DOM ---
const img        = document.getElementById("mainImage");
const avatarImg  = document.getElementById("avatarImg");
const hungerBar  = document.getElementById("hunger-bar");
const hungerLabel= document.getElementById("hunger-label");
const statusBadge= document.getElementById("status-badge");
const timerDisp  = document.getElementById("timer-display");
const logDisp    = document.getElementById("log-display");
const nomeDisplay= document.getElementById("nomeDisplay");
const nomeInput  = document.getElementById("nomeInput");
const heartsArea = document.getElementById("hearts-area");
const starsContainer = document.getElementById("stars-container");

// --- Imagens da criatura ---
const estados = {
    normal:  "b_n.png",   // normal / início
    comendo: "b_co.png",  // comendo
    feliz:   "b_fe.png",  // alimentado / feliz
    fome30:  "b_fo.png",  // com fome (30s)
    fome60:  "b_de.png",  // com muita fome / bravo (60s)
    morto:   "b_m.png"    // morto
};

// --- Fundos dia / noite ---
const fundoDia   = "background.png";
const fundoNoite = "background_noite.png";

// --- Estado global ---
let contador       = 0;     // segundos desde a última refeição
let tempoVivo      = 0;     // segundos totais vivo
let estaMorto      = false;
let modoManualNoite = false; // toggle manual

let intervalo      = null;  // setInterval principal
let timeoutClique  = null;  // timeout após clicar na comida
let timeoutBack    = null;  // timeout para voltar ao normal após feliz
let horasIntervalo = null;  // setInterval do ciclo dia/noite
let horas          = 0;     // hora simulada (0-23)

// =============================================
//  FUNÇÕES PRINCIPAIS
// =============================================

/**
 * Inicia o loop de controle do bichinho.
 * A cada segundo: incrementa contador, verifica estado.
 */
function controle() {
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        if (estaMorto) return;

        contador++;
        tempoVivo++;
        timerDisp.textContent = formatarTempo(tempoVivo);
        atualizarBarraFome();

        // Muda de estado conforme o tempo sem comer
        if (contador === 30) {
            img.src = estados.fome30;
            avatarImg.src = estados.fome30;
            img.classList.add("hungry");
            setStatus("😟 Com fome", "warning");
            log("Está com fome...");
        }

        if (contador === 60) {
            img.src = estados.fome60;
            avatarImg.src = estados.fome60;
            setStatus("😡 Com muita fome", "error");
            log("Está faminto e bravo!");
        }

        // Morte após 90 segundos sem comer
        if (contador >= 90) {
            morrer();
        }

    }, 1000);
}

/**
 * Alimenta a criatura quando o usuário clica na comida.
 */
function alimentar() {
    // Ressuscita se estiver morto
    if (estaMorto) {
        ressuscitar();
        return;
    }

    // Limpa timeouts anteriores
    if (timeoutClique) clearTimeout(timeoutClique);
    if (timeoutBack)   clearTimeout(timeoutBack);

    // Remove classes de animação
    img.classList.remove("hungry", "eating", "morto");

    img.src = estados.comendo;
    avatarImg.src = estados.comendo;
    img.classList.add("eating");

    contador = 0; // reseta o contador de fome
    log("Nhac nhac! 😋");
    setStatus("🍓 Comendo!", "success");
    atualizarBarraFome();

    timeoutClique = setTimeout(() => {
        img.src = estados.feliz;
        avatarImg.src = estados.feliz;
        img.classList.remove("eating");
        setStatus("😊 Feliz e saciado!", "success");
        mostrarCoracao();
        log("Que delícia! 💖");

        timeoutBack = setTimeout(() => {
            img.src = estados.normal;
            avatarImg.src = estados.normal;
            setStatus("😊 Feliz", "success");
            log("Voltando ao normal...");
        }, 2000);

    }, 1000);
}

/**
 * Mata a criatura.
 */
function morrer() {
    estaMorto = true;
    img.src = estados.morto;
    avatarImg.src = estados.morto;
    img.classList.remove("hungry", "eating");
    img.classList.add("morto");
    setStatus("💀 Morreu...", "error");
    log("Morreu de fome... clique na comida para ressuscitar!");
    hungerBar.style.width = "0%";
    hungerBar.classList.add("bg-gray-400");
    hungerLabel.textContent = "Morto";
}

/**
 * Ressuscita a criatura quando alimentada após a morte.
 */
function ressuscitar() {
    estaMorto = false;
    contador = 0;
    tempoVivo = 0;
    img.classList.remove("morto");
    img.classList.add("reviving");
    img.src = estados.feliz;
    avatarImg.src = estados.feliz;
    hungerBar.classList.remove("bg-gray-400");
    setStatus("✨ Ressuscitou!", "success");
    log("Voltou à vida! 🎉");
    mostrarCoracao();

    setTimeout(() => {
        img.classList.remove("reviving");
        img.src = estados.normal;
        avatarImg.src = estados.normal;
        setStatus("😊 Feliz", "success");
    }, 1000);
}

/**
 * Interação ao clicar na criatura (exibe coração se viva).
 */
function interagir() {
    if (estaMorto) {
        log("Está morto... alimente para ressuscitar!");
        return;
    }
    mostrarCoracao();
    log("Que fofinho! 💕");
}

// =============================================
//  CICLO DIA / NOITE
// =============================================

/**
 * Inicia o ciclo automático de dia e noite.
 * Cada "hora" dura 100ms → ciclo de 24h em ~2.4s (simulado)
 */
function atualizarFundo() {
    if (horasIntervalo) clearInterval(horasIntervalo);

    horasIntervalo = setInterval(() => {
        if (modoManualNoite) return; // respeita toggle manual

        horas++;
        if (horas >= 24) horas = 0;

        aplicarFundo(horas >= 12 && horas < 22);
    }, 3000); // avança 1h simulada a cada 3 segundos reais
}

/**
 * Aplica o fundo correto e gerencia as estrelas.
 */
function aplicarFundo(noite) {
    if (noite) {
        document.body.style.backgroundImage = `url('${fundoNoite}')`;
        document.body.classList.add("noite");
    } else {
        document.body.style.backgroundImage = `url('${fundoDia}')`;
        document.body.classList.remove("noite");
    }
    document.getElementById("toggleNoite").checked = noite;
}

/**
 * Toggle manual para alternar dia/noite.
 */
function alternarModoManual() {
    modoManualNoite = document.getElementById("toggleNoite").checked;
    aplicarFundo(modoManualNoite);
}

// =============================================
//  UTILITÁRIOS
// =============================================

function atualizarBarraFome() {
    // Fome aumenta de 0 a 90s → barra vai de 100% a 0%
    const pct = Math.max(0, Math.min(100, 100 - (contador / 90) * 100));
    hungerBar.style.width = pct + "%";

    // Cor dinâmica
    if (pct > 60) {
        hungerBar.className = "h-full rounded-full bg-gradient-to-r from-green-400 to-lime-300";
        hungerLabel.textContent = "Saciado";
    } else if (pct > 30) {
        hungerBar.className = "h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-300";
        hungerLabel.textContent = "Com fome";
    } else {
        hungerBar.className = "h-full rounded-full bg-gradient-to-r from-red-500 to-pink-400";
        hungerLabel.textContent = "Faminto!";
    }
}

function setStatus(texto, tipo) {
    const cores = {
        success: "badge-success",
        warning: "badge-warning",
        error:   "badge-error",
        info:    "badge-info"
    };
    statusBadge.className = `badge badge-sm mt-1 ${cores[tipo] || "badge-ghost"}`;
    statusBadge.textContent = texto;
}

function log(msg) {
    logDisp.textContent = msg;
}

function formatarTempo(s) {
    if (s < 60) return s + "s";
    return Math.floor(s / 60) + "m " + (s % 60) + "s";
}

function mostrarCoracao() {
    const heart = document.createElement("span");
    heart.textContent = ["💖","💕","✨","🌸"][Math.floor(Math.random()*4)];
    heart.className = "heart-anim";
    heart.style.left = (Math.random() * 60 - 30) + "px";
    heartsArea.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
}

function atualizarNome() {
    const nome = nomeInput.value.trim();
    nomeDisplay.textContent = nome ? "🐾 " + nome : "";
}

// Gera estrelas aleatórias no background
function criarEstrelas(n) {
    for (let i = 0; i < n; i++) {
        const s = document.createElement("div");
        s.className = "star";
        s.style.top  = Math.random() * 100 + "vh";
        s.style.left = Math.random() * 100 + "vw";
        s.style.animationDelay = Math.random() * 3 + "s";
        s.style.animationDuration = (1.5 + Math.random() * 2) + "s";
        starsContainer.appendChild(s);
    }
}

// =============================================
//  INICIALIZAÇÃO
// =============================================
criarEstrelas(60);
controle();
atualizarFundo();
log("Olá! Cuide bem de mim 🐣");
