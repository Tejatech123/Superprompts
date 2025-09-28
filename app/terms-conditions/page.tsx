import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import BackButton from '@/components/back-button'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Superprompts',
  description: 'Read our terms of service and conditions for using Superprompts platform.',
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Back Button */}
        <div className="mb-8">
          <BackButton href="/" text="Back to Home" />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Agreement to Terms</CardTitle>
            <CardDescription>
              By accessing and using Superprompts, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                These Terms of Service ("Terms") govern your use of the Superprompts website and services (collectively, the "Service") operated by Superprompts ("us", "we", or "our").
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                2. Use License and Restrictions
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  Permission is granted to temporarily access and use Superprompts for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Use the Service for any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>Violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>Transmit or procure the sending of any advertising or promotional material without our prior written consent</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                3. User Accounts and Responsibilities
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                  <li>Safeguarding the password and all activities that occur under your account</li>
                  <li>Notifying us immediately upon becoming aware of any breach of security or unauthorized use of your account</li>
                  <li>Ensuring that your account information remains accurate and up-to-date</li>
                  <li>Using the Service in compliance with all applicable laws and regulations</li>
                  <li>Not sharing your account credentials with third parties</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-400">
                  We reserve the right to terminate accounts that violate these terms or engage in fraudulent, abusive, or illegal activities.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                4. Intellectual Property Rights
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Superprompts and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Our Content</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      All AI prompts, templates, and content provided through our platform are proprietary to Superprompts.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">User Content</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      You retain ownership of content you create, but grant us a license to use it for service provision.
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  You may not use our trademarks, service marks, or logos without our prior written consent.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                5. Payment Terms and Refunds
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  If you purchase a subscription or premium features:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                  <li>Payment is due in advance for the subscription period</li>
                  <li>All fees are non-refundable unless otherwise stated</li>
                  <li>We may change our pricing with 30 days' notice</li>
                  <li>You are responsible for any applicable taxes</li>
                  <li>Subscription renewals are automatic unless cancelled</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-400">
                  Refunds may be provided at our sole discretion for technical issues that prevent service usage.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                6. Limitation of Liability
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  In no event shall Superprompts, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Our total liability to you for any damages arising from or related to these Terms or the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                7. Indemnification
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                You agree to defend, indemnify, and hold harmless Superprompts and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of your use and access of the Service, or a breach of these Terms.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                8. Service Availability
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  We strive to maintain high service availability, but we do not guarantee that the Service will be available at all times. The Service may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                  <li>Scheduled maintenance and updates</li>
                  <li>Technical difficulties or system failures</li>
                  <li>Force majeure events beyond our control</li>
                  <li>Third-party service disruptions</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-400">
                  We will make reasonable efforts to notify users of planned maintenance and minimize service disruptions.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                9. Termination
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Upon termination, your right to use the Service will cease immediately. All provisions of the Terms which by their nature should survive termination shall survive termination.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                10. Changes to Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                11. Governing Law and Jurisdiction
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Any disputes arising from these Terms or your use of the Service shall be resolved in the courts of California, United States.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                12. Contact Information
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  If you have any questions about these Terms & Conditions, please contact us:
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Email:</strong> Superprompts30@gmail.com<br />
                    <strong>Instagram:</strong> <a href="https://www.instagram.com/superprompts.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@superprompts.in</a><br />
                    <strong>Built by:</strong> <a href="https://www.instagram.com/reach.ai_/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@reach.ai_</a>
                  </p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  We will respond to your inquiry within 5 business days.
                </p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
