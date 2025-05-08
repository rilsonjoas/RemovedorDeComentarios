document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language-select");
  const codeInput = document.getElementById("code-input");
  const codeOutput = document.getElementById("code-output");
  const processButton = document.getElementById("process-button");
  const processInfoArea = document.getElementById("process-info-area");

  const commentPatterns = {
    javascript: [
      { type: "block", regex: /\/\*[\s\S]*?\*\//g },
      { type: "line", regex: /\/\/[^\n\r]*(\r\n|\n|\r)?/g },
    ],
    python: [{ type: "line", regex: /#.*/g }],
    java: "javascript",
    c: "javascript",
    cpp: "javascript",
    csharp: "javascript",
    php: [
      { type: "block", regex: /\/\*[\s\S]*?\*\//g },
      { type: "line", regex: /(?:\/\/|#)[^\n\r]*(\r\n|\n|\r)?/g },
    ],
    ruby: [
      { type: "line", regex: /#.*/g },
      { type: "block", regex: /=begin[\s\S]*?=end/g },
    ],
    swift: "javascript",
    kotlin: "javascript",
    go: "javascript",
    rust: "javascript",
    scala: "javascript",
    html: [{ type: "block", regex: /<!--[\s\S]*?-->/g }],
    css: [{ type: "block", regex: /\/\*[\s\S]*?\*\//g }],
    sql: [
      { type: "line", regex: /--.*/g },
      { type: "block", regex: /\/\*[\s\S]*?\*\//g },
    ],
    lua: [
      { type: "line", regex: /--(?!(?:\[\[|\]\])).*/g },
      { type: "block", regex: /--\[\[[\s\S]*?]]/g },
    ],
    powershell: [
      { type: "line", regex: /#.*/g },
      { type: "block", regex: /<#[\s\S]*?#>/g },
    ],
    perl: [{ type: "line", regex: /#.*/g }],
    vbnet: [
      { type: "line", regex: /'.*/g },
      { type: "line", regex: /\bREM\b.*/gi },
    ],
    assembly: [{ type: "line", regex: /;.*/g }],
    bash: [{ type: "line", regex: /(?<!^#!)#.*/g }],
    haskell: [
      { type: "line", regex: /--.*/g },
      { type: "block", regex: /{-[\s\S]*?-}/g },
    ],
  };

  function getPatternsForLanguage(lang) {
    const patterns = commentPatterns[lang];
    if (typeof patterns === "string") {
      return getPatternsForLanguage(patterns);
    }
    return patterns;
  }

  function populateLanguageSelect() {
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "-- Selecione a Linguagem --";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    languageSelect.appendChild(placeholderOption);

    const sortedLanguages = Object.keys(commentPatterns).sort();
    sortedLanguages.forEach((langKey) => {
      if (typeof commentPatterns[langKey] === "string") return;
      const option = document.createElement("option");
      option.value = langKey;
      option.textContent =
        langKey.charAt(0).toUpperCase() +
        langKey
          .slice(1)
          .replace(/cpp/g, "C++")
          .replace(/csharp/g, "C#")
          .replace(/vbnet/g, "VB.NET");
      languageSelect.appendChild(option);
    });
  }

  function removeComments(code, lang) {
    const patterns = getPatternsForLanguage(lang);
    if (!patterns) {
      console.warn(`Nenhum padrão de comentário definido para: ${lang}`);
      return code;
    }
    let cleanedCode = code;
    patterns.sort((a, b) => (a.type === "block" ? -1 : 1));
    patterns.forEach((patternInfo) => {
      cleanedCode = cleanedCode.replace(patternInfo.regex, "");
    });
    cleanedCode = cleanedCode.replace(/^\s*[\r\n]/gm, "");
    return cleanedCode;
  }

  function displayInfo(message, type = "success") {
    processInfoArea.textContent = message;
    processInfoArea.className = "process-info visible"; // Reseta classes e torna visível
    if (type === "error") {
      processInfoArea.classList.add("error");
    } else if (type === "success") {
      processInfoArea.classList.add("success");
    }
  }

  processButton.addEventListener("click", () => {
    const selectedLanguage = languageSelect.value;
    const inputCode = codeInput.value;

    // Limpa a área de output e a informação anterior
    codeOutput.value = "";
    processInfoArea.className = "process-info"; // Esconde e reseta a área de info
    processInfoArea.textContent = "";

    if (!inputCode.trim()) {
      displayInfo("Nenhum código fornecido para processar.", "error");
      return;
    }
    if (!selectedLanguage) {
      displayInfo("Por favor, selecione uma linguagem.", "error");
      return;
    }

    const startTime = performance.now();
    const resultCode = removeComments(inputCode, selectedLanguage);
    const endTime = performance.now();

    const timeTaken = (endTime - startTime).toFixed(2);

    const originalLines = inputCode.split(/\r\n|\r|\n/).length;
    const tempResultLines =
      resultCode.trim() === "" ? [] : resultCode.split(/\r\n|\r|\n/);
    const newLinesResult = tempResultLines.filter(
      (line) => line.trim() !== ""
    ).length;

    // Mensagem para a área de informação
    const infoMessage = `Processado para ${selectedLanguage}. Tempo: ${timeTaken}ms. Linhas: ${originalLines} -> ${newLinesResult}.`;

    displayInfo(infoMessage, "success"); // Exibe a mensagem na área dedicada

    codeOutput.value = resultCode; // Apenas o código processado vai para o textarea de saída
  });

  populateLanguageSelect();
});