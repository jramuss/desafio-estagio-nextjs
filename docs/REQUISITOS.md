# Requisitos — TaskFlow

## Objetivo

Construir uma aplicação web responsiva para consultar e gerenciar tarefas de uma equipe.

## Funcionalidades obrigatórias

1. **Listagem:** buscar tarefas na API e exibir título, status e responsável (associado aos dados de usuários).
2. **Pesquisa:** filtrar tarefas pelo título.
3. **Filtro de status:** mostrar todas, pendentes ou concluídas.
4. **Cadastro:** formulário com título e responsável; realizar POST e exibir a tarefa criada na interface.
5. **Alteração de status:** alternar entre pendente e concluída; realizar PATCH e atualizar a interface.
6. **Exclusão:** realizar DELETE e remover a tarefa da interface.
7. **Estados de interface:** indicar carregamento, erro de requisição e lista vazia.

## Requisitos técnicos

- Next.js com App Router.
- Componentes reutilizáveis e código organizado.
- `fetch` ou `axios` para integração REST.
- Gerenciamento de estado adequado para a aplicação.
- Layout utilizável em desktop e celular.
- README atualizado na branch do candidato com instruções de instalação e execução.
- Histórico de commits e Pull Request para `main`.
- Coleção Postman exportada no repositório, preferencialmente em `postman/`.

## Observação sobre persistência

A JSONPlaceholder **simula** POST, PATCH e DELETE, mas não persiste mudanças. Portanto, o candidato deverá manter as alterações na interface durante a sessão usando estado local. Não será exigido banco de dados ou persistência após atualizar a página.

## Funcionalidades opcionais

Paginação, testes automatizados, persistência no navegador ou deploy. Não substituem os requisitos obrigatórios.
