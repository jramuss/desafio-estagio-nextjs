# TaskFlow — Gerenciamento de Tarefas

Aplicação web desenvolvida com **Next.js (App Router)** e **React** para gerenciamento de tarefas de uma equipe, integrada à API REST **JSONPlaceholder**.

## Funcionalidades

- Listagem limitada às 20 primeiras tarefas da API.
- Cadastro de tarefas com título e responsável.
- Edição de título e responsável.
- Alternância entre tarefa pendente e concluída.
- Exclusão de tarefas.
- Busca por título.
- Filtros por status e responsável.
- Painel com total, pendências, conclusões e progresso.
- Estados de carregamento, sucesso e erro.

## Avaliação rápida do projeto

### Pontos atendidos

- Utiliza Next.js App Router, React e JavaScript.
- Integra os métodos GET, POST, PATCH e DELETE do JSONPlaceholder.
- Separa a tela, o estado, os componentes e o serviço REST.
- Oferece interface responsiva e feedback visual.
- Inclui uma coleção Postman para os testes da API.

### Pontos a melhorar

1. **API simulada:** JSONPlaceholder não persiste alterações. Ao recarregar, dados criados, editados ou excluídos podem voltar ao estado original.
2. **Identificadores criados:** o ID local usa `Date.now()`, que pode repetir-se em chamadas muito próximas.
3. **Feedback por tempo:** os avisos usam `setTimeout`, sem cancelar o temporizador ao desmontar o componente.
4. **Excluir sem confirmação:** uma exclusão é aplicada imediatamente e só pode ser desfeita por uma nova API real.
5. **Versão do Next.js:** a versão instalada possui alertas de vulnerabilidades no `npm audit`; atualizar com testes é recomendado.
6. **Acessibilidade:** adicionar confirmação de exclusão, foco em mensagens e `aria-live` melhora o uso por teclado e leitores de tela.
7. **Testes automatizados:** ainda não há testes unitários ou de interface. Jest/React Testing Library e testes dos serviços REST seriam úteis.
8. **Processo Git:** mantenha commits pequenos e publique a branch individual com Pull Request para a `main`.

### Melhorias técnicas possíveis

- Usar um ID temporário com `crypto.randomUUID()`.
- Adotar `AbortController` para cancelar requisições após desmontagem.
- Mover parâmetros e URLs de ambiente para uma variável de configuração.
- Confirmar exclusões antes da operação.
- Persistir a interface com backend próprio ou outro serviço que suporte armazenamento real.
- Adicionar dados de demonstração local para preservar o comportamento durante falhas da API.
- Atualizar o Next.js para uma versão estável mais recente compatível com o restante do projeto.
- Criar testes para filtros, validação do formulário, estados de erro e chamadas REST.

## Como rodar no VS Code

1. Extraia a pasta do projeto e abra-a no **VS Code**.
2. Abra o terminal integrado (`Ctrl + '` ou `Terminal > New Terminal`).
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

Para configurar outra API REST, crie `.env.local` na raiz do projeto:

```text
NEXT_PUBLIC_TASKFLOW_API_URL=https://jsonplaceholder.typicode.com
```
