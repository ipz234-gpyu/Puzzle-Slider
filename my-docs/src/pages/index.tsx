import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroSurface}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.heroEyebrow}>Puzzle Slider</p>
              <Heading as="h1" className={styles.heroTitle}>
                {siteConfig.title}
              </Heading>
              <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
              <div className={styles.heroMeta}>
                <span className={styles.heroMetaChip}>Feature-Sliced Design</span>
                <span className={styles.heroMetaChip}>Modular Zustand stores</span>
                <span className={styles.heroMetaChip}>Consent-aware persistence</span>
              </div>
              <div className={styles.buttons}>
                <Link className="button button--primary button--lg" to="/docs/intro">
                  Get Started
                </Link>
                <Link className="button button--secondary button--lg" to="/docs/ui-kit/introduction">
                  UI Kit
                </Link>
              </div>
            </div>
            <aside className={styles.heroPanel} aria-label="Puzzle Slider architecture snapshot">
              <p className={styles.panelEyebrow}>Architecture snapshot</p>
              <Heading as="h2" className={styles.panelTitle}>
                Built for a game that stays maintainable as it grows.
              </Heading>
              <ul className={styles.panelList}>
                <li className={styles.panelListItem}>
                  <span className={styles.panelListMarker}>1</span>
                  <p className={styles.panelListText}>
                    Public slice boundaries keep shared, entities, features, widgets, and pages easy to navigate.
                  </p>
                </li>
                <li className={styles.panelListItem}>
                  <span className={styles.panelListMarker}>2</span>
                  <p className={styles.panelListText}>
                    Modular stores isolate puzzle board state, progress persistence, game settings, and session flow.
                  </p>
                </li>
                <li className={styles.panelListItem}>
                  <span className={styles.panelListMarker}>3</span>
                  <p className={styles.panelListText}>
                    The puzzle generator only renders solvable states and rejects impossible tile layouts by design.
                  </p>
                </li>
              </ul>
              <div className={styles.panelStats}>
                <div className={styles.panelStat}>
                  <span className={styles.panelStatValue}>2-10</span>
                  <span className={styles.panelStatLabel}>Valid board sizes</span>
                </div>
                <div className={styles.panelStat}>
                  <span className={styles.panelStatValue}>4</span>
                  <span className={styles.panelStatLabel}>Core domain stores</span>
                </div>
                <div className={styles.panelStat}>
                  <span className={styles.panelStatValue}>100%</span>
                  <span className={styles.panelStatLabel}>Client-side gameplay</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
