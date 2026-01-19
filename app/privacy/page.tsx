export default function PrivacyPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <article className="bg-white border-2 border-gray-200 rounded-lg p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0a0a]">Privacy Policy</h1>
          
          <p className="text-sm text-gray-500 mb-8">
            Last updated: January 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">Overview</h2>
            <p className="mb-4">
              BIKOTIC ("we", "our", or "us") operates bikotic.com. This page informs you of our policies regarding the collection, use, and disclosure of information when you use our website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Anonymous Analytics</h3>
            <p className="mb-4">
              We use Vercel Analytics to understand how visitors use our site. This service collects anonymous pageview data only. No personal information, cookies, or tracking identifiers are used. The data collected includes:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>General geographic location (country/city level)</li>
              <li>Device type and browser</li>
            </ul>
            <p className="mb-4">
              This data is aggregated and cannot be used to identify individual users.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">YouTube Videos</h3>
            <p className="mb-4">
              We embed YouTube videos on our review pages using YouTube's privacy-enhanced mode. This means:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>YouTube does not set cookies on your device until you click to play a video</li>
              <li>Once you play a video, YouTube may set cookies according to their own privacy policy</li>
              <li>Your video viewing is subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-bikotic-blue hover:underline">YouTube's Privacy Policy</a></li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
            <p className="mb-4">
              We do not set any cookies on your device through our website. The only cookies you may encounter are:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>YouTube cookies (only after you click play on a video)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Links</h2>
            <p className="mb-4">
              Our website contains links to external sites (manufacturer websites, retailers, etc.). We are not responsible for the privacy practices of these third-party sites. We encourage you to review their privacy policies.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Use of Calculators and Tools</h2>
            <p className="mb-4">
              Our cycling calculators and tools run entirely in your browser. No data you enter into these tools is sent to our servers or stored in any way. All calculations are performed locally on your device.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Data We Do NOT Collect</h2>
            <p className="mb-4">
              We do not collect, store, or process:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Personal identification information (name, email, address, phone number)</li>
              <li>Payment information</li>
              <li>Account credentials (we have no user accounts)</li>
              <li>Tracking cookies or advertising identifiers</li>
              <li>Data from calculator inputs</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
            <p className="mb-4">
              Our website is not directed at children under 13. We do not knowingly collect information from children.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this privacy policy, please contact us at: <a href="mailto:bikotic@outlook.com" className="text-bikotic-blue hover:underline">bikotic@outlook.com</a>
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights (UK/EU Users)</h2>
            <p className="mb-4">
              Under GDPR, you have rights regarding your personal data. However, as we do not collect personal data, there is no personal information to access, correct, or delete. The anonymous analytics data we collect cannot be linked to you as an individual.
            </p>
          </div>
        </article>
      </div>
    </main>
  )
}
