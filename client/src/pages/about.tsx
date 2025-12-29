import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Purpose Over Profit",
    description: "We build systems that serve real human needs, not vanity metrics. Every project should make someone's work easier or their business better.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    description: "No black boxes, no hidden processes. You see every decision, approve every change, and understand exactly what you're getting.",
  },
  {
    icon: Heart,
    title: "Human Connection",
    description: "Technology should amplify human capability, not replace it. We build tools that keep humans in control and in the loop.",
  },
];

const beliefs = [
  {
    title: "No Magic",
    description: "We don't promise AI-powered miracles or autopilot solutions. We deliver real, working systems built by skilled humans.",
  },
  {
    title: "No Hype",
    description: "We skip the buzzwords and focus on outcomes. If something works, we'll tell you. If it doesn't, we'll be honest about that too.",
  },
  {
    title: "No Shortcuts",
    description: "Quality takes time. We'd rather deliver something excellent a week late than something mediocre on schedule.",
  },
];

export default function About() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              About QIROX
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We believe the best technology serves humans, not the other way around. 
              That's why we build systems with people at the center.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  QIROX was founded on a simple observation: as technology becomes more powerful, 
                  it often becomes less human. Automation promises efficiency but delivers anxiety. 
                  AI promises intelligence but delivers unpredictability.
                </p>
                <p>
                  We started QIROX to offer an alternative. A place where technology is a tool, 
                  not a replacement. Where every system we build has clear human oversight. 
                  Where "smart" means serving people, not outsmarting them.
                </p>
                <p>
                  Today, we help businesses build the systems they need without losing control. 
                  From simple websites to complex platforms, every project follows the same 
                  principle: humans decide, technology executes.
                </p>
              </div>
            </div>
            <div>
              <Card>
                <CardContent className="p-8">
                  <blockquote className="text-lg text-foreground italic">
                    "Build systems. Stay human."
                  </blockquote>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Our philosophy in four words. Technology should amplify human capability, 
                    not diminish human agency.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Our Values
            </h2>
            <p className="mt-3 text-muted-foreground">
              What guides every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center" data-testid={`value-item-${index}`}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-muted mb-5">
                    <Icon className="w-7 h-7 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`text-value-title-${index}`}>
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-value-desc-${index}`}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-12">
              What We Believe
            </h2>

            <div className="space-y-8">
              {beliefs.map((belief, index) => (
                <div key={belief.title} className="flex gap-6" data-testid={`belief-item-${index}`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`text-belief-title-${index}`}>
                      {belief.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-belief-desc-${index}`}>
                      {belief.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Want to work with us?
          </h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            We're always looking for interesting projects and great people to work with.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg" data-testid="button-cta-work-with-us">
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
