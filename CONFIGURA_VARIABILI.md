# 🔧 Configurazione Variabili d'Ambiente su Appwrite

## 🚨 Problema Attuale

Il sito è deployato ma probabilmente mostra una schermata bianca perché le variabili d'ambiente non sono configurate su Appwrite.

## ✅ Soluzione

### Step 1: Accedi ad Appwrite Console

1. Vai su [console.appwrite.io](https://console.appwrite.io)
2. Accedi al tuo account
3. Seleziona il progetto `Creditly Global`

### Step 2: Configura le Variabili d'Ambiente

#### Opzione A: Supabase (Raccomandato)

1. **Vai su "Settings" > "Environment Variables"**
2. **Clicca "Add Variable"**
3. **Aggiungi queste variabili:**

```
Nome: VITE_SUPABASE_URL
Valore: https://qtrypzzcjebvfcihiynt.supabase.co
Tipo: String
```

```
Nome: VITE_SUPABASE_ANON_KEY
Valore: [la tua chiave anonima di Supabase]
Tipo: String
```

#### Opzione B: Appwrite

1. **Vai su "Settings" > "Environment Variables"**
2. **Clicca "Add Variable"**
3. **Aggiungi queste variabili:**

```
Nome: VITE_APPWRITE_ENDPOINT
Valore: [il tuo endpoint Appwrite]
Tipo: String
```

```
Nome: VITE_APPWRITE_PROJECT_ID
Valore: [il tuo project ID]
Tipo: String
```

### Step 3: Salva e Riavvia

1. **Clicca "Save"**
2. **Vai su "Deployments"**
3. **Clicca "Redeploy"** o crea un nuovo deployment

## 🔍 Verifica Configurazione

### 1. Controlla la Console del Browser

1. Apri https://www.creditlyglobal.com
2. Premi F12 per aprire DevTools
3. Vai su "Console"
4. Cerca questi messaggi:

```
✅ Configurato: VITE_SUPABASE_URL
✅ Configurato: VITE_SUPABASE_ANON_KEY
✅ Configurazione OK
```

### 2. Se Vedi Errori

Se vedi:
```
❌ Mancante: VITE_SUPABASE_URL
❌ Mancante: VITE_SUPABASE_ANON_KEY
```

Significa che le variabili non sono configurate correttamente.

## 🐛 Troubleshooting

### Problema: Variabili non si salvano
- Verifica di essere nel progetto corretto
- Controlla che i nomi delle variabili inizino con `VITE_`
- Assicurati che i valori non contengano spazi extra

### Problema: Sito ancora bianco dopo configurazione
1. **Redeploy il progetto** su Appwrite
2. **Svuota la cache del browser** (Ctrl+F5)
3. **Controlla la console** per nuovi errori

### Problema: Errore "Missing Supabase environment variables"
- Verifica che le variabili siano configurate correttamente
- Controlla che i valori siano validi
- Redeploy il progetto

## 📋 Checklist

- [ ] Acceduto ad Appwrite Console
- [ ] Selezionato progetto corretto
- [ ] Aggiunto VITE_SUPABASE_URL
- [ ] Aggiunto VITE_SUPABASE_ANON_KEY
- [ ] Salvato le variabili
- [ ] Redeploy del progetto
- [ ] Testato su https://www.creditlyglobal.com
- [ ] Controllato console browser
- [ ] Sito funziona correttamente

## 🎯 Risultato Atteso

Dopo la configurazione dovresti vedere:
- ✅ Sito che si carica correttamente
- ✅ Nessun errore nella console
- ✅ Landing page visibile
- ✅ Navigazione funzionante

## 📞 Supporto

Se continui ad avere problemi:
1. Controlla i log di Appwrite
2. Verifica la configurazione Supabase
3. Testa con un progetto di esempio
4. Contatta il supporto di Appwrite 