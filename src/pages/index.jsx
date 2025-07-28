import Layout from "./Layout.jsx";

import Welcome from "./Welcome";

import Onboarding from "./Onboarding";

import CreditRequest from "./CreditRequest";

import Profile from "./Profile";

import SupportCenter from "./SupportCenter";

import Contact from "./Contact";

import PrivacyPolicy from "./PrivacyPolicy";

import TermsOfService from "./TermsOfService";

import GuidaCrediti from "./GuidaCrediti";

import ArticoloBlog from "./ArticoloBlog";

import LandingNew from "./LandingNew.jsx";

import Home from "./Home";

import TestPage from "./TestPage.jsx";



import UserManagement from "./UserManagement";

import Analytics from "./Analytics";

import Reports from "./Reports";

import Notifications from "./Notifications";

import MarketplaceCrediti from "./MarketplaceCrediti";

import VendiCrediti from "./VendiCrediti";

import AcquistaCrediti from "./AcquistaCrediti";

import CreditiDisponibili from "./CreditiDisponibili";

import Dashboard from "./Dashboard";

import Settings from "./Settings";

import FirmaDigitale from "./FirmaDigitale";

import LoginNew from "./LoginNew.jsx";
import AuthCallback from "./AuthCallback.jsx";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from "@/components/ProtectedRoute";

const PAGES = {
    
    Welcome: Welcome,
    
    Onboarding: Onboarding,
    
    CreditRequest: CreditRequest,
    
    Profile: Profile,
    
    SupportCenter: SupportCenter,
    
    Contact: Contact,
    
    PrivacyPolicy: PrivacyPolicy,
    
    TermsOfService: TermsOfService,
    
    GuidaCrediti: GuidaCrediti,
    
    ArticoloBlog: ArticoloBlog,
    
    LandingNew: LandingNew,
    
    Home: Home,
    

    
    UserManagement: UserManagement,
    
    Analytics: Analytics,
    
    Reports: Reports,
    
    Notifications: Notifications,
    
    MarketplaceCrediti: MarketplaceCrediti,
    
    VendiCrediti: VendiCrediti,
    
    AcquistaCrediti: AcquistaCrediti,
    
    CreditiDisponibili: CreditiDisponibili,
    
    Dashboard: Dashboard,
    
    Settings: Settings,
    
    FirmaDigitale: FirmaDigitale,
    
    TestPage: TestPage,
    
}

function _getCurrentPage(url) {
    // Handle root path
    if (url === '/' || url === '') {
        return 'LandingNew';
    }
    
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || 'LandingNew';
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    // Render LandingNew direttamente senza Layout
    if (location.pathname === '/' || location.pathname === '/LandingNew') {
        return <LandingNew />;
    }
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                {/* Public Routes */}
                <Route path="/Welcome" element={<Welcome />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/TermsOfService" element={<TermsOfService />} />
                <Route path="/GuidaCrediti" element={<GuidaCrediti />} />
                <Route path="/ArticoloBlog" element={<ArticoloBlog />} />
                <Route path="/SupportCenter" element={<SupportCenter />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<LoginNew />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                
                {/* Protected Routes */}
                <Route path="/Onboarding" element={
                    <ProtectedRoute>
                        <Onboarding />
                    </ProtectedRoute>
                } />
                
                <Route path="/CreditRequest" element={
                    <ProtectedRoute>
                        <CreditRequest />
                    </ProtectedRoute>
                } />
                
                <Route path="/Profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                
                <Route path="/Home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                
                <Route path="/UserManagement" element={
                    <ProtectedRoute>
                        <UserManagement />
                    </ProtectedRoute>
                } />
                
                <Route path="/Analytics" element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                } />
                
                <Route path="/Reports" element={
                    <ProtectedRoute>
                        <Reports />
                    </ProtectedRoute>
                } />
                
                <Route path="/Notifications" element={
                    <ProtectedRoute>
                        <Notifications />
                    </ProtectedRoute>
                } />
                
                <Route path="/MarketplaceCrediti" element={
                    <ProtectedRoute>
                        <MarketplaceCrediti />
                    </ProtectedRoute>
                } />
                
                <Route path="/VendiCrediti" element={
                    <ProtectedRoute>
                        <VendiCrediti />
                    </ProtectedRoute>
                } />
                
                <Route path="/AcquistaCrediti" element={
                    <ProtectedRoute>
                        <AcquistaCrediti />
                    </ProtectedRoute>
                } />
                
                <Route path="/CreditiDisponibili" element={
                    <ProtectedRoute>
                        <CreditiDisponibili />
                    </ProtectedRoute>
                } />
                
                <Route path="/Dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                
                <Route path="/Settings" element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                } />
                
                <Route path="/FirmaDigitale" element={
                    <ProtectedRoute>
                        <FirmaDigitale />
                    </ProtectedRoute>
                } />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}