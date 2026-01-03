import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/layout";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <section className="py-20 md:py-28 flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
