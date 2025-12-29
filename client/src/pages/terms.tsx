import { Layout } from "@/components/layout/layout";

export default function Terms() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              Last updated: December 2024
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using QIROX services, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access our services.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Services</h2>
            <p className="text-muted-foreground mb-4">
              QIROX provides web development, software development, and related consulting services. 
              The specific scope, deliverables, and terms of each project will be outlined in a 
              separate project agreement or statement of work.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Human Approval Process</h2>
            <p className="text-muted-foreground mb-4">
              All major decisions, deployments, and changes require explicit human approval from 
              authorized representatives. This includes but is not limited to: code deployments, 
              design changes, feature implementations, and content updates.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              Payment terms are specified in individual project agreements. Standard terms include 
              milestone-based payments with deposits required before work begins. Late payments may 
              result in work suspension until accounts are current.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              Upon full payment, clients receive ownership of custom work created specifically for 
              their project. QIROX retains rights to general methodologies, frameworks, and reusable 
              components developed during the engagement.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Confidentiality</h2>
            <p className="text-muted-foreground mb-4">
              Both parties agree to keep confidential information private. This includes business 
              strategies, technical implementations, and any proprietary information shared during 
              the engagement.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              QIROX's liability is limited to the amount paid for services under the applicable 
              project agreement. We are not liable for indirect, incidental, or consequential damages.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these terms at any time. We will provide notice of 
              significant changes via email or through our website.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Contact</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, please contact us at hello@qirox.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
