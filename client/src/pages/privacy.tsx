import { Layout } from "@/components/layout/layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              Last updated: December 2024
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, including: name, email address, 
              company name, and project details when you contact us or use our services.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Communicate with you about projects and inquiries</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties. 
              We may share information with trusted service providers who assist us in operating our 
              business, subject to confidentiality agreements.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. This includes encryption, 
              secure servers, and access controls.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your information for as long as necessary to provide our services and fulfill 
              the purposes described in this policy. We may retain certain information for legitimate 
              business purposes or as required by law.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use minimal cookies necessary for the functioning of our website. These include 
              session cookies and preference cookies. We do not use tracking or advertising cookies.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Changes to This Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "last updated" date.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy, please contact us at hello@qirox.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
