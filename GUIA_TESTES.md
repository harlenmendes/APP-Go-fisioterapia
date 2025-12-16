# 🧪 Guia de Testes - GO Fisioterapia App

Existem várias formas de testar o aplicativo. Escolha a que for mais conveniente para você:

## 📱 Opção 1: Expo Go (Mais Fácil - Recomendado para começar)

### O que é?
O Expo Go é um app que você instala no seu celular e permite testar aplicativos Expo sem precisar compilar nada.

### Como usar:

1. **Instale o Expo Go no seu celular:**
   - **Android:** [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **iOS:** [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   ou
   ```bash
   npx expo start
   ```

3. **Conecte seu celular:**
   - **Na mesma rede WiFi:** Escaneie o QR Code que aparece no terminal com o app Expo Go
   - **Android:** Pressione `a` no terminal para abrir no Android
   - **iOS:** Pressione `i` no terminal para abrir no iOS

4. **Ou use o túnel (se estiverem em redes diferentes):**
   - Pressione `s` no terminal para abrir as opções
   - Escolha "Tunnel" e escaneie o QR Code

### Vantagens:
- ✅ Muito rápido para começar
- ✅ Não precisa configurar emulador
- ✅ Testa no dispositivo real
- ✅ Hot reload automático (mudanças aparecem instantaneamente)

### Limitações:
- ⚠️ Algumas funcionalidades nativas podem não funcionar
- ⚠️ Performance pode ser ligeiramente diferente do build final

---

## 💻 Opção 2: Emulador Android/iOS

### Android (Android Studio)

1. **Instale o Android Studio:**
   - Baixe em: https://developer.android.com/studio

2. **Configure um emulador:**
   - Abra o Android Studio
   - Vá em Tools > Device Manager
   - Crie um novo emulador (recomendado: Pixel 5 ou superior, Android 11+)

3. **Inicie o emulador**

4. **Inicie o Expo:**
   ```bash
   npm start
   ```
   - Pressione `a` para abrir no Android emulador

### iOS (apenas no Mac)

1. **Instale o Xcode:**
   - Baixe na Mac App Store

2. **Configure o simulador:**
   - Abra o Xcode
   - Vá em Xcode > Preferences > Components
   - Baixe um simulador iOS

3. **Inicie o Expo:**
   ```bash
   npm start
   ```
   - Pressione `i` para abrir no simulador iOS

---

## 🌐 Opção 3: Web (Navegador)

Você também pode testar uma versão web do app:

```bash
npm run web
```

Isso abrirá automaticamente no seu navegador padrão.

**Nota:** Nem todas as funcionalidades funcionam na web (como câmera, notificações push, etc), mas é útil para testar a interface.

---

## 🚀 Passo a Passo Rápido (Expo Go)

### Primeira vez:

1. **Instale as dependências (se ainda não fez):**
   ```bash
   npm install
   ```

2. **Inicie o servidor:**
   ```bash
   npm start
   ```

3. **No seu celular:**
   - Abra o app Expo Go
   - Escaneie o QR Code que aparece no terminal
   - Aguarde o app carregar (pode levar alguns segundos na primeira vez)

4. **Pronto!** O app está rodando no seu celular!

### Comandos úteis durante o desenvolvimento:

- `r` - Recarregar o app
- `m` - Alternar menu de desenvolvedor
- `d` - Abrir menu de desenvolvimento
- `j` - Abrir debugger
- `Ctrl+C` - Parar o servidor

---

## 🔧 Solução de Problemas

### App não carrega no Expo Go?

1. **Verifique se está na mesma rede WiFi:**
   - Celular e computador devem estar na mesma rede
   - Ou use o modo "Tunnel" (pressione `s` no terminal)

2. **Verifique o firewall:**
   - Pode estar bloqueando a conexão
   - Temporariamente desative o firewall para testar

3. **Tente usar o túnel:**
   ```bash
   npx expo start --tunnel
   ```

### Erro de dependências?

```bash
npm install
```

### Limpar cache:

```bash
npx expo start -c
```

### O app fica lento?

- Isso é normal no Expo Go
- Para melhor performance, use um build de desenvolvimento (veja abaixo)

---

## 📦 Build de Desenvolvimento (Performance Melhor)

Se quiser melhor performance ou testar funcionalidades que não funcionam no Expo Go:

### Android:
```bash
npx expo run:android
```

### iOS (Mac):
```bash
npx expo run:ios
```

Isso vai compilar o app nativamente e instalar no seu dispositivo/emulador.

---

## ✅ Checklist antes de testar:

- [ ] Dependências instaladas (`npm install`)
- [ ] Expo Go instalado no celular (se usar essa opção)
- [ ] Celular e computador na mesma rede WiFi
- [ ] Servidor iniciado (`npm start`)

---

## 🎯 Recomendação

Para começar rapidamente:
1. Use o **Expo Go** no seu celular
2. Depois, quando quiser testar funcionalidades específicas, use um **emulador** ou **build de desenvolvimento**

Boa sorte testando! 🚀




