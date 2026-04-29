# Task Manager Avanade

**DESAFIO TÉCNICO – BOOTCAMP WEB FRONT (ANGULAR + ASP.NET)**

Aplicação CRUD de gerenciamento de tarefas com backend em ASP.NET Core Web API e frontend em Angular.

---

## Tecnologias utilizadas

- **Frontend:** Angular 19
- **Backend:** ASP.NET Core Web API (.NET 8) com C#
- **Banco de dados:** Supabase (PostgreSQL) — utilizado no lugar do SQL Server por oferecer PostgreSQL gerenciado na nuvem, sem necessidade de instalação local. O Entity Framework Core suporta ambos os bancos nativamente.
- **ORM:** Entity Framework Core
- **Comunicação:** API REST (JSON)

---

## Estrutura do projeto

task-manager-avanade/

├── TaskManager.API/        # Backend ASP.NET Core

├── task-manager-frontend/  # Frontend Angular

---

## Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) v18 ou superior
- [Angular CLI](https://angular.dev/tools/cli) v19
- Conta gratuita no [Supabase](https://supabase.com/)

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/task-manager-avanade.git
cd task-manager-avanade
```

### 2. Configure o banco de dados no Supabase

Este projeto utiliza o Supabase como banco de dados PostgreSQL em nuvem, no lugar do SQL Server local. O Entity Framework Core suporta PostgreSQL nativamente, o que torna a substituição transparente para a aplicação.

**Para configurar o seu próprio banco:**

1. Acesse [supabase.com](https://supabase.com/) e crie uma conta gratuita
2. Crie um novo projeto e defina uma senha para o banco
3. No painel do projeto, localize a opção de conexão (botão **Connect** na barra superior) e acesse a aba **Direct connection**
4. Copie as informações de host, porta, usuário e senha
5. Monte a connection string no formato abaixo e substitua no arquivo `TaskManager.API/appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=db.SEU-PROJETO.supabase.co;Port=5432;Database=postgres;Username=postgres;Password=SUA-SENHA"
}
```

5. No arquivo `TaskManager.API/appsettings.json`, substitua:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=db.SEU-PROJETO.supabase.co;Port=5432;Database=postgres;Username=postgres;Password=SUA-SENHA"
}
```

### 3. Rode o backend

```bash
cd TaskManager.API
dotnet restore
dotnet ef database update
dotnet run
```

A API estará disponível em `http://localhost:5128`.  
A documentação Swagger estará em `http://localhost:5128/swagger`.

### 4. Configure o frontend

No arquivo `task-manager-frontend/src/environments/environment.ts`, confirme que a URL da API está correta:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5128/api'
};
```

### 5. Rode o frontend

```bash
cd task-manager-frontend
npm install
ng serve
```

A aplicação estará disponível em `http://localhost:4200`.


---


## Decisões técnicas

### Substituição do SQL Server pelo Supabase

O enunciado do desafio indica SQL Server como banco de dados. Neste projeto, optei pelo **Supabase (PostgreSQL)** pelos seguintes motivos práticos:

- Limitações de hardware da máquina de desenvolvimento (SQL Server é pesado em disco e memória)
- Supabase já estava disponível e configurado no ambiente
- É uma solução elegante: PostgreSQL gerenciado em nuvem, sem instalação local
- O Entity Framework Core suporta PostgreSQL nativamente, sem impacto na camada de aplicação

**Nota importante:** em um projeto real, esta substituição não seria feita unilateralmente. A decisão seria apresentada ao time e à liderança como uma proposta, acompanhada de análise de impacto, avaliação de custos, proficiência do time com a tecnologia e análise de riscos arquiteturais. Alterações na stack tecnológica de um projeto envolvem múltiplos stakeholders e precisam de consenso antes de serem implementadas.



---

## Funcionalidades

- Listar tarefas
- Criar nova tarefa
- Editar tarefa existente
- Excluir tarefa
- Campos: Título, Descrição, Status (Pendente / Concluída), Data de Criação

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/tarefas | Lista todas as tarefas |
| GET | /api/tarefas/{id} | Busca tarefa por ID |
| POST | /api/tarefas | Cria nova tarefa |
| PUT | /api/tarefas/{id} | Atualiza tarefa |
| DELETE | /api/tarefas/{id} | Remove tarefa |
