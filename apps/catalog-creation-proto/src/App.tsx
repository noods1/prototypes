import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import BackToLauncher from "./components/BackToLauncher";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CatalogOverview from "./pages/CatalogOverview";
import TestForRay from "./pages/TestForRay";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BackToLauncher />
      <div className="pt-[40px]">
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/catalog-creation-proto">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog/:id/overview" element={<CatalogOverview />} />
            <Route path="/testforray" element={<TestForRay />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
