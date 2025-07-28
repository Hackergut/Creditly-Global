# Deploy su Appwrite - Guida Completa

## Problema della Schermata Bianca

Il problema della schermata bianca su Appwrite è causato principalmente da:

1. **Variabili d'ambiente mancanti**
2. **Configurazione di routing non corretta**
3. **Errori di build**

## Soluzioni

### Opzione 1: Usare Supabase (Raccomandato)

Se vuoi continuare a usare Supabase, configura le variabili d'ambiente su Appwrite:

1. Vai su Appwrite Console
2. Seleziona il tuo progetto
3. Vai su "Settings" > "Environment Variables"
4. Aggiungi:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Opzione 2: Migrare ad Appwrite

Se vuoi usare Appwrite come backend:

1. **Configura le variabili d'ambiente:**
   ```
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   ```

2. **Sostituisci il client Supabase con Appwrite:**
   ```javascript
   // In src/lib/supabaseClient.js, commenta tutto e aggiungi:
   export { auth, db, storage } from './appwriteClient.js'
   ```

3. **Configura il database su Appwrite:**
   - Crea le collezioni: `profiles`, `credit_requests`, `notifications`
   - Configura le regole di sicurezza
   - Aggiorna gli ID nel file `appwriteClient.js`

## Deploy Steps

### 1. Build del Progetto
```bash
npm run build
```

### 2. Verifica il Build
Controlla che la cartella `dist` contenga tutti i file necessari:
- `index.html`
- `assets/` (con CSS e JS)

### 3. Deploy su Appwrite
1. Vai su Appwrite Console
2. Seleziona il tuo progetto
3. Vai su "Functions" o "Websites"
4. Carica la cartella `dist` completa

### 4. Configura il Routing
Assicurati che Appwrite sia configurato per gestire il routing SPA:
- Tutte le route devono puntare a `index.html`
- Il file `_redirects` dovrebbe essere incluso

## Troubleshooting

### Schermata Bianca
1. **Controlla la console del browser** per errori JavaScript
2. **Verifica le variabili d'ambiente** sono configurate correttamente
3. **Controlla il network tab** per errori di rete

### Errori di Build
1. **Installa le dipendenze:**
   ```bash
   npm install
   ```

2. **Pulisci la cache:**
   ```bash
   npm run build -- --force
   ```

### Errori di Routing
1. **Verifica il file `_redirects`** è presente in `public/`
2. **Controlla la configurazione di Appwrite** per il routing SPA

## Script di Deploy Automatico

Usa lo script incluso:
```bash
./deploy-appwrite.sh
```

Questo script:
- Esegue il build
- Verifica le variabili d'ambiente
- Prepara i file per il deploy

## Configurazione Avanzata

### Per Appwrite
Se scegli Appwrite, dovrai:
1. Configurare le collezioni del database
2. Impostare le regole di sicurezza
3. Configurare l'autenticazione OAuth
4. Aggiornare gli ID nel client

### Per Supabase
Se scegli Supabase:
1. Configura il progetto Supabase
2. Imposta le variabili d'ambiente
3. Configura le tabelle del database
4. Imposta le regole RLS

## Supporto

Se continui ad avere problemi:
1. Controlla i log di Appwrite
2. Verifica la console del browser
3. Controlla le variabili d'ambiente
4. Testa localmente prima del deploy 