import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";
import Home from "@/pages/home";
import HowItWorks from "@/pages/how-it-works";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import NewStore from "@/pages/new-store";
import Subscribe from "@/pages/subscribe";
import EmployeeDashboard from "@/pages/employee-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminDashboardFull from "@/pages/admin-dashboard-full";
import StoreManage from "@/pages/store-manage";
import Storefront from "@/pages/storefront";
import TenantsPage from "@/pages/tenants";
import TenantDashboard from "@/pages/tenant-dashboard";
import KanbanBoard from "@/pages/kanban-board";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/stores/new" component={NewStore} />
      <Route path="/dashboard/subscribe" component={Subscribe} />
      <Route path="/dashboard/stores/:storeId" component={StoreManage} />
      <Route path="/store/:slug" component={Storefront} />
      <Route path="/tenants" component={TenantsPage} />
      <Route path="/tenants/:slug" component={TenantDashboard} />
      <Route path="/kanban" component={KanbanBoard} />
      <Route path="/employee" component={EmployeeDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin-full" component={AdminDashboardFull} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
