# 📧 Template Email Creditly Global

Questi sono i template HTML personalizzati per le email di Creditly Global.

## 📁 File Template

### 1. **confirmation-email.html**
- **Scopo**: Email di conferma iscrizione
- **Variabili**: `{{ .ConfirmationURL }}`
- **Caratteristiche**: 
  - Design professionale con logo
  - Lista delle funzionalità
  - Note di sicurezza
  - Footer con link utili

### 2. **reset-password-email.html**
- **Scopo**: Email di reset password
- **Variabili**: `{{ .ConfirmationURL }}`
- **Caratteristiche**:
  - Design coerente con il brand
  - Informazioni di sicurezza dettagliate
  - Validità temporale del link

### 3. **invite-email.html**
- **Scopo**: Email di invito utente
- **Variabili**: `{{ .ConfirmationURL }}`, `{{ .InviterEmail }}`
- **Caratteristiche**:
  - Informazioni sull'invitante
  - Lista delle funzionalità
  - Call-to-action chiaro

### 4. **magic-link-email.html**
- **Scopo**: Email per Magic Link (accesso senza password)
- **Variabili**: `{{ .ConfirmationURL }}`
- **Caratteristiche**:
  - Accesso rapido senza password
  - Informazioni di sicurezza specifiche
  - Validità temporale ridotta (1 ora)

### 5. **change-email-email.html**
- **Scopo**: Email di conferma cambio indirizzo email
- **Variabili**: `{{ .ConfirmationURL }}`, `{{ .Email }}`
- **Caratteristiche**:
  - Mostra il nuovo indirizzo email
  - Note sulla transizione
  - Sicurezza per cambio dati sensibili

### 6. **reauthentication-email.html**
- **Scopo**: Email per reautenticazione (azioni sensibili)
- **Variabili**: `{{ .ConfirmationURL }}`
- **Caratteristiche**:
  - Verifica identità per azioni sensibili
  - Validità temporale molto breve (10 minuti)
  - Avvisi di sicurezza specifici

## 🎨 Design Features

### **Colori Brand**
- **Primario**: `#10b981` (Verde)
- **Secondario**: `#059669` (Verde scuro)
- **Sfondo**: `#f8f9fa` (Grigio chiaro)
- **Testo**: `#374151` (Grigio scuro)

### **Elementi Design**
- ✅ Logo Creditly Global
- ✅ Gradiente verde nell'header
- ✅ Pulsanti CTA con hover effects
- ✅ Icone emoji per maggiore appeal
- ✅ Layout responsive
- ✅ Tipografia professionale

## 🔧 Come Utilizzare

### **In Supabase Dashboard:**

1. **Vai su**: Authentication > Email Templates
2. **Seleziona** il tipo di email (Confirmation, Reset Password, Invite)
3. **Copia** il contenuto HTML del template corrispondente
4. **Incolla** nel campo HTML del template
5. **Salva** le modifiche

### **Variabili Disponibili**

- `{{ .ConfirmationURL }}` - Link di conferma/reset/accesso
- `{{ .InviterEmail }}` - Email dell'invitante (solo per invite)
- `{{ .Email }}` - Email dell'utente (per change-email)
- `{{ .SiteURL }}` - URL del sito
- `{{ .Token }}` - Token di sicurezza (se necessario)

## 📱 Responsive Design

I template sono ottimizzati per:
- ✅ Desktop (600px max-width)
- ✅ Tablet (responsive)
- ✅ Mobile (viewport meta tag)

## 🚀 Caratteristiche

- **Professionalità**: Design coerente con il brand
- **Sicurezza**: Note informative sui link temporanei
- **Accessibilità**: Contrasti appropriati e struttura semantica
- **Engagement**: Call-to-action chiari e appealing
- **Branding**: Logo e colori di Creditly Global

## 📞 Supporto

Per modifiche o domande sui template:
- **Email**: support@creditlyglobal.com
- **Sito**: https://www.creditlyglobal.com 