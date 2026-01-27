import AdminMaintenancePage from "@/pages/admin/maintenance";
import AdminRolesPage from "@/pages/admin/roles";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";
import { ProjectOnboarding } from "@/pages/project-onboarding";
import ClientDashboard from "@/pages/client-dashboard";
import Developers from "@/pages/developers";
import Home from "@/pages/home";
import HowItWorks from "@/pages/how-it-works";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Support from "@/pages/support";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import NewStore from "@/pages/new-store";
import Subscribe from "@/pages/subscribe";
import EmployeeDashboard from "@/pages/employee-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import MeetingsPage from "@/pages/meetings";
import AdminDashboardFull from "@/pages/admin-dashboard-full";
import StoreManage from "@/pages/store-manage";
import Storefront from "@/pages/storefront";
import TenantsPage from "@/pages/tenants";
import TenantDashboard from "@/pages/tenant-dashboard";
import KanbanBoard from "@/pages/kanban-board";
import KanbanPage from "@/pages/kanban";
import AdminDashboardPage from "@/pages/admin/dashboard";
import AIDashboard from "@/pages/admin/ai-dashboard";
import TextProcessingTool from "@/pages/admin/text-tool";
import AdminUsersPage from "@/pages/admin/users";
import AdminProductsPage from "@/pages/admin/products";
import AdminOrdersPage from "@/pages/admin/orders";
import AdminSubscriptionsPage from "@/pages/admin/subscriptions";
import AdminAnalyticsPage from "@/pages/admin/analytics";
import AdminReportsPage from "@/pages/admin/reports";
import AdminStoresPage from "@/pages/admin/stores";
import AdminSettingsPage from "@/pages/admin/settings";
import AdminPerformancePage from "@/pages/admin/performance";
import AdminSecurityPage from "@/pages/admin/security";
import AdminLocalizationPage from "@/pages/admin/localization";
import AdminDatabasePage from "@/pages/admin/database";
import AdminSupportPage from "@/pages/admin/support";
import AdminCustomizationPage from "@/pages/admin/customization";
import AdminNotificationsPage from "@/pages/admin/notifications";
import AdminSocialPage from "@/pages/admin/social";
import AdminAuditPage from "@/pages/admin/audit";
import AdminFinancialsPage from "@/pages/admin/financials";
import AdminExternalWizardPage from "@/pages/admin/external-wizard";
import AdminDeploymentEnginePage from "@/pages/admin/deployments";
import AdminCloudPage from "@/pages/admin/cloud";
import AdminLogsPage from "@/pages/admin/logs";
import AdminMarketingPage from "@/pages/admin/marketing";
import AdminContentPage from "@/pages/admin/content";
import AdminShippingPage from "@/pages/admin/shipping";
import AdminCouponsPage from "@/pages/admin/coupons";
import AdminPartnersPage from "@/pages/admin/partners";
import AdminInventoryPage from "@/pages/admin/inventory";
import AdminInvoicesPage from "@/pages/admin/invoices";
import NotFound from "@/pages/not-found";
import { SplashScreen } from "@/components/splash-screen";
import { HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* ... rest of the routes remain same ... */}
      <Route path="/developers" component={Developers} />
      <Route path="/build" component={Home} />
      <Route path="/systems" component={Home} />
      <Route path="/stores" component={Home} />
      <Route path="/custom" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/support" component={Support} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/meetings" component={MeetingsPage} />
      <Route path="/agency/onboarding" component={ProjectOnboarding} />
      <Route path="/agency/dashboard" component={ClientDashboard} />
      <Route path="/dashboard/stores/new" component={NewStore} />
      <Route path="/dashboard/subscribe" component={Subscribe} />
      <Route path="/dashboard/stores/:storeId" component={StoreManage} />
      <Route path="/store/:slug" component={Storefront} />
      <Route path="/tenants" component={TenantsPage} />
      <Route path="/tenants/:slug" component={TenantDashboard} />
      <Route path="/kanban" component={KanbanBoard} />
      <Route path="/build/kanban" component={KanbanPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route path="/admin/ai" component={AIDashboard} />
      <Route path="/admin/text-tool" component={TextProcessingTool} />
      <Route path="/admin/users" component={AdminUsersPage} />
      <Route path="/admin/products" component={AdminProductsPage} />
      <Route path="/admin/orders" component={AdminOrdersPage} />
      <Route path="/admin/subscriptions" component={AdminSubscriptionsPage} />
      <Route path="/admin/analytics" component={AdminAnalyticsPage} />
      <Route path="/admin/reports" component={AdminReportsPage} />
      <Route path="/admin/stores" component={AdminStoresPage} />
      <Route path="/admin/settings" component={AdminSettingsPage} />
      <Route path="/admin/performance" component={AdminPerformancePage} />
      <Route path="/admin/security" component={AdminSecurityPage} />
      <Route path="/admin/localization" component={AdminLocalizationPage} />
      <Route path="/admin/database" component={AdminDatabasePage} />
      <Route path="/admin/support" component={AdminSupportPage} />
      <Route path="/admin/customization" component={AdminCustomizationPage} />
      <Route path="/admin/notifications" component={AdminNotificationsPage} />
      <Route path="/admin/social" component={AdminSocialPage} />
      <Route path="/admin/audit" component={AdminAuditPage} />
      <Route path="/admin/cloud" component={AdminCloudPage} />
      <Route path="/admin/external" component={AdminExternalWizardPage} />
      <Route path="/admin/deployments" component={AdminDeploymentEnginePage} />
      <Route path="/admin/financials" component={AdminFinancialsPage} />
      <Route path="/admin/logs" component={AdminLogsPage} />
      <Route path="/admin/marketing" component={AdminMarketingPage} />
      <Route path="/admin/content" component={AdminContentPage} />
      <Route path="/admin/shipping" component={AdminShippingPage} />
      <Route path="/admin/coupons" component={AdminCouponsPage} />
      <Route path="/admin/partners" component={AdminPartnersPage} />
      <Route path="/admin/inventory" component={AdminInventoryPage} />
      <Route path="/admin/invoices" component={AdminInvoicesPage} />
      <Route path="/admin/maintenance" component={AdminMaintenancePage} />
      <Route path="/admin/roles" component={AdminRolesPage} />
      <Route path="/employee" component={EmployeeDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin-full" component={AdminDashboardFull} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  const handleSplashComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <SidebarProvider>
                <div className="flex h-screen w-full bg-[#050505] text-white overflow-hidden">
                  <AppSidebar />
                  <div className="flex-1 flex flex-col min-w-0 relative">
                    <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-md z-40">
                      <SidebarTrigger />
                      <div className="flex items-center gap-4">
                        <ThemeToggle />
                      </div>
                    </header>
                    <main className="flex-1 overflow-y-auto relative">
                      <Router />
                    </main>
                  </div>
                </div>
              </SidebarProvider>
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
