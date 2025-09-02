import LoaderGate from '@/components/LoaderGate/LoaderGate';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import AboutStats from '@/components/AboutStats/AboutStats';
import SolutionsBand from '@/components/SolutionsBand/SolutionsBand';
import Insights from '@/components/Insights/Insights';
import ContactBand from '@/components/ContactBand/ContactBand';
import SiteFooter from '@/components/SiteFooter/SiteFooter';

export default function Page() {
  return (
    <>
      <LoaderGate minDurationMs={1400} />
      <Navbar />
      <Hero />

      <main>
        <AboutStats />
        <SolutionsBand />
        <Insights />
        <ContactBand />
        <SiteFooter />
      </main>
    </>
  );
}
