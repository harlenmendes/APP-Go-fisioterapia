# GO Fisioterapia - App Mobile

Aplicativo mobile para pacientes da clínica GO Fisioterapia, desenvolvido com React Native e Expo.

## 🚀 Tecnologias

- **React Native** - Framework mobile
- **Expo** - Plataforma para desenvolvimento e publicação
- **TypeScript** - Tipagem estática
- **Expo Router** - Navegação baseada em arquivos
- **Context API** - Gerenciamento de estado

## 📱 Funcionalidades

- ✅ Login com múltiplas opções (Email/Senha, Google, Apple)
- ✅ Tela inicial com avisos, próxima sessão, exercícios pendentes e status do plano
- ✅ Menu completo com todas as seções:
  - Financeiro
  - Relatórios
  - Exercícios
  - Histórico
  - Orientações
  - Fale Conosco

## 🎨 Design

- Cores principais: `#1b3a4b` e `#7ba393`
- Interface moderna e sofisticada
- Componentes reutilizáveis

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o projeto:
```bash
npm start
```

3. Para Android:
```bash
npm run android
```

4. Para iOS:
```bash
npm run ios
```

## 🏗️ Estrutura do Projeto

```
├── app/                    # Telas e navegação (Expo Router)
│   ├── (auth)/            # Telas de autenticação
│   └── (tabs)/            # Telas principais com tabs
├── components/            # Componentes reutilizáveis
├── contexts/              # Context API (Auth, etc)
├── constants/             # Constantes e tema
└── assets/                # Imagens e recursos
```

## 📱 Publicação

### Preparação

1. Configure o `app.json` com os identificadores corretos
2. Gere as credenciais necessárias para cada plataforma

### Build para produção

```bash
# Android
eas build --platform android

# iOS
eas build --platform ios

# Ambos
eas build --platform all
```

### Publicação nas Stores

O Expo facilita a publicação através do EAS (Expo Application Services):

```bash
# Configure o EAS primeiro
eas build:configure

# Faça o build e suba automaticamente
eas submit --platform android
eas submit --platform ios
```

## 📝 Próximos Passos

- [ ] Integração com API backend
- [ ] Implementação das telas detalhadas (Financeiro, Relatórios, etc)
- [ ] Autenticação real com Firebase/Backend
- [ ] Notificações push
- [ ] Integração com Google Sign-In real
- [ ] Testes automatizados

## 🔧 Configuração Adicional

### Google Sign-In

Para habilitar o login com Google, você precisará:
1. Criar um projeto no Google Cloud Console
2. Configurar OAuth 2.0
3. Adicionar as credenciais no `app.json`

### Apple Sign-In

Para iOS, configure no Apple Developer Console e adicione as permissões necessárias.




