# API e Postman

**Base URL:** `https://jsonplaceholder.typicode.com`

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| GET | `/todos` | Listar tarefas |
| GET | `/todos/1` | Consultar uma tarefa |
| GET | `/users` | Listar usuários |
| POST | `/todos` | Simular criação |
| PATCH | `/todos/1` | Simular atualização |
| DELETE | `/todos/1` | Simular exclusão |

## Exemplos

POST `/todos` com header `Content-Type: application/json`:

```json
{"title":"Revisar documentação","completed":false,"userId":1}
```

PATCH `/todos/1` com header `Content-Type: application/json`:

```json
{"completed":true}
```

## Entrega Postman

- Criar uma coleção com as seis requisições acima.
- Configurar corretamente métodos, URLs, headers e corpos quando aplicáveis.
- Executar as requisições e verificar status HTTP e respostas JSON.
- Exportar a coleção em JSON e incluir no Pull Request.

**Atenção:** operações de escrita não modificam permanentemente os dados da JSONPlaceholder. O estado exibido na aplicação deverá refletir as ações do usuário durante a sessão.
