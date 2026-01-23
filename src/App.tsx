import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Overview from "./pages/Overview";
import News from "./pages/News";
import Results from "./pages/Results";
import Consortium from "./pages/Consortium";
import Contact from "./pages/Contact";
import Exchange from "./pages/Exchange";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Sonner />

          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/news" element={<News />} />
              <Route path="/results" element={<Results />} />
              <Route path="/consortium" element={<Consortium />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
