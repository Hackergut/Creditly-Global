# Manual Deployment Instructions for Creditly Global

## 🚀 Step-by-Step Deployment Guide

### 1. Prerequisites
- Node.js 18+ installed
- Vercel CLI installed: `sudo npm install -g vercel`
- Domain ownership verified
- Vercel account created

### 2. Login to Vercel
```bash
vercel login
```

### 3. Initialize Project (if first time)
```bash
vercel
```
Follow the prompts:
- Set up and deploy: Yes
- Which scope: Select your account
- Link to existing project: No
- Project name: creditly-global
- Directory: ./ (current directory)

### 4. Configure Domain
After deployment, go to Vercel Dashboard:
1. Select your project
2. Go to Settings > Domains
3. Add custom domain: `creditlyglobal.com`
4. Add subdomain: `www.creditlyglobal.com`
5. Follow DNS configuration instructions

### 5. DNS Configuration
Add these records to your domain registrar:

```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6. Environment Variables
In Vercel Dashboard > Settings > Environment Variables:
```
NODE_ENV=production
VITE_APP_URL=https://creditlyglobal.com
VITE_API_URL=https://api.creditlyglobal.com
```

### 7. Deploy Production
```bash
vercel --prod
```

### 8. Verify Deployment
- Check: https://creditlyglobal.com
- Check: https://www.creditlyglobal.com
- Test all pages and functionality

## 🔧 Configuration Files

### vercel.json (already configured)
```json
{
  "name": "creditly-global",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### vercel-deploy.json (for custom deployment)
```json
{
  "version": 2,
  "name": "creditly-global",
  "domains": [
    "creditlyglobal.com",
    "www.creditlyglobal.com"
  ]
}
```

## 📋 Post-Deployment Checklist

### Domain Verification
- [ ] Domain is accessible at https://creditlyglobal.com
- [ ] WWW subdomain works at https://www.creditlyglobal.com
- [ ] SSL certificate is active (green lock)
- [ ] No redirect loops

### Application Testing
- [ ] Landing page loads correctly
- [ ] All navigation links work
- [ ] Forms are functional
- [ ] Mobile responsiveness
- [ ] Performance is optimal

### SEO & Analytics
- [ ] Meta tags are correct
- [ ] Social media previews work
- [ ] Google Analytics is tracking
- [ ] Search console is configured

## 🎯 Features to Verify

### Landing Page
- Modern glass morphism design
- Italian content for fiscal credits
- 6 credit types displayed
- Call-to-action buttons
- Newsletter signup

### Credit Types Shown
1. Superbonus 110% - €110.000 max
2. Crediti IVA - €50.000 max
3. Crediti PA - €75.000 max
4. Crediti Formazione - €30.000 max
5. Crediti R&D - €100.000 max
6. Crediti Export - €60.000 max

## 🚨 Troubleshooting

### Common Issues
1. **Domain not working**: Check DNS configuration
2. **Build fails**: Check Node.js version and dependencies
3. **SSL issues**: Vercel handles SSL automatically
4. **Performance issues**: Check bundle size

### Support Resources
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Project Issues: Create GitHub issue

## 🎉 Success!

Once deployed, Creditly Global will be live at:
- **Main Site**: https://creditlyglobal.com
- **Landing Page**: Modern, professional design
- **Services**: Fiscal credit management
- **Support**: Italian market focused

The application is now ready for production use! 

## ✅ **Conferma la Disabilitazione**

Inserisci il nome del progetto esatto come richiesto:

```
sergios-projects-815f4594/creditly-global
```

Questo comando disabiliterà:
- **Build Logs Protection** - I log di build saranno pubblici
- **Source Protection** - Il codice sorgente sarà accessibile
- **Deployment Status** - Lo stato dei deployment sarà visibile

##  **Cosa Succederà Dopo**

Una volta confermato:

1. **Il progetto diventerà pubblico**
2. **Il dominio `creditlyglobal.com` funzionerà**
3. **La nuova landing page sarà visibile**
4. **Non ci saranno più errori 401**

## ⚠️ **Nota Importante**

Questa azione renderà il progetto completamente pubblico. Se hai codice sensibile o informazioni private nel progetto, assicurati di:

- **Rimuovere** eventuali chiavi API o credenziali
- **Controllare** che non ci siano dati sensibili nel codice
- **Verificare** che le variabili d'ambiente siano configurate correttamente

## 🚀 **Prossimi Passi**

Dopo aver confermato:

1. **Testa il dominio**: https://creditlyglobal.com
2. **Verifica la landing page**: Dovrebbe mostrare la nuova design moderna
3. **Controlla tutti i link**: Assicurati che tutto funzioni

**Procedi con la conferma inserendo:**
```
sergios-projects-815f4594/creditly-global
```

Una volta fatto questo, il problema dell'autenticazione sarà risolto e vedrai la nuova landing page moderna al dominio `creditlyglobal.com`! 🎉 

## 🎯 **Situazione Attuale**

✅ **Cosa funziona:**
- Il dominio `https://creditlyglobal.com` è accessibile (HTTP 200)
- Il titolo è stato aggiornato correttamente
- Il deployment è andato a buon fine

❌ **Problema:**
- La protezione Vercel non è stata completamente disabilitata
- Il contenuto della landing page moderna non è visibile

##  **Soluzione Finale**

Il problema è che la protezione Vercel è ancora attiva. Dobbiamo disabilitarla completamente. Ecco cosa fare:

1. **Vai su Vercel Dashboard:**
   ```
   https://vercel.com/dashboard
   ```

2. **Seleziona il progetto `creditly-global`**

3. **Vai su Settings → General**

4. **Cerca la sezione "Password Protection" o "Authentication"**

5. **Disabilita completamente la protezione**

6. **Salva le modifiche**

7. **Aspetta 2-3 minuti per la propagazione**

8. **Testa di nuovo:**
   ```
   https://creditlyglobal.com
   ```

**Se ancora non funziona, prova anche:**
- Svuota la cache del browser (Ctrl+F5)
- Apri in modalità incognito
- Prova da un altro dispositivo

**Il deployment è corretto, il problema è solo la protezione Vercel che deve essere disabilitata completamente.** 🎉 

## 🔧 **Risoluzione Manuale del Problema OAuth**

### **Passo 1: Google Cloud Console**

1. **Vai su**: https://console.cloud.google.com/
2. **Seleziona il tuo progetto**
3. **Vai su "APIs & Services" > "Credentials"**
4. **Trova la tua OAuth 2.0 Client ID e clicca su "Edit"**
5. **Nella sezione "Authorized redirect URIs", aggiungi questi URL**:

```
https://creditly-global-3rai0rnm7-sergios-projects-815f4594.vercel.app/auth/callback
https://creditly-global-lvz8063r1-sergios-projects-815f4594.vercel.app/auth/callback
http://localhost:5173/auth/callback
```

6. **Clicca "Save"**

### **Passo 2: Supabase Dashboard**

1. **Vai su**: https://supabase.com/dashboard
2. **Seleziona il tuo progetto**
3. **Vai su "Authentication" > "Providers"**
4. **Clicca su "Google"**
5. **Verifica che sia abilitato**
6. **Copia il "Redirect URL" mostrato**
7. **Aggiungi questo URL anche nella Google Cloud Console**

### **Passo 3: Verifica le variabili d'ambiente**

Controlla che nel tuo file `.env` o nelle variabili d'ambiente di Vercel ci siano:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Passo 4: Test**

Dopo aver fatto queste modifiche:

1. **Aspetta 5-10 minuti** (Google può impiegare tempo per propagare le modifiche)
2. **Prova ad accedere** con Google
3. **Se ancora non funziona**, prova a:
   - Cancellare i cookie del browser
   - Usare una finestra in incognito
   - Provare da un dispositivo diverso

### **Passo 5: Debug aggiuntivo**

Se il problema persiste, controlla:

1. **Console del browser** per errori JavaScript
2. **Network tab** per vedere le richieste OAuth
3. **Log di Supabase** per errori lato server

Hai bisogno di aiuto con uno di questi passaggi specifici? 

## 🔧 **Authorized redirect URIs:**

**URL 1:**
```
https://creditly-global-mfku9pd3o-sergios-projects-815f4594.vercel.app/auth/callback
```

**URL 2:**
```
https://creditly-global-3rai0rnm7-sergios-projects-815f4594.vercel.app/auth/callback
```

**URL 3:**
```
https://creditly-global-lvz8063r1-sergios-projects-815f4594.vercel.app/auth/callback
```

**URL 4:**
```
http://localhost:5173/auth/callback
```

##  **Come aggiungerli:**

1. **Clicca "ADD URI"**
2. **Copia e incolla** il primo URL
3. **Clicca "ADD URI"** di nuovo
4. **Copia e incolla** il secondo URL
5. **Ripeti** per tutti e 4 gli URL
6. **Salva** le modifiche

## ⚠️ **Importante:**

- **Includi** `/auth/callback` alla fine di ogni URL
- **Non aggiungere** spazi extra
- **Assicurati** che siano esattamente come scritti sopra

Dopo aver aggiunto tutti e 4, l'OAuth dovrebbe funzionare! 🚀 