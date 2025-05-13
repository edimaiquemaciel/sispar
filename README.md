# SISPAR - Sistema de Emissão de Boletos e Parcelamento

O **SISPAR** é uma aplicação web desenvolvida para facilitar a gestão de reembolsos e solicitações financeiras. Este sistema oferece uma interface intuitiva e responsiva, permitindo que os usuários realizem solicitações de reembolso, acompanhem o status de suas solicitações e gerenciem informações financeiras de forma eficiente.

## Funcionalidades

- **Autenticação de Usuários**: Login e cadastro de usuários com validação de dados.
- **Solicitação de Reembolsos**: Formulário para envio de solicitações de reembolso com validação de campos.
- **Gestão de Reembolsos**: Visualização de solicitações em análise, aprovadas ou rejeitadas.
- **Interface Responsiva**: Design adaptado para diferentes dispositivos (desktop, tablet e smartphone).
- **Validação de Dados**: Uso de schemas com `zod` para validação de formulários.
- **Integração com API**: Comunicação com uma API REST para persistência de dados.
- **Feedback ao Usuário**: Notificações em tempo real utilizando `react-hot-toast`.

## Tecnologias Utilizadas

### Frontend
- **React.js**: Biblioteca para construção de interfaces de usuário.
- **React Router DOM**: Gerenciamento de rotas.
- **React Hook Form**: Gerenciamento de formulários.
- **PrimeReact**: Componentes de interface de usuário.
- **SCSS**: Estilização com suporte a variáveis e mixins.
- **Axios**: Requisições HTTP.

### Backend
- **API REST**: Integração com uma API hospedada em `https://api-sispar-production.up.railway.app`.

### Outras Bibliotecas
- `zod`: Validação de schemas.
- `jwt-decode`: Manipulação de tokens JWT.
- `lucide-react`: Ícones modernos.
- `use-mask-input`: Máscaras para campos de entrada.

## Estrutura do Projeto

```plaintext
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── global.scss
│   ├── authcontext/
│   │   └── AuthContext.jsx
│   ├── components/
│   │   ├── cadastrar/
│   │   ├── login/
│   │   ├── modals/
│   │   ├── navbar/
│   │   ├── notfound/
│   │   ├── reembolsos/
│   │   └── solicitacao/
│   ├── protectedrouter/
│   │   └── ProtectedRoute.jsx
│   ├── publicroute/
│   │   └── PublicRoute.jsx
│   ├── schemas/
│   │   ├── login.js
│   │   ├── reembolsoSchema.js
│   │   └── register.js
│   └── Services/
│       └── Api.jsx


## Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos para Execução

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/seu-usuario/sispar.git
    ```

2. **Acesse o diretório do projeto**:
    ```bash
    cd sispar
    ```

3. **Instale as dependências**:
    ```bash
    npm install
    ```
    ou, se estiver usando yarn:
    ```bash
    yarn install
    ```

4. **Configure as variáveis de ambiente**:
    Crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias, como a URL da API e outras configurações.

5. **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```
    ou, se estiver usando yarn:
    ```bash
    yarn dev
    ```

6. **Acesse a aplicação**:
    Abra o navegador e acesse `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir com o projeto:

1. Faça um fork do repositório.
2. Crie uma nova branch para sua feature ou correção:
    ```bash
    git checkout -b minha-feature
    ```
3. Faça as alterações desejadas e commit:
    ```bash
    git commit -m "Descrição da minha feature"
    ```
4. Envie suas alterações para o repositório remoto:
    ```bash
    git push origin minha-feature
    ```
5. Abra um Pull Request no repositório original.

## Contato

Se tiver dúvidas ou sugestões, entre em contato:
- **Email**: seu-email@exemplo.com
- **LinkedIn**: [Seu Nome](https://www.linkedin.com/in/seu-perfil)
- **GitHub**: [seu-usuario](https://github.com/seu-usuario)