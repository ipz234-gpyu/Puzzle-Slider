import type {ReactNode} from 'react';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type FeatureItem = {
  step: string;
  title: string;
  description: ReactNode;
  bullets: string[];
};

const FeatureList: FeatureItem[] = [
  {
    step: '01',
    title: 'Feature-Sliced Design (FSD) Architectural Pattern',
    description: (
      <>
        The source tree maps cleanly to shared, entities, features, widgets, and pages so dependency direction stays obvious and refactors stay localized.
      </>
    ),
    bullets: ['Public slice APIs only', 'Route composition remains thin', 'Shared UI stays reusable'],
  },
  {
    step: '02',
    title: 'Production-Ready State with Modular Zustand Stores',
    description: (
      <>
        Settings, board state, progress, and game session data are split into focused stores, which keeps selectors small and persistence rules explicit.
      </>
    ),
    bullets: ['Consent-aware storage', 'Lazy hydration at the root', 'In-memory fallback for non-consenting users'],
  },
  {
    step: '03',
    title: 'High-Performance Canvas Rendering & Mathematical Solvability',
    description: (
      <>
        Images are preloaded, board dimensions are measured before rendering, and shuffled states are filtered through a solvability check so impossible layouts never reach the player.
      </>
    ),
    bullets: ['Dynamic image sizing', 'Solvable boards only', 'Fast reset and reshuffle flows'],
  },
];

function Feature({step, title, description, bullets}: FeatureItem) {
  return (
    <article className={styles.featureCard}>
      <p className={styles.featureStep}>{step}</p>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureDescription}>{description}</p>
      <ul className={styles.featureList}>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features} aria-labelledby="homepage-features">
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>Architecture highlights</p>
          <Heading as="h2" id="homepage-features" className={styles.sectionTitle}>
            Built for gameplay clarity and long-term maintainability.
          </Heading>
          <p className={styles.sectionDescription}>
            Puzzle Slider keeps board generation, state, and privacy concerns separate so new modes can be added without collapsing the codebase.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
