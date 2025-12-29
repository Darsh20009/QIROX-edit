import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import {
  MessageSquare,
  FileText,
  Code2,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery Call",
    description: "We start with a conversation. Tell us about your business, your challenges, and what you want to achieve. No technical jargon — just plain talk.",
    details: [
      "30-minute video call",
      "Understand your goals",
      "Identify key requirements",
      "No commitment required",
    ],
  },
  {
    number: "02",
    icon: FileText,
    title: "Proposal & Quote",
    description: "Within 48 hours, you'll receive a detailed proposal with clear scope, timeline, and pricing. No hidden fees, no surprises.",
    details: [
      "Detailed project scope",
      "Clear timeline",
      "Transparent pricing",
      "Revision process explained",
    ],
  },
  {
    number: "03",
    icon: Code2,
    title: "Development",
    description: "Our team builds your solution with regular updates. Every major decision requires your approval — you're always in control.",
    details: [
      "Weekly progress updates",
      "Human approval gates",
      "Transparent communication",
      "Iterative development",
    ],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Support",
    description: "We deploy your solution and provide ongoing support. Your system is live, but our relationship continues.",
    details: [
      "Smooth deployment",
      "Training & documentation",
      "Ongoing maintenance",
      "Priority support",
    ],
  },
];

const commitments = [
  "No AI autopilot decisions",
  "No hidden automation",
  "No surprise charges",
  "No scope creep without approval",
];

export default function HowItWorks() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              How We Work
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              A transparent, human-driven process from start to finish. 
              You're in control at every step.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;
              return (
                <div
                  key={step.number}
                  className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                  data-testid={`step-item-${index}`}
                >
                  <div className={isEven ? "md:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl font-bold text-muted-foreground/30" data-testid={`text-step-number-${index}`}>
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground mb-3" data-testid={`text-step-title-${index}`}>
                      {step.title}
                    </h2>
                    <p className="text-muted-foreground mb-6" data-testid={`text-step-desc-${index}`}>
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent-foreground flex-shrink-0" />
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={isEven ? "md:order-1" : ""}>
                    <Card>
                      <CardContent className="p-8 flex items-center justify-center min-h-[200px]">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                            <Icon className="w-10 h-10 text-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Step {step.number}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
              Our Commitments
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {commitments.map((commitment, index) => (
                <div
                  key={commitment}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border"
                  data-testid={`commitment-item-${index}`}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent-foreground flex-shrink-0" />
                  <span className="text-foreground font-medium" data-testid={`text-commitment-${index}`}>{commitment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to start your project?
          </h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            Book a discovery call and let's discuss how we can help build your system.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg" data-testid="button-cta-book-call">
              Book a Discovery Call
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
