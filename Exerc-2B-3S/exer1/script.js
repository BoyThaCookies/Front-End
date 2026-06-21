document.getElementById('cpf').addEventListener('input', function() {
      let v = this.value.replace(/\D/g, '');
      if (v.length > 3) v = v.slice(0,3) + '.' + v.slice(3);
      if (v.length > 7) v = v.slice(0,7) + '.' + v.slice(7);
      if (v.length > 11) v = v.slice(0,11) + '-' + v.slice(11);
      this.value = v.slice(0, 14);
    });
 
    function validarCPF() {
      const resultEl = document.getElementById('result');
      const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
 
      resultEl.className = 'result';
 
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        resultEl.style.display = 'block';
        resultEl.classList.add('invalido');
        resultEl.textContent = '✗ CPF Inválido';
        return;
      }
 
      let soma = 0;
      for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
      let resto = (soma * 10) % 11;
      if (resto === 10) resto = 0;
      if (resto !== parseInt(cpf[9])) {
        resultEl.style.display = 'block';
        resultEl.classList.add('invalido');
        resultEl.textContent = '✗ CPF Inválido';
        return;
      }
 
      soma = 0;
      for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10) resto = 0;
      if (resto !== parseInt(cpf[10])) {
        resultEl.style.display = 'block';
        resultEl.classList.add('invalido');
        resultEl.textContent = '✗ CPF Inválido';
        return;
      }
 
      resultEl.style.display = 'block';
      resultEl.classList.add('valido');
      resultEl.textContent = '✓ CPF Válido';
    }