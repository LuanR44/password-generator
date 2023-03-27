// Função que gera um número inteiro aleatório entre um valor mínimo e máximo (ambos inclusos)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função que gera uma senha aleatória com base nas opções selecionadas
function generatePassword(length, useLetters, useNumbers, useSymbols) {
  const ambiguousChars = "1IiLl0Oo5S8B";
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const numbers = "1234567890";
  const symbols = "!@#$%&*()_+=-.[]{}";

  let charset = "";

  if (useLetters) {
    charset += letters;
  }
  if (useNumbers) {
    charset += numbers;
  }
  if (useSymbols) {
    charset += symbols;
  }

  if (charset === "") {
    alert(
      "Por favor, selecione pelo menos uma opção (letras, números ou símbolos) para gerar a senha."
    );
    return "";
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    const newChar = charset[randomIndex];

    // Verifique se o último caractere da senha não é igual ao novo caractere gerado
    if (password.length > 0 && password[password.length - 1] === newChar) {
      // Se os caracteres forem iguais, tente novamente
      i--;
    } else {
      // Se os caracteres não forem iguais, adicione o novo caractere à senha
      password += newChar;
    }
  }

  return password;
}

// Adiciona um evento de clique ao botão "Gerar Senha"
document.getElementById("generate").addEventListener("click", () => {
  // Obtém as opções selecionadas pelo usuário
  const length = parseInt(document.getElementById("length").value);
  const useLetters = document.getElementById("letters").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  // Gera a senha e a exibe no campo de texto
  const password = generatePassword(length, useLetters, useNumbers, useSymbols);
  document.getElementById("password").value = password;
});

// Adiciona um evento de clique ao campo de senha
document.getElementById("password").addEventListener("click", function () {
  // Copia a senha para a área de transferência
  this.select();
  document.execCommand("copy");

  // Exibe um alerta informando que a senha foi copiada
  alert("Senha copiada para a área de transferência!");

  // Define o tempo em milissegundos antes de limpar o campo de senha
  const clearTime = 30000; // 30 segundos

  // Aguarda o tempo definido e então limpa o campo de senha
  setTimeout(() => {
    document.getElementById("password").value = "";
  }, clearTime);
});

// Limpa o campo de senha ao carregar a página
document.getElementById("password").value = "";
