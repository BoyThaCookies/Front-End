// Elementos
    var img           = document.getElementById("mainImage");
    var avatarImg     = document.getElementById("avatarImg");
    var hungerBar     = document.getElementById("hunger-bar");
    var hungerLabel   = document.getElementById("hunger-label");
    var statusBadge   = document.getElementById("status-badge");
    var timerDisp     = document.getElementById("timer-display");
    var logDisp       = document.getElementById("log-display");
    var nomeDisplay   = document.getElementById("nomeDisplay");
    var nomeInput     = document.getElementById("nomeInput");
    var heartsArea    = document.getElementById("hearts-area");
    var starsContainer= document.getElementById("stars-container");
    var toggleNoite   = document.getElementById("toggleNoite");

    var estados = {
      normal:  "b_n.png",
      comendo: "b_co.png",
      feliz:   "b_fe.png",
      fome30:  "b_fo.png",
      fome60:  "b_de.png",
      morto:   "b_m.png"
    };

    var fundoDia   = "background.png";
    var fundoNoite = "background_noite.png";

    var contador        = 0;
    var tempoVivo       = 0;
    var estaMorto       = false;
    var modoNoiteManual = false;
    var horas           = 0;

    var intervalo     = null;
    var timeoutClique = null;
    var timeoutBack   = null;
    var horasIntervalo= null;

    // ---- CONTROLE PRINCIPAL ----
    function controle() {
      if (intervalo) clearInterval(intervalo);
      intervalo = setInterval(function() {
        if (estaMorto) return;

        contador++;
        tempoVivo++;
        timerDisp.textContent = formatarTempo(tempoVivo);
        atualizarBarraFome();

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
        if (contador >= 90) {
          morrer();
        }
      }, 1000);
    }

    // ---- ALIMENTAR ----
    function alimentar() {
      if (estaMorto) { ressuscitar(); return; }

      if (timeoutClique) clearTimeout(timeoutClique);
      if (timeoutBack)   clearTimeout(timeoutBack);

      img.classList.remove("hungry", "eating", "morto");
      img.src = estados.comendo;
      avatarImg.src = estados.comendo;
      img.classList.add("eating");

      contador = 0;
      log("Nhac nhac! 😋");
      setStatus("🍓 Comendo!", "success");
      atualizarBarraFome();

      timeoutClique = setTimeout(function() {
        img.src = estados.feliz;
        avatarImg.src = estados.feliz;
        img.classList.remove("eating");
        setStatus("😊 Feliz e saciado!", "success");
        mostrarCoracao();
        log("Que delícia! 💖");

        timeoutBack = setTimeout(function() {
          img.src = estados.normal;
          avatarImg.src = estados.normal;
          setStatus("😊 Feliz", "success");
          log("Voltando ao normal...");
        }, 2000);
      }, 1000);
    }

    // ---- MORTE / RESSURREIÇÃO ----
    function morrer() {
      estaMorto = true;
      img.src = estados.morto;
      avatarImg.src = estados.morto;
      img.classList.remove("hungry", "eating");
      img.classList.add("morto");
      setStatus("💀 Morreu...", "error");
      log("Morreu! Clique na comida para ressuscitar.");
      hungerBar.style.width = "0%";
      hungerLabel.textContent = "Morto";
    }

    function ressuscitar() {
      estaMorto = false;
      contador = 0;
      img.classList.remove("morto");
      img.classList.add("reviving");
      img.src = estados.feliz;
      avatarImg.src = estados.feliz;
      setStatus("✨ Ressuscitou!", "success");
      log("Voltou à vida! 🎉");
      mostrarCoracao();
      setTimeout(function() {
        img.classList.remove("reviving");
        img.src = estados.normal;
        avatarImg.src = estados.normal;
        setStatus("😊 Feliz", "success");
      }, 1000);
    }

    function interagir() {
      if (estaMorto) { log("Está morto... alimente para ressuscitar!"); return; }
      mostrarCoracao();
      log("Que fofinho! 💕");
    }

    // ---- DIA / NOITE ----
    function aplicarFundo(noite) {
      document.body.style.backgroundImage = noite
        ? "url('" + fundoNoite + "')"
        : "url('" + fundoDia + "')";
      if (noite) {
        document.body.classList.add("noite");
      } else {
        document.body.classList.remove("noite");
      }
      toggleNoite.checked = noite;
    }

    function alternarModoManual() {
      modoNoiteManual = toggleNoite.checked;
      aplicarFundo(modoNoiteManual);
    }

    function cicloDianoite() {
      if (horasIntervalo) clearInterval(horasIntervalo);
      horasIntervalo = setInterval(function() {
        if (modoNoiteManual) return;
        horas = (horas + 1) % 24;
        aplicarFundo(horas >= 12 && horas < 22);
      }, 3000);
    }

    // ---- UTILITÁRIOS ----
    function atualizarBarraFome() {
      var pct = Math.max(0, 100 - (contador / 90) * 100);
      hungerBar.style.width = pct + "%";
      if (pct > 60) {
        hungerBar.style.background = "linear-gradient(to right, #4ade80, #a3e635)";
        hungerLabel.textContent = "Saciado";
      } else if (pct > 30) {
        hungerBar.style.background = "linear-gradient(to right, #facc15, #fb923c)";
        hungerLabel.textContent = "Com fome";
      } else {
        hungerBar.style.background = "linear-gradient(to right, #ef4444, #f472b6)";
        hungerLabel.textContent = "Faminto!";
      }
    }

    function setStatus(texto, tipo) {
      var cores = { success: "badge-success", warning: "badge-warning", error: "badge-error" };
      statusBadge.className = "badge badge-sm mt-1 " + (cores[tipo] || "badge-ghost");
      statusBadge.textContent = texto;
    }

    function log(msg) { logDisp.textContent = msg; }

    function formatarTempo(s) {
      if (s < 60) return s + "s";
      return Math.floor(s / 60) + "m " + (s % 60) + "s";
    }

    function mostrarCoracao() {
      var emojis = ["💖","💕","✨","🌸"];
      var heart = document.createElement("span");
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      heart.className = "heart-anim";
      heart.style.left = (Math.random() * 60 - 30) + "px";
      heartsArea.appendChild(heart);
      setTimeout(function() { heart.remove(); }, 1200);
    }

    function atualizarNome() {
      var nome = nomeInput.value.trim();
      nomeDisplay.textContent = nome ? "🐾 " + nome : "";
    }

    function criarEstrelas(n) {
      for (var i = 0; i < n; i++) {
        var s = document.createElement("div");
        s.className = "star";
        s.style.top  = Math.random() * 100 + "vh";
        s.style.left = Math.random() * 100 + "vw";
        s.style.animationDelay = Math.random() * 3 + "s";
        s.style.animationDuration = (1.5 + Math.random() * 2) + "s";
        starsContainer.appendChild(s);
      }
    }

    // ---- INICIALIZAÇÃO ----
    criarEstrelas(60);
    controle();
    cicloDianoite();
    log("Olá! Cuide bem de mim 🐣");