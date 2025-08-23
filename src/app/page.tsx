"use client"; 

import { useState, ChangeEvent } from "react";
import {
  removeComments,
  getAvailableLanguages,
} from "@/lib/commentRemover"; 

interface InfoMessage {
  text: string;
  type: "success" | "error" | "";
}

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [codeOutput, setCodeOutput] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<InfoMessage>({
    text: "",
    type: "",
  });

  const availableLanguages = getAvailableLanguages();

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
    setInfoMessage({ text: "", type: "" }); 
  };

  const handleCodeInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCodeInput(event.target.value);
  };

  const handleProcessCode = () => {
    setCodeOutput("");
    setInfoMessage({ text: "", type: "" });

    if (!codeInput.trim()) {
      setInfoMessage({
        text: "Nenhum código fornecido para processar.",
        type: "error",
      });
      return;
    }
    if (!selectedLanguage) {
      setInfoMessage({
        text: "Por favor, selecione uma linguagem.",
        type: "error",
      });
      return;
    }

    const startTime = performance.now();
    const resultCode = removeComments(codeInput, selectedLanguage);
    const endTime = performance.now();

    const timeTaken = (endTime - startTime).toFixed(2);

    const originalLines = codeInput.split(/\r\n|\r|\n/).length;
    const resultLinesArray =
      resultCode.trim() === "" ? [] : resultCode.split(/\r\n|\r|\n/);
    const newLinesResult = resultLinesArray.filter(
      (line) => line.trim() !== ""
    ).length;

    const langLabel =
      availableLanguages.find((lang) => lang.value === selectedLanguage)
        ?.label || selectedLanguage;
    const messageText = `Processado para ${langLabel}. Tempo: ${timeTaken}ms. Linhas: ${originalLines} -> ${newLinesResult}.`;
    setInfoMessage({ text: messageText, type: "success" });
    setCodeOutput(resultCode);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 font-primary">
      <main className="bg-container-bg p-7 sm:p-9 rounded-lg shadow-2xl max-w-4xl w-full">
        <h1 className="text-text-color-light text-center mb-8 text-2xl sm:text-3xl font-bold">
          Removedor de Comentário em Código
        </h1>

        <div className="controls flex flex-col sm:flex-row items-center gap-5 mb-8 justify-between">
          <div className="left-controls flex items-center gap-2.5 grow w-full sm:w-auto">
            <label
              htmlFor="language-select"
              className="font-normal text-text-color text-sm"
            >
              Escolha a Linguagem:
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="min-w-[220px] w-full sm:w-auto px-4 pr-8 py-2.5 font-primary text-sm border border-border-color rounded-md bg-input-bg text-text-color cursor-pointer
                         focus:outline-none focus:border-accent-color focus:ring-2 focus:ring-accent-color
                         appearance-none bg-no-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23abb2bf' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <option value="" disabled>
                -- Selecione a Linguagem --
              </option>
              {availableLanguages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <button
            id="process-button"
            onClick={handleProcessCode}
            className="px-4 py-2.5 w-full sm:w-auto font-primary text-sm border border-accent-color rounded-md bg-accent-color text-white font-medium
                       hover:bg-button-hover-bg hover:border-button-hover-bg focus:outline-none focus:border-accent-color focus:ring-2 focus:ring-accent-color transition-colors"
          >
            Remover comentários
          </button>
        </div>

        {infoMessage.text && (
          <div
            id="process-info-area"
            className={`p-2.5 px-4 rounded-md mb-5 text-xs font-code border border-border-color min-h-[1.5em] leading-snug transition-opacity duration-300
                        ${
                          infoMessage.type === "error"
                            ? "text-terminal-dots-red border-l-4 border-l-terminal-dots-red bg-input-bg"
                            : ""
                        }
                        ${
                          infoMessage.type === "success"
                            ? "text-text-color border-l-4 border-l-terminal-dots-green bg-input-bg"
                            : ""
                        }
                        ${infoMessage.text ? "opacity-100" : "opacity-0"}`}
          >
            {infoMessage.text}
          </div>
        )}

        <div className="terminal-container flex flex-col md:flex-row gap-5 min-h-[300px]">
          {/* Terminal de Entrada */}
          <div className="terminal-window flex-1 bg-input-bg border border-border-color rounded-lg overflow-hidden flex flex-col shadow-lg">
            <div className="terminal-header bg-input-bg px-4 py-2.5 font-code text-xs text-text-color border-b border-border-color flex items-center select-none">
              <div className="window-dots flex gap-1.5 mr-3">
                <span className="dot w-3 h-3 rounded-full bg-terminal-dots-red"></span>
                <span className="dot w-3 h-3 rounded-full bg-terminal-dots-yellow"></span>
                <span className="dot w-3 h-3 rounded-full bg-terminal-dots-green"></span>
              </div>
              <span className="uppercase tracking-wider font-medium">
                ENTRADA DE CÓDIGO
              </span>
            </div>
            <textarea
              id="code-input"
              spellCheck="false"
              placeholder="Cole seu código aqui..."
              value={codeInput}
              onChange={handleCodeInputChange}
              className="flex-grow w-full bg-input-bg text-text-color border-none p-4 font-code text-sm leading-normal resize-none whitespace-pre overflow-auto focus:outline-none placeholder-placeholder-text"
            />
          </div>

          {/* Terminal de Saída */}
          <div className="terminal-window flex-1 bg-input-bg border border-border-color rounded-lg overflow-hidden flex flex-col shadow-lg">
            <div className="terminal-header bg-input-bg px-4 py-2.5 font-code text-xs text-text-color border-b border-border-color flex items-center select-none">
              <div className="window-dots flex gap-1.5 mr-3">
                <span className="dot w-3 h-3 rounded-full bg-terminal-dots-red"></span>
                <span className="dot w-3 h-3 rounded-full bg-terminal-dots-yellow"></span>
                <span className="dot w-3 h-3 rounded-full bg-terminal-dots-green"></span>
              </div>
              <span className="uppercase tracking-wider font-medium">
                CÓDIGO SEM COMENTÁRIOS
              </span>
            </div>
            <textarea
              id="code-output"
              spellCheck="false"
              readOnly
              placeholder="O código processado aparecerá aqui..."
              value={codeOutput}
              className="flex-grow w-full bg-input-bg text-text-color border-none p-4 font-code text-sm leading-normal resize-none whitespace-pre overflow-auto focus:outline-none placeholder-placeholder-text"
            />
          </div>
        </div>

        <div className="text-center pt-6 text-xs text-text-color opacity-60">
          <p>© 2025 - <span className="opacity-80">Desenvolvido por <a href="https://github.com/rilsonjoas" target="_blank" rel="noopener noreferrer" className="font-bold text-green-400">Rilson Joás</a></span></p>
        </div>
      </main>
    </div>
  );
}
