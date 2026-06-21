function calcularMedia() {
      const nome = document.getElementById('nome').value.trim() || 'Aluno';
      const n1 = Number(document.getElementById('n1').value);
      const n2 = Number(document.getElementById('n2').value);
      const n3 = Number(document.getElementById('n3').value);
 
      const media = (n1 + n2 + n3) / 3;
 
      const box = document.getElementById('resultBox');
      box.className = 'result-box';
 
      document.getElementById('rNome').textContent = nome;
      document.getElementById('rMedia').textContent = media.toFixed(2);
      document.getElementById('rExtra').textContent = '';
 
      if (media >= 7.0) {
        box.classList.add('aprovado');
        document.getElementById('rSituacao').textContent = '★ APROVADO';
      } else if (media >= 4.0) {
        box.classList.add('exame');
        document.getElementById('rSituacao').textContent = '⚠ EM EXAME';
        const falta = (10 - media).toFixed(2);
        document.getElementById('rExtra').textContent = `Faltam ${falta} pontos para atingir 10.`;
      } else {
        box.classList.add('reprovado');
        document.getElementById('rSituacao').textContent = '✗ REPROVADO';
      }
 
      box.style.display = 'block';
    }