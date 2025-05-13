# Desafio final SISPAR - Vai Na Web & Wilson Sons
## Sistema de Emissão de Boletos e Parcelamento
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material_UI-latest-0081CB?logo=material-ui&logoColor=white)](https://mui.com/)
[![PrimeReact](https://img.shields.io/badge/PrimeReact-latest-6366F1)](https://primereact.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![SCSS](https://img.shields.io/badge/SCSS-1.0-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![Axios](https://img.shields.io/badge/Axios-latest-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![Zod](https://img.shields.io/badge/Zod-latest-3068B7)](https://github.com/colinhacks/zod)

## 📋 Visão Geral

O **SISPAR** é uma solução web robusta para gestão financeira, especializada em processamento de reembolsos e solicitações financeiras. Projetado com foco na experiência do usuário, o sistema oferece uma interface intuitiva e responsiva que permite aos usuários gerenciar todo o ciclo de vida de reembolsos - desde a solicitação inicial até a aprovação final.

### 🎯 Objetivo Principal

Simplificar e automatizar processos financeiros empresariais, proporcionando uma plataforma centralizada para solicitações de reembolso, análise e aprovação, eliminando processos manuais e reduzindo inconsistências.

## ✨ Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| 🔐 **Autenticação Segura** | Sistema completo de registro e login com validação de dados e proteção por JWT |
| 💰 **Gerenciamento de Reembolsos** | Interface intuitiva para criação de solicitações de reembolsos |
| 📱 **Design Responsivo** | Experiência otimizada em qualquer dispositivo - desktop, tablet ou smartphone |

## 🛠️ Tecnologias

### Frontend
- **React.js (18.x)** - Biblioteca para construção de interfaces de usuário
- **Material UI** - Biblioteca de componentes React para implementação do Material Design
- **React Router DOM (6.x)** - Sistema de roteamento SPA
- **React Hook Form** - Gerenciamento eficiente de formulários
- **PrimeReact** - Componentes UI ricos e personalizáveis
- **SCSS** - Pré-processador CSS com módulos
- **Axios** - Cliente HTTP baseado em Promises

### Backend
- **API REST** - Endpoints RESTful seguindo padrões de mercado
- **JWT** - Autenticação baseada em tokens para controle de acesso
- **Railway** - Hospedagem da API em `https://api-sispar-production.up.railway.app`

### Ferramentas e Bibliotecas Auxiliares
- **Zod** - Validação de schemas com tipagem TypeScript
- **jwt-decode** - Decodificação segura de tokens JWT
- **Lucide React** - Pacote de ícones SVG modernos
- **react-hot-toast** - Sistema de notificações elegante
- **use-mask-input** - Máscaras customizáveis para inputs

## 🏗️ Arquitetura do Projeto

```
sispar/
├── public/                  # Recursos estáticos e favicon
├── src/                     # Código-fonte da aplicação
│   ├── App.jsx              # Componente principal da aplicação
│   ├── main.jsx             # Ponto de entrada do React
│   ├── global.scss          # Estilos globais
│   ├── assets/              # Imagens, ícones e recursos estáticos
│   ├── authContext/         # Contexto de autenticação e gerenciamento de estado
│   ├── components/          # Componentes reutilizáveis
│   │   ├── cadastrar/       # Componentes para cadastro de usuários
│   │   ├── login/           # Componentes para autenticação
│   │   ├── modals/          # Componentes de modal reutilizáveis
│   │   ├── navbar/          # Componente de navegação principal
│   │   ├── notfound/        # Página de erro 404
│   │   ├── reembolsos/      # Componentes para gestão de reembolsos
│   │   └── solicitacao/     # Componentes para criação de solicitações
│   ├── protectedRouter/     # Lógica de rotas protegidas
│   ├── publicRoute/         # Lógica de rotas públicas
│   ├── schemas/             # Schemas de validação com Zod
│   │   ├── login.js         # Validação para login
│   │   ├── reembolsoSchema.js # Validação para reembolsos
│   │   └── register.js      # Validação para cadastro
│   ├── services/            # Serviços para comunicação com a API
│   │   └── Api.jsx          # Configuração e interceptores do Axios
│   └── utils/               # Funções utilitárias
└── .env                     # Variáveis de ambiente
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (v16.x ou superior)
- npm (v8.x ou superior) ou yarn (v1.22.x ou superior)
- Conexão com internet (para acessar a API)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/edimaiquemaciel/sispar.git
   cd sispar
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   - Abra seu navegador e acesse: `http://localhost:3000`

## 🤝 Contribuição

Agradecemos seu interesse em contribuir com o SISPAR! Siga estas etapas para participar:

1. **Fork do repositório**
2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. **Faça commit das alterações**
   ```bash
   git commit -m 'feat: adiciona nova funcionalidade'
   ```
4. **Envie para o repositório remoto**
   ```bash
   git push origin feature/nome-da-feature
   ```
5. **Abra um Pull Request**

### Convenções de Código

- Siga as [Convenções de Commit do Conventional Commits](https://www.conventionalcommits.org/)
- Mantenha o código limpo seguindo os princípios do Clean Code
- Adicione testes para novas funcionalidades


### Equipe

- **Desenvolvedor Principal**: [Edimaique Maciel](https://github.com/edimaiquemaciel)
- **Email**: edimaiqueacacio@gmail.com
- **LinkedIn**: [Edimaique Maciel](https://www.linkedin.com/in/edimaique-maciel/)

---
