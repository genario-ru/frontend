import { landingPersonalizationFeatures } from "../constants/landing-personalization-features";
import { LandingPersonalizationFeature } from "./landing-personalization-feature";

export function LandingPersonalizationFeatures() {
  return (
    <div className="flex w-full flex-col gap-6">
      {landingPersonalizationFeatures.map((feature, index) => (
        <LandingPersonalizationFeature
          key={`landing-personalization-feature-${index}`}
          image={feature.image}
          title={feature.title}
          description={feature.description}
          inverseOrder={feature.inverseOrder}
        />
      ))}
    </div>
  );
}
