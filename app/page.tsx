import { HeroSection } from "@/components/sections/HeroSection";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { TopPackagesSection } from "@/components/sections/TopPackagesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { VisaServicesSection } from "@/components/sections/VisaServicesSection";
import { UmrahSection } from "@/components/sections/UmrahSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CTASection } from "@/components/sections/CTASection";
import { PartnersSection } from "@/components/sections/PartnersSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DestinationsSection />
      <TopPackagesSection />
      <WhyChooseUs />
      <VisaServicesSection />
      <UmrahSection />
      <ReviewsSection />
      <BlogSection />
      <CTASection />
      <PartnersSection />
    </>
  );
}
