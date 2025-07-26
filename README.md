# Creditly Global - Piattaforma di Compravendita Crediti Fiscali

Una piattaforma moderna per la gestione e monetizzazione dei crediti fiscali in Italia.

## 🚀 Caratteristiche

- **Autenticazione Sicura**: Integrazione con Supabase per login/signup
- **Dashboard Avanzata**: Gestione completa dei crediti fiscali
- **Marketplace**: Compravendita di crediti tra aziende
- **UI Moderna**: Design system con Shadcn/ui e Tailwind CSS
- **Responsive**: Ottimizzato per desktop e mobile
- **Deploy Automatico**: Configurato per Vercel

## 🛠️ Tecnologie

- **Frontend**: React 18 + Vite
- **UI**: Shadcn/ui + Tailwind CSS
- **Backend**: Supabase (Auth + Database)
- **Deploy**: Vercel
- **Routing**: React Router DOM

## 📦 Installazione

```bash
# Clona il repository
git clone <your-repo-url>
cd creditly-global

# Installa le dipendenze
npm install

# Copia il file .env.example
cp .env.example .env

# Configura le variabili d'ambiente
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Avvia il server di sviluppo
npm run dev
```

## 🔧 Configurazione Supabase

1. Crea un progetto su [Supabase](https://supabase.com)
2. Copia URL e ANON KEY dal dashboard
3. Aggiungi le variabili al file `.env`

### Tabelle Database Necessarie

```sql
-- Tabella profili utenti
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Tabella richieste crediti
CREATE TABLE credit_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  credit_type TEXT NOT NULL,
  amount DECIMAL(15,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella notifiche
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deploy su Vercel

1. **Connetti il repository**:
   ```bash
   # Push su GitHub
   git remote add origin https://github.com/your-username/creditly-global.git
   git push -u origin main
   ```

2. **Deploy su Vercel**:
   - Vai su [Vercel](https://vercel.com)
   - Importa il repository GitHub
   - Configura le variabili d'ambiente
   - Deploy automatico

### Variabili d'Ambiente Vercel

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME=Creditly Global
VITE_APP_ENV=production
```

## 📁 Struttura Progetto

```
src/
├── components/          # Componenti UI
│   ├── ui/             # Shadcn/ui components
│   ├── credit/         # Form crediti fiscali
│   └── chatbot/        # Chatbot integrato
├── hooks/              # Custom hooks
│   └── useAuth.jsx     # Hook autenticazione
├── lib/                # Utilities
│   └── supabaseClient.js # Client Supabase
├── pages/              # Pagine dell'app
│   ├── Welcome.jsx     # Landing page
│   ├── Login.jsx       # Pagina login
│   └── Dashboard.jsx   # Dashboard principale
└── api/                # API legacy (Base44)
```

## 🔐 Autenticazione

Il sistema di autenticazione è basato su Supabase con:

- **Email/Password**: Login tradizionale
- **Google OAuth**: Login con Google
- **Protezione Rotte**: Componente `ProtectedRoute`
- **Gestione Sessioni**: Hook `useAuth`

## 🎨 UI/UX

- **Design System**: Shadcn/ui components
- **Tema**: Dark mode con accenti verdi
- **Responsive**: Mobile-first design
- **Animazioni**: Framer Motion
- **Icone**: Lucide React

## 📱 Pagine Principali

- **Landing Page** (`/`): Presentazione pubblica
- **Login** (`/login`): Autenticazione
- **Dashboard** (`/dashboard`): Area protetta
- **Marketplace** (`/marketplace`): Compravendita crediti
- **Profilo** (`/profile`): Gestione account

## 🚀 Script Disponibili

```bash
npm run dev          # Server di sviluppo
npm run build        # Build produzione
npm run preview      # Preview build
npm run lint         # Linting
```

## 🔧 Sviluppo

### Aggiungere una Nuova Pagina

1. Crea il file in `src/pages/`
2. Aggiungi la rotta in `src/pages/index.jsx`
3. Usa `ProtectedRoute` se necessita autenticazione

### Aggiungere un Nuovo Componente

1. Crea il file in `src/components/`
2. Importa con `@/components/`
3. Segui le convenzioni Shadcn/ui

## 📞 Supporto

Per supporto tecnico o domande:
- Email: info@creditlyglobal.com
- Documentazione: [docs.creditlyglobal.com](https://docs.creditlyglobal.com)

## 📄 Licenza

© 2024 Creditly Global - MANAGEMENT E SERVIZI S.R.L.S.