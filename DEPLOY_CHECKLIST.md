# Checklist Deploy Appwrite

## ✅ Pre-Deploy

- [ ] **Build del progetto completato**
  ```bash
  npm run build
  ```
- [ ] **Cartella `dist` generata correttamente**
- [ ] **File `_redirects` presente in `public/`**
- [ ] **ErrorBoundary configurato**

## 🔧 Configurazione Variabili d'Ambiente

### Opzione A: Supabase (Raccomandato)
- [ ] `VITE_SUPABASE_URL` configurato
- [ ] `VITE_SUPABASE_ANON_KEY` configurato

### Opzione B: Appwrite
- [ ] `VITE_APPWRITE_ENDPOINT` configurato
- [ ] `VITE_APPWRITE_PROJECT_ID` configurato
- [ ] Database Appwrite configurato
- [ ] Collezioni create: `profiles`, `credit_requests`, `notifications`

## 🚀 Deploy

- [ ] **Accedi ad Appwrite Console**
- [ ] **Seleziona il progetto**
- [ ] **Vai su "Functions" o "Websites"**
- [ ] **Carica la cartella `dist` completa**
- [ ] **Configura il routing SPA**

## 🔍 Post-Deploy

- [ ] **Apri l'URL del deploy**
- [ ] **Controlla la console del browser** per errori
- [ ] **Verifica che l'app si carichi correttamente**
- [ ] **Testa la navigazione tra le pagine**
- [ ] **Controlla l'autenticazione**

## 🐛 Troubleshooting

Se la schermata è bianca:

1. **Controlla la console del browser**
   - Apri DevTools (F12)
   - Vai su Console
   - Cerca errori JavaScript

2. **Verifica le variabili d'ambiente**
   - Controlla che siano configurate su Appwrite
   - Verifica che i valori siano corretti

3. **Controlla il Network tab**
   - Vai su Network in DevTools
   - Ricarica la pagina
   - Cerca errori 404 o 500

4. **Testa localmente**
   ```bash
   npm run preview
   ```

## 📞 Supporto

Se continui ad avere problemi:

1. **Controlla i log di Appwrite**
2. **Verifica la configurazione del progetto**
3. **Testa con un progetto di esempio**
4. **Contatta il supporto di Appwrite**

## 🔄 Aggiornamenti

Per aggiornare il deploy:

1. **Modifica il codice**
2. **Esegui il build**
   ```bash
   npm run build
   ```
3. **Carica la nuova cartella `dist`**
4. **Verifica che funzioni**

## 📝 Note

- Il file `_redirects` è essenziale per il routing SPA
- Le variabili d'ambiente devono essere configurate su Appwrite
- L'ErrorBoundary catturerà gli errori JavaScript
- Il build genera file ottimizzati per la produzione 