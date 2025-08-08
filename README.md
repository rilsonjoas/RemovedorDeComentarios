# 🧹 Removedor de Comentário em Código

## 📜 Sobre o Projeto

O **Removedor de Comentário em Código** é uma ferramenta web interativa projetada para limpar código-fonte, removendo todos os tipos de comentários específicos de cada linguagem de programação. A aplicação suporta uma vasta gama de linguagens, desde JavaScript e Python até SQL e Assembly, oferecendo uma solução rápida e eficiente para quem precisa de uma versão "limpa" de um código para análise, minificação ou outras finalidades.

A interface, estilizada como um terminal de desenvolvedor, proporciona uma experiência de usuário familiar e agradável.

**🔗 Acesse a aplicação:** [(https://rilsonjoas.github.io/RemovedorDeComentarios/)]

## ✨ Principais Funcionalidades

-   **Suporte a Múltiplas Linguagens:** Compatível com mais de 20 linguagens de programação, cada uma com seus padrões específicos de comentários de linha e de bloco.
-   **Interface Intuitiva:** Um design limpo e moderno, inspirado em terminais, com áreas distintas para entrada e saída de código.
-   **Processamento Rápido:** Utiliza expressões regulares (RegEx) otimizadas para remover comentários de forma eficiente, diretamente no navegador.
-   **Feedback Instantâneo:** Fornece informações sobre o processo, como tempo de execução e contagem de linhas antes e depois da remoção.
-   **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, funcionando bem tanto em desktops quanto em dispositivos móveis.
-   **Zero Dependências Externas (Runtime):** Todo o processamento é feito no lado do cliente usando JavaScript puro, sem a necessidade de um backend.

## 🛠️ Tecnologias Utilizadas

-   **HTML5:** Estruturação semântica da página.
-   **CSS3:** Estilização avançada com variáveis CSS para um tema de terminal consistente e responsivo.
-   **JavaScript (ES6+):** Lógica principal da aplicação, manipulação do DOM e processamento do código com expressões regulares.

## 🗂️ Linguagens Suportadas

A ferramenta reconhece e remove comentários das seguintes linguagens:

| Linguagem     | Tipos de Comentário                               |
| ------------- | ------------------------------------------------- |
| **Assembly**  | `; ...`                                           |
| **Bash**      | `# ...` (ignora shebang `#!`)                     |
| **C/C++/C#**  | `// ...` e `/* ... */`                            |
| **CSS**       | `/* ... */`                                       |
| **Go**        | `// ...` e `/* ... */`                            |
| **Haskell**   | `-- ...` e `{- ... -}`                            |
| **HTML**      | `<!-- ... -->`                                    |
| **Java**      | `// ...` e `/* ... */`                            |
| **JavaScript**| `// ...` e `/* ... */`                            |
| **Kotlin**    | `// ...` e `/* ... */`                            |
| **Lua**       | `-- ...` e `--[[ ... ]]`                          |
| **Perl**      | `# ...`                                           |
| **PHP**       | `// ...`, `# ...` e `/* ... */`                   |
| **PowerShell**| `# ...` e `<# ... #>`                             |
| **Python**    | `# ...`                                           |
| **Ruby**      | `# ...` e `=begin ... =end`                       |
| **Rust**      | `// ...` e `/* ... */`                            |
| **Scala**     | `// ...` e `/* ... */`                            |
| **SQL**       | `-- ...` e `/* ... */`                            |
| **Swift**     | `// ...` e `/* ... */`                            |
| **VB.NET**    | `' ...` e `REM ...`                               |

## 🚀 Como Executar Localmente

Para executar este projeto em sua máquina local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/removedor-de-comentarios.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd removedor-de-comentarios
    ```

3.  **Abra o arquivo `index.html` em seu navegador.**
    -   Você pode simplesmente clicar duas vezes no arquivo ou usar uma extensão como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code para uma melhor experiência de desenvolvimento.

E pronto! A aplicação estará funcionando em seu navegador.

## 💡 Lógica Principal

O núcleo da funcionalidade reside no arquivo `script.js`. A lógica para remover os comentários funciona da seguinte forma:

1.  **Mapeamento de Padrões:** Um objeto `commentPatterns` mapeia cada linguagem a um array de objetos contendo o `tipo` de comentário (`line` ou `block`) e a `regex` correspondente.
2.  **Seleção de Linguagem:** Quando o usuário seleciona uma linguagem, a função `getPatternsForLanguage` busca os padrões de RegEx corretos.
3.  **Remoção com RegEx:** A função `removeComments` executa as expressões regulares sobre o código de entrada. É dada prioridade aos comentários de bloco para evitar que um comentário de linha dentro de um bloco seja removido incorretamente.
4.  **Limpeza Adicional:** Após remover os comentários, linhas em branco resultantes são removidas para um resultado mais limpo.

## 🌟 Contribuições

Contribuições são sempre bem-vindas! Se você deseja adicionar suporte para uma nova linguagem ou melhorar a lógica existente, sinta-se à vontade para:

1.  Fazer um **Fork** deste repositório.
2.  Criar uma nova **Branch** (`git checkout -b feature/nova-linguagem`).
3.  Fazer suas alterações.
4.  Enviar um **Pull Request**.

---

© 2025 - [Rilson Joás](https://github.com/rilsonjoas)
