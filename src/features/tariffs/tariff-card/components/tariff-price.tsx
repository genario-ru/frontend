import { NBSP, RUBLE_SIGN, SLASH } from "@/shared/constants/unicode";

type TariffPriceProps = {
  price: number;
  oldPrice?: number | null;
};

export function TariffPrice({ price, oldPrice }: TariffPriceProps) {
  return (
    <div className="w-full">
      <span className="text-2xl font-semibold">
        <span className="group-data-[inverse=true]/tariff-card:text-neutral-1">
          {price}
          {NBSP}
          {RUBLE_SIGN}
        </span>
        {oldPrice && (
          <>
            {NBSP}
            <span className="text-neutral-8/50 group-data-[inverse=true]/tariff-card:text-neutral-1/50 line-through">
              {oldPrice}
              {NBSP}
              {RUBLE_SIGN}
            </span>
          </>
        )}
      </span>
      <span className="text-neutral-8/70 group-data-[inverse=true]/tariff-card:text-neutral-1/70">
        {SLASH}
        мес
      </span>
    </div>
  );
}
