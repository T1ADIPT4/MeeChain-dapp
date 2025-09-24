import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnboardingProvider } from "@/hooks/use-onboarding";
import NotFound from "@/pages/not-found";
import MeeChainFlowchart from "@/components/flowchart/MeeChainFlowchart";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Missions from "@/pages/missions";
import SendTokens from "@/pages/send-tokens";
import ReceiveTokens from "@/pages/receive-tokens";
import SwapBridge from "@/pages/swap-bridge";
import TransactionHistory from "@/pages/transaction-history";
import TokenActions from "@/pages/token-actions";
import Earnings from "@/pages/earnings";
import MeeBot from "@/pages/meebot";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/missions" component={Missions} />
      <Route path="/flowchart" component={MeeChainFlowchart} />
      {/* Dashboard sub-routes - dedicated pages */}
      <Route path="/send-tokens" component={SendTokens} />
      <Route path="/receive-tokens" component={ReceiveTokens} />
      <Route path="/swap-bridge" component={SwapBridge} />
      <Route path="/transaction-history" component={TransactionHistory} />
      <Route path="/token-actions" component={TokenActions} />
      <Route path="/earnings" component={Earnings} />
      <Route path="/meebot" component={MeeBot} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </OnboardingProvider>
    </QueryClientProvider>
  );
}

export default App;
