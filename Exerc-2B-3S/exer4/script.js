function calcular() {
      const bandeira = document.getElementById('bandeira').value;
      const valor = parseFloat(document.getElementById('valor').value);
      const parcelas = parseInt(document.getElementById('parcelas').value);
 
      if (!bandeira || isNaN(valor) || valor <= 0) {
        alert('Preencha todos os campos corretamente.');
        return;
      }
 
      let taxaPercentual;
      switch (bandeira) {
        case 'visa':   taxaPercentual = 0.02; break;
        case 'master': taxaPercentual = 0.0185; break;
        case 'elo':    taxaPercentual = 0.03; break;
      }
 
      const taxaBandeira = valor * taxaPercentual;
      const juros = valor * (0.015 * parcelas);
      const taxaMensal = 12.50 * parcelas;
      const total = valor + taxaBandeira + juros + taxaMensal;
      const parcela = total / parcelas;
 
      const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
 
      document.getElementById('rValor').textContent = fmt(valor);
      document.getElementById('rTaxa').textContent = fmt(taxaBandeira);
      document.getElementById('rMensal').textContent = fmt(taxaMensal);
      document.getElementById('rJuros').textContent = fmt(juros);
      document.getElementById('rTotal').textContent = fmt(total);
      document.getElementById('rParcela').textContent = fmt(parcela);
 
      document.getElementById('resultPanel').style.display = 'block';
      }