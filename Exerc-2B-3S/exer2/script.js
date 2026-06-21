const celsius = document.getElementById('celsius');
    const fahrenheit = document.getElementById('fahrenheit');
 
    celsius.addEventListener('input', function() {
      if (this.value === '') { fahrenheit.value = ''; return; }
      fahrenheit.value = ((parseFloat(this.value) * 9/5) + 32).toFixed(2);
    });
 
    fahrenheit.addEventListener('input', function() {
      if (this.value === '') { celsius.value = ''; return; }
      celsius.value = ((parseFloat(this.value) - 32) * 5/9).toFixed(2);
    });