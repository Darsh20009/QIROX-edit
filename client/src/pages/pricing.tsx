import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/layout";
import { CheckCircle2, ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started online",
    price: "From $3,000",
    priceNote: "one-time",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Contact form",
      "Basic SEO setup",
      "2 weeks delivery",
      "30 days support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing businesses that need more functionality",
    price: "From $8,000",
    priceNote: "one-time",
    features: [
      "Up to 15 pages",
      "Custom design system",
      "CMS integration",
      "Advanced forms",
      "Analytics setup",
      "4 weeks delivery",
      "90 days support",
      "1 revision round",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for complex business needs",
    price: "Custom",
    priceNote: "based on scope",
    features: [
      "Unlimited pages",
      "Multi-tenant architecture",
      "Custom integrations",
      "API development",
      "Admin dashboard",
      "Priority support",
      "Dedicated team",
      "SLA agreement",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const faqs = [
  {
    question: "How do you calculate project pricing?",
    answer: "We base pricing on project complexity, number of features, and timeline. After our discovery call, you'll receive a detailed quote with no hidden fees.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes. For projects over $5,000, we offer milestone-based payments: 40% upfront, 30% at midpoint, and 30% upon delivery.",
  },
  {
    question: "What's included in support?",
    answer: "Support includes bug fixes, minor updates, and technical assistance. Major feature additions or redesigns are quoted separately.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Absolutely. Many clients start with Starter and grow into Professional. We'll help you scale when you're ready.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Yes. After the initial support period, we offer monthly maintenance packages starting at $300/month.",
  },
];

export default function Pricing() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Transparent Pricing
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              No hidden fees, no surprise charges. Choose a starting point, 
              and we'll customize to your exact needs.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? "ring-2 ring-foreground" : ""}`}
                data-testid={`card-plan-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default" data-testid="badge-popular">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-semibold text-foreground" data-testid={`text-plan-name-${index}`}>{plan.name}</h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-plan-desc-${index}`}>{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <span className="text-3xl font-bold text-foreground" data-testid={`text-plan-price-${index}`}>{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">{plan.priceNote}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="block">
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full"
                      data-testid={`button-plan-${plan.name.toLowerCase()}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-4">
              <HelpCircle className="w-6 h-6 text-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger
                  className="text-left font-medium text-foreground hover:no-underline"
                  data-testid={`accordion-faq-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Not sure which plan fits?
          </h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            Let's talk about your project. We'll recommend the best approach for your needs and budget.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg" data-testid="button-cta-get-quote">
              Get a Custom Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
