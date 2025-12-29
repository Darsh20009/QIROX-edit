import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/layout";
import {
  Building2,
  Code2,
  Store,
  Layers,
  Settings,
  ArrowRight,
  CheckCircle2,
  Users,
  Shield,
  Zap,
} from "lucide-react";

type BuildOption = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
};

const buildOptions: BuildOption[] = [
  {
    id: "company",
    icon: Building2,
    title: "Company Website",
    description: "Professional presence for your business with custom pages, team profiles, and brand showcase.",
    features: ["Custom design", "Team pages", "Portfolio showcase", "Contact forms"],
  },
  {
    id: "platform",
    icon: Layers,
    title: "Platform / SaaS",
    description: "Build multi-tenant platforms with user management, dashboards, and scalable architecture.",
    features: ["Multi-tenant", "User auth", "Admin dashboard", "API integrations"],
  },
  {
    id: "system",
    icon: Settings,
    title: "Business System",
    description: "Custom CRM, ERP, or internal tools tailored to your specific business processes.",
    features: ["Custom workflows", "Data management", "Reporting", "Integrations"],
  },
  {
    id: "store",
    icon: Store,
    title: "Online Store",
    description: "E-commerce solutions with product management, payments, and order fulfillment.",
    features: ["Product catalog", "Secure payments", "Order tracking", "Inventory"],
  },
  {
    id: "custom",
    icon: Code2,
    title: "Custom Build",
    description: "Something unique? We'll work with you to bring your vision to life.",
    features: ["Consultation", "Custom scope", "Flexible timeline", "Full support"],
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24h", label: "Response Time" },
  { value: "100%", label: "Human-Driven" },
];

const principles = [
  {
    icon: Users,
    title: "Human-Driven",
    description: "Every decision, deployment, and change requires human approval. No autopilot.",
  },
  {
    icon: Shield,
    title: "Security-First",
    description: "Built-in security with rate limits, encryption, and strict permissions from day one.",
  },
  {
    icon: Zap,
    title: "Modular Design",
    description: "Everything is a module. Scale, customize, and extend without breaking what works.",
  },
];

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selected = buildOptions.find((opt) => opt.id === selectedOption);

  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6" data-testid="badge-tagline">
              Build systems. Stay human.
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight" data-testid="text-hero-title">
              We build the systems
              <br />
              <span className="text-muted-foreground">you need to grow</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              No magic. No autopilot. Just real solutions built by real people who understand your business. Every feature, every decision — human-approved.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              What are you trying to build?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Select an option to see how we can help
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {buildOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedOption === option.id;
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all hover-elevate ${
                    isSelected ? "ring-2 ring-foreground" : ""
                  }`}
                  onClick={() => setSelectedOption(isSelected ? null : option.id)}
                  data-testid={`card-option-${option.id}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                      isSelected ? "bg-foreground text-background" : "bg-muted"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-foreground">{option.title}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selected && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {selected.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {selected.description}
                      </p>
                      <Link href="/contact">
                        <Button data-testid="button-start-project">
                          Start Your Project
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        {selected.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-accent-foreground flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Our Principles
            </h2>
            <p className="mt-3 text-muted-foreground">
              What makes QIROX different
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="text-center" data-testid={`principle-item-${index}`}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-muted mb-5">
                    <Icon className="w-7 h-7 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`text-principle-title-${index}`}>
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-principle-desc-${index}`}>
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center" data-testid={`stat-item-${index}`}>
                <div className="text-3xl md:text-4xl font-bold text-foreground" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to build something real?
          </h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            Let's discuss your project. No sales pitch, no pressure — just a genuine conversation about what you need.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg" data-testid="button-cta-contact">
              Start a Conversation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
