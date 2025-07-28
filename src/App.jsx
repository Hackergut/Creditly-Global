import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/useAuthSimple"
import ErrorBoundary from "@/lib/errorBoundary.jsx"

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Pages />
        <Toaster />
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App 