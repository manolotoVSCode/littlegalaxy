import { Link } from "react-router-dom";

const Privacy = () => (
  <div className="min-h-screen bg-background text-foreground px-6 py-12 max-w-3xl mx-auto">
    <Link to="/" className="text-primary hover:underline text-sm mb-8 inline-block">
      ← Back to Little Galaxy
    </Link>

    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="text-muted-foreground text-sm mb-8">Last updated: March 19, 2026</p>

    <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">1. Introduction</h2>
        <p>
          Little Galaxy ("we", "us", or "our") is a free interactive space-themed web application
          designed for toddlers aged 1–5. We are committed to protecting the privacy of our users,
          especially children. This Privacy Policy explains what information we collect and how we use it.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">2. Information We Collect</h2>
        <p>
          Little Galaxy does <strong className="text-foreground">not</strong> collect any personal
          information from its users. We do not require registration, login, or any form of user input
          beyond tapping and pressing keys to interact with the experience.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">3. Analytics</h2>
        <p>
          We use Google Analytics (GA4) to collect anonymous, aggregated usage data such as page views,
          session duration, device type, and approximate geographic location. This data does not identify
          individual users and is used solely to understand how the app is used and to improve the
          experience. No cookies are used for advertising purposes.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">4. Children's Privacy (COPPA)</h2>
        <p>
          Little Galaxy is designed for children under 13 and complies with the Children's Online Privacy
          Protection Act (COPPA). We do not knowingly collect personal information from children. The app
          does not include user accounts, chat, social features, or any mechanism for children to share
          personal information.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">5. Third-Party Services</h2>
        <p>
          The only third-party service used is Google Analytics. No advertising networks, social media
          trackers, or other third-party services are integrated into the app.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">6. Data Storage</h2>
        <p>
          Little Galaxy does not store any user data on servers. All interactions (taps, key presses,
          sounds) are processed locally in the browser and are not transmitted or saved.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">7. Cookies</h2>
        <p>
          Google Analytics may set cookies to distinguish unique users and sessions. These cookies do not
          contain personal information. You can disable cookies through your browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page
          with an updated revision date.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">9. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:{" "}
          <a
            href="mailto:manoloto@hotmail.com"
            className="text-primary hover:underline"
          >
            manoloto@hotmail.com
          </a>
        </p>
      </section>
    </div>

    <p className="text-xs text-muted-foreground mt-12">
      © {new Date().getFullYear()} Little Galaxy by Manuel de la Torre. All rights reserved.
    </p>
  </div>
);

export default Privacy;
