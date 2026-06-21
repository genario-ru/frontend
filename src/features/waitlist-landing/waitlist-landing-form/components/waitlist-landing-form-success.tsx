import { Plug } from "@/shared/components/ui/plug";

const WAITLIST_LANDING_FORM_SUCCESS_TITLE = "Заявка отправлена";

const WAITLIST_LANDING_FORM_SUCCESS_DESCRIPTION =
  "Спасибо! Мы уведомим вас, как только запустимся.";

export function WaitlistLandingFormSuccess() {
  return (
    <div className="bg-neutral-2 rounded-5 flex min-h-72 w-full items-center justify-center p-6">
      <Plug
        size="lg"
        variant="positive"
        title={WAITLIST_LANDING_FORM_SUCCESS_TITLE}
        description={WAITLIST_LANDING_FORM_SUCCESS_DESCRIPTION}
      />
    </div>
  );
}
