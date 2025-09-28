import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import BackButton from '@/components/back-button'

export const metadata: Metadata = {
  title: 'Privacy Policy - Superprompts',
  description: 'Learn how Superprompts collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Back Button */}
        <div className="mb-8">
          <BackButton href="/" text="Back to Home" />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Introduction</CardTitle>
            <CardDescription>
              At Superprompts, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                1. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                    <li>Name and email address when you create an account</li>
                    <li>Profile information you choose to provide</li>
                    <li>Communication preferences and feedback</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                    <li>Pages visited and time spent on our website</li>
                    <li>Features used and interactions with our platform</li>
                    <li>Device information and browser type</li>
                    <li>IP address and general location data</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
                <li>Provide and maintain our AI prompt services</li>
                <li>Process transactions and manage your account</li>
                <li>Send important updates about our services</li>
                <li>Improve our platform based on usage patterns</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                3. Data Storage and Protection
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Regular backups and disaster recovery procedures</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-400">
                  Your data is stored on secure servers and is only accessible to authorized personnel who need it to provide our services.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                4. Cookies and Similar Technologies
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Essential Cookies</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Required for basic website functionality, authentication, and security.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Analytics Cookies</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Help us understand how visitors interact with our website to improve performance.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Preference Cookies</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Remember your settings and preferences for a personalized experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Marketing Cookies</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Used to deliver relevant advertisements and measure campaign effectiveness.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                5. Information Sharing and Disclosure
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                  <li><strong>Service Providers:</strong> Trusted third parties who assist in operating our platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                  <li><strong>Consent:</strong> When you explicitly consent to sharing your information</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                6. Your Rights and Choices
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  You have the following rights regarding your personal information:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-slate-800 dark:text-slate-200">Access & Portability</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Request a copy of your personal data in a portable format.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-slate-800 dark:text-slate-200">Correction</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Update or correct inaccurate personal information.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-slate-800 dark:text-slate-200">Deletion</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Request deletion of your personal data (right to be forgotten).
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-slate-800 dark:text-slate-200">Opt-out</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Unsubscribe from marketing communications and manage cookie preferences.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                7. Data Retention
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                We retain your personal information only as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When you delete your account, we will delete or anonymize your personal information within 30 days, unless we are required to retain it for legal or regulatory purposes.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                8. International Data Transfers
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                9. Children's Privacy
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                11. Contact Us
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Email:</strong> Superprompts30@gmail.com<br />
                    <strong>Instagram:</strong> <a href="https://www.instagram.com/superprompts.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@superprompts.in</a><br />
                    <strong>Built by:</strong> <a href="https://www.instagram.com/reach.ai_/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@reach.ai_</a>
                  </p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  We will respond to your inquiry within 30 days of receipt.
                </p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
