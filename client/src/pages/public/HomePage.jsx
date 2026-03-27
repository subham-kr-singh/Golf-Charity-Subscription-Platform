import { HeroSection } from '../../components/home/HeroSection';
import { DrawMechanicsSection } from '../../components/home/DrawMechanicsSection';
import { PrizePoolSection } from '../../components/home/PrizePoolSection';
import { CharityImpactSection } from '../../components/home/CharityImpactSection';
import { SubscribeCTASection } from '../../components/home/SubscribeCTASection';
import { GlowDivider } from '../../components/ui/GlowDivider';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <GlowDivider />
      <DrawMechanicsSection />
      <PrizePoolSection />
      <CharityImpactSection />
      <SubscribeCTASection />
    </div>
  );
}
