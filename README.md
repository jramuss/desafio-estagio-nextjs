# Desafio Técnico — Estágio em Desenvolvimento Web

## Contexto

Desenvolva o **TaskFlow**, uma aplicação web para gerenciamento de tarefas de uma equipe. O desafio é individual e avalia Next.js, integração REST, Postman, Git, organização de código e usabilidade.

**Prazo:** 6 dias corridos a partir da data de disponibilização do desafio pelo avaliador.

## Tecnologias obrigatórias

- Next.js (App Router), React e JavaScript ou TypeScript
- Git e GitHub
- Postman
- CSS (livre escolha de abordagem)
- API REST JSONPlaceholder: https://jsonplaceholder.typicode.com/

Não é necessário criar backend nem banco de dados.

## Começando

1. Clone este repositório.
2. A partir da branch `main` atualizada, crie sua branch individual:
   - Candidato 1: `candidato/estagiario-01`
   - Candidato 2: `candidato/estagiario-02`
3. Desenvolva o projeto Next.js nesta branch, sem alterar diretamente a `main`.
4. Faça commits pequenos e descritivos durante o desenvolvimento.
5. Publique sua branch e abra um Pull Request **para `main`** até o prazo.

```bash
git clone URL_DO_REPOSITORIO
cd desafio-estagio-nextjs
git switch main
git pull origin main
git switch -c candidato/estagiario-01
# Desenvolva sua aplicação...
git add .
git commit -m "feat: inicia aplicacao Next.js"
git push -u origin candidato/estagiario-01
```

> Substitua `URL_DO_REPOSITORIO` pela URL fornecida pelo avaliador e use a branch atribuída a você.

## Documentação do desafio

- [Requisitos funcionais e técnicos](docs/REQUISITOS.md)
- [API e testes com Postman](docs/API.md)
- [Prazo, cronograma e critérios de entrega](docs/ENTREGA.md)

## Regras

- Trabalho individual. Não copie o código do outro candidato.
- É permitido consultar documentação, tutoriais e ferramentas de IA; o candidato deverá explicar o código na apresentação.
- Não é obrigatório fazer deploy.
- A avaliação considerará também o processo de desenvolvimento, não apenas a aparência final.
