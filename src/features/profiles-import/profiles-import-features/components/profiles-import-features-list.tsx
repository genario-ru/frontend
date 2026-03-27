import { profilesImportFeatures } from "../constants/profiles-import-features";

export function ProfilesImportFeaturesList() {
  return (
    <ul className="w-full list-inside list-disc">
      {profilesImportFeatures.map((feature) => (
        <li key={feature} className="text-neutral-7">
          {feature}
        </li>
      ))}
    </ul>
  );
}
