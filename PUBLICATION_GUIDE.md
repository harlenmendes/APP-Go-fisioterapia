# Guia de Publicação - GO Fisioterapia App

Este guia irá ajudá-lo a publicar o aplicativo nas lojas Apple App Store e Google Play Store.

## 📋 Pré-requisitos

1. **Conta de Desenvolvedor Apple** (US$ 99/ano) - Para iOS
2. **Conta Google Play Console** (US$ 25 única vez) - Para Android
3. **Conta Expo** (gratuita) - Para builds e publicação

## 🚀 Configuração Inicial

### 1. Instalar EAS CLI

```bash
npm install -g eas-cli
```

### 2. Login no Expo

```bash
eas login
```

### 3. Configurar o Projeto

```bash
eas build:configure
```

## 📱 Android - Google Play Store

### Passo 1: Configurar o Package Name

O package name já está configurado no `app.json` como `com.gofisioterapia.app`. Se quiser alterar:

1. Edite `app.json`
2. Altere o campo `android.package`

### Passo 2: Criar Keystore

O EAS pode gerar automaticamente, ou você pode usar um existente:

```bash
eas credentials
```

### Passo 3: Build de Produção

```bash
eas build --platform android --profile production
```

### Passo 4: Upload para Google Play

Após o build, você pode fazer upload manual ou automático:

```bash
eas submit --platform android
```

### Passo 5: Configurar na Google Play Console

1. Acesse [Google Play Console](https://play.google.com/console)
2. Crie um novo aplicativo
3. Preencha todas as informações:
   - Título: GO Fisioterapia
   - Descrição curta e completa
   - Categorias
   - Classificação de conteúdo
   - Política de privacidade
4. Faça upload do APK/AAB gerado
5. Configure preços e distribuição
6. Envie para revisão

## 🍎 iOS - Apple App Store

### Passo 1: Configurar Bundle Identifier

O bundle identifier já está configurado no `app.json` como `com.gofisioterapia.app`. 

⚠️ **Importante:** Você precisa registrar este identifier no Apple Developer Console antes do build.

### Passo 2: Certificados e Provisioning Profiles

O EAS gerencia automaticamente, mas você precisa:

1. Ter uma conta Apple Developer ativa
2. Registrar o Bundle ID no portal

```bash
eas credentials
```

### Passo 3: Build de Produção

```bash
eas build --platform ios --profile production
```

### Passo 4: Upload para App Store

```bash
eas submit --platform ios
```

### Passo 5: Configurar no App Store Connect

1. Acesse [App Store Connect](https://appstoreconnect.apple.com)
2. Crie um novo app
3. Preencha informações:
   - Nome: GO Fisioterapia
   - Bundle ID: com.gofisioterapia.app
   - Idioma principal
   - Categoria
4. Adicione descrição, screenshots, ícones
5. Configure preços e disponibilidade
6. Envie para revisão

## 🎨 Assets Necessários

### Screenshots Obrigatórios

**iOS:**
- iPhone 6.7" (iPhone 14 Pro Max): 1290 x 2796
- iPhone 6.5" (iPhone 11 Pro Max): 1242 x 2688
- iPhone 5.5" (iPhone 8 Plus): 1242 x 2208
- iPad Pro 12.9": 2048 x 2732

**Android:**
- Telefone: 1080 x 1920 (mínimo)
- Tablet: 1200 x 1920 (opcional mas recomendado)

### Descrições

Prepare:
- Descrição curta (até 80 caracteres)
- Descrição completa (até 4000 caracteres)
- Palavras-chave
- Política de privacidade (URL)

## ⚙️ Configurações Adicionais

### Variáveis de Ambiente

Crie um arquivo `.env` com suas configurações:

```
GOOGLE_SIGN_IN_CLIENT_ID=seu_client_id
API_BASE_URL=https://api.suaapi.com
```

### Testes

Antes de publicar, teste com builds internos:

```bash
# Android Internal Testing
eas build --platform android --profile preview

# iOS TestFlight
eas build --platform ios --profile preview
```

## 🔄 Atualizações

Para atualizar o app:

1. Atualize a versão no `app.json`
2. Faça um novo build
3. Submeta para revisão

```bash
# No app.json, atualize:
"version": "1.0.1" // ou 1.1.0 para major updates

# Depois:
eas build --platform all
eas submit --platform all
```

## 📚 Recursos Úteis

- [Documentação Expo EAS](https://docs.expo.dev/build/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)

## ⚠️ Checklist Antes de Publicar

- [ ] Todos os assets (ícones, splash screens) estão prontos
- [ ] Versão do app atualizada
- [ ] Bundle ID / Package Name configurado
- [ ] Descrições e screenshots prontos
- [ ] Política de privacidade publicada
- [ ] Testado em dispositivos reais
- [ ] Login e funcionalidades principais testadas
- [ ] Certificados e credenciais configurados

## 🆘 Problemas Comuns

### Erro de Bundle ID duplicado
- Verifique se o ID já existe no App Store Connect
- Use um ID único se necessário

### Build falha
- Verifique os logs do EAS
- Certifique-se de que todas as dependências estão instaladas

### Rejeição nas stores
- Leia os motivos da rejeição
- Corrija os problemas apontados
- Reenvie para revisão

Boa sorte com a publicação! 🚀




