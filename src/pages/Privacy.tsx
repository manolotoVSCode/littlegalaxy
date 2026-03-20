import { Link } from "react-router-dom";

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
        <Link to="/" className="text-primary hover:underline text-sm inline-block">
          ← Back to Little Galaxy
        </Link>

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
            Last updated: March 19, 2026
          </p>
        </div>

        <p className="text-muted-foreground leading-relaxed text-sm">
          This Privacy Policy applies to all applications developed and published
          by Manuel de la Torre R ("Developer", "I", "me") on the Apple App
          Store.
        </p>

        <Section title="1. No Data Collection">
          I do not collect, store, transmit, or share any personal data or usage
          data from users of my applications. My apps do not require you to
          create an account, provide personal information, or connect to external
          servers operated by me.
        </Section>

        <Section title="2. Data Processed on Device">
          Any data you enter or generate while using my apps is processed
          exclusively on your device. This data never leaves your device and is
          not accessible to me or any third party.
        </Section>

        <Section title="3. Third-Party Services">
          My apps do not integrate third-party analytics, advertising networks,
          or tracking SDKs. If a future version of an app includes any
          third-party service, this Privacy Policy will be updated accordingly
          before the update is published.
        </Section>

        <Section title="4. Apple Services">
          My apps may use Apple frameworks and services (such as iCloud,
          StoreKit, or GameCenter) as provided by the iOS/macOS platform. Data
          collected by Apple through these services is governed exclusively by
          Apple's Privacy Policy.
        </Section>

        <Section title="5. Children's Privacy">
          My apps do not knowingly collect any information from children under
          the age of 13. If an app is designed for children, it complies with
          Apple's guidelines for the Kids Category and applicable law.
        </Section>

        <Section title="6. Data Retention and Deletion">
          Since I do not collect any user data, there is no data to retain or
          delete on my end. Any data stored locally on your device by the app can
          be deleted by uninstalling the app.
        </Section>

        <Section title="7. Changes to This Policy">
          I may update this Privacy Policy from time to time. Any changes will be
          reflected in an updated version published at the same URL. Continued
          use of my apps after any changes constitutes your acceptance of the
          revised policy.
        </Section>

        <Section title="8. Contact">
          If you have any questions about this Privacy Policy, you may contact
          me:
          <br />
          <br />
          <strong className="text-foreground">Manuel de la Torre R</strong>
          <br />
          Developer, Apple App Store
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
