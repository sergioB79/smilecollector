SMILECOLLECTOR — ESTRUTURA DINÂMICA DO LAB

ESTRUTURA
---------
index.html                  Home
lab.html                    Índice / bancada principal do Pokémon Lab
lab/articles.json           Registo central dos dossiers publicados
lab/moomoo-cheese.html      CASE FILE #004 — exemplo externo
lab/plusle-minun.html       BEHAVIOURAL REPORT #001 — exemplo externo
assets/js/articles.js       Lê articles.json e cria as listas automaticamente
assets/lab/                 Artefactos e imagens já existentes do Lab

COMO PUBLICAR UM ARTIGO NOVO
----------------------------
1. Criar a nova página, por exemplo:
      lab/snorlax-insurance.html

2. Acrescentar UMA entrada em:
      lab/articles.json

3. Fazer upload / commit.

Não é necessário editar index.html nem lab.html.
A Home mostra automaticamente os 2 artigos mais recentes.
O Pokémon Lab mostra automaticamente todos, ordenados pela data.

NOTA SOBRE TESTE LOCAL
----------------------
O catálogo usa fetch() para ler lab/articles.json. Em GitHub Pages funciona normalmente.
Se abrires os ficheiros directamente com file:// e o browser bloquear JSON, testa com um
servidor local, por exemplo dentro desta pasta:

    python -m http.server 8000

Depois abre:
    http://localhost:8000/

ASSETS NÃO INCLUÍDOS NESTE PACOTE
---------------------------------
O site continua a esperar os assets que já existiam no teu projecto original:
- logo-smilecollector.png
- cartao_frente.png
- cartao_verso.png

O pacote mantém esses nomes e caminhos para poderes substituir directamente a pasta no site.
