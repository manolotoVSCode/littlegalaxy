export default function Privacy() {
  return (
    <div
      className="min-h-screen px-6 py-12 text-foreground"
      style={{
        background:
          "linear-gradient(135deg, hsl(225 80% 6%), hsl(230 70% 10%), hsl(240 60% 12%), hsl(220 80% 8%))",
      }}
    >
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1
            className="text-4xl font-black tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, hsl(200 100% 70%), hsl(270 90% 75%), hsl(320 100% 70%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Little Galaxy · Last updated: March 2026
          </p>
        </div>

        <Section title="Overview">
          Little Galaxy is a free, interactive space playground designed for
          toddlers aged 1–5. We are committed to protecting the privacy of all
          users, especially children. This policy explains what data we collect
          (spoiler: none), and how we operate the app.
        </Section>

        <Section title="Data We Collect">
          <strong>We collect no personal data.</strong> Little Galaxy does not
          ask for, store, or transmit any personally identifiable information
          from you or your child. There are no accounts, no sign-ups, and no
          user profiles.
        </Section>

        <Section title="Analytics">
          The web version of Little Galaxy (littlegalaxy.org) uses Google
          Analytics solely to understand how many people visit the site (page
          views, country of origin). No behavioral data is collected within the
          game itself, and no data is shared with third parties for advertising
          purposes.
          <br />
          <br />
          The native iOS and Android apps do not use any analytics or tracking
          SDK.
        </Section>

        <Section title="Children's Privacy (COPPA &amp; GDPR-K)">
          Little Galaxy is designed for children under 13. In compliance with
          the Children's Online Privacy Protection Act (COPPA) and the EU
          General Data Protection Regulation (GDPR):
          <ul className="mt-3 list-disc list-inside space-y-1 text-muted-foreground">
            <li>We do not knowingly collect any data from children.</li>
            <li>We do not display behaviorally targeted advertising.</li>
            <li>We do not share any information with third parties.</li>
            <li>There are no in-app purchases accessible to children.</li>
            <li>There are no external links accessible during gameplay.</li>
          </ul>
        </Section>

        <Section title="Third-Party Services">
          The app does not integrate any third-party SDKs, advertising networks,
          social media plugins, or analytics tools that collect user data.
        </Section>

        <Section title="Permissions">
          Little Galaxy requests no device permissions. It does not access your
          camera, microphone, contacts, location, or any other device feature
          beyond the screen and speakers.
        </Section>

        <Section title="Audio">
          Sound effects are generated locally on your device. No audio is
          recorded or transmitted.
        </Section>

        <Section title="Changes to This Policy">
          If we update this Privacy Policy, the new version will be posted at{" "}
          <a
            href="https://littlegalaxy.org/privacy"
            className="text-primary underline"
          >
            littlegalaxy.org/privacy
          </a>{" "}
          with a revised date. We encourage parents to review it periodically.
        </Section>

        <Section title="Contact">
          If you have any questions about this Privacy Policy, please contact
          us:
          <br />
          <br />
          <a
            href="mailto:hello@littlegalaxy.org"
            className="text-primary underline"
          >
            hello@littlegalaxy.org
          </a>
          <br />
          Manuel de la Torre — Creator of Little Galaxy
        </Section>

        <p className="text-center text-xs text-muted-foreground/50 pt-4">
          🪐 Little Galaxy — A cosmic playground for little explorers
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground leading-relaxed text-sm">{children}</p>
    </div>
  );
}
