# Configurazione Dominio: creditlyglobal.com

## ✅ Dominio Configurato

Il tuo dominio `creditlyglobal.com` è già configurato su Namecheap e collegato ad Appwrite.

## 🔧 Configurazione Appwrite

### 1. Verifica Configurazione Dominio su Appwrite

1. Vai su Appwrite Console
2. Seleziona il tuo progetto
3. Vai su "Settings" > "Domains"
4. Verifica che `creditlyglobal.com` sia configurato correttamente

### 2. Configurazione SSL

Assicurati che SSL sia abilitato per il tuo dominio:
- Appwrite dovrebbe gestire automaticamente il certificato SSL
- Verifica che `https://creditlyglobal.com` funzioni

### 3. Configurazione DNS su Namecheap

Verifica che i record DNS su Namecheap puntino correttamente ad Appwrite:

```
Type: CNAME
Name: @
Value: [Appwrite endpoint]
TTL: 300
```

## 🚀 Deploy con Dominio Personalizzato

### 1. Build del Progetto
```bash
npm run build
```

### 2. Carica su Appwrite
- Vai su Appwrite Console
- Seleziona il tuo progetto
- Vai su "Functions" o "Websites"
- Carica la cartella `dist` completa

### 3. Configura il Routing
Assicurati che Appwrite sia configurato per:
- Gestire il routing SPA
- Tutte le route puntino a `index.html`
- Il file `_redirects` sia incluso

## 🔍 Test del Dominio

### 1. Test Locale
```bash
npm run preview
```
Apri: http://localhost:4173/

### 2. Test Produzione
Apri: https://creditlyglobal.com

### 3. Verifica Errori
- Apri DevTools (F12)
- Controlla la Console per errori
- Verifica il Network tab

## 📋 Checklist Dominio

- [ ] Dominio configurato su Namecheap
- [ ] DNS puntano ad Appwrite
- [ ] SSL abilitato
- [ ] Appwrite riconosce il dominio
- [ ] Build del progetto completato
- [ ] File caricati su Appwrite
- [ ] Routing SPA configurato
- [ ] Test locale funziona
- [ ] Test produzione funziona

## 🐛 Troubleshooting Dominio

### Problema: Dominio non carica
1. **Verifica DNS**: Controlla che i record DNS siano corretti
2. **Verifica SSL**: Assicurati che SSL sia abilitato
3. **Verifica Appwrite**: Controlla che il dominio sia configurato su Appwrite

### Problema: Schermata bianca
1. **Controlla console browser**: Cerca errori JavaScript
2. **Verifica variabili ambiente**: Controlla configurazione su Appwrite
3. **Testa localmente**: Usa `npm run preview`

### Problema: Routing non funziona
1. **Verifica file `_redirects`**: Assicurati sia incluso nel deploy
2. **Configura routing SPA**: Su Appwrite, configura tutte le route per puntare a `index.html`

## 🔄 Aggiornamenti

Per aggiornare il sito:

1. **Modifica il codice**
2. **Build del progetto**
   ```bash
   npm run build
   ```
3. **Carica nuova cartella `dist`** su Appwrite
4. **Verifica su https://creditlyglobal.com**

## 📞 Supporto

Se hai problemi:
1. Controlla i log di Appwrite
2. Verifica la configurazione DNS su Namecheap
3. Testa con un dominio di esempio
4. Contatta il supporto di Appwrite/Namecheap 