import { WandSparklesIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

type IdeasListIdeaCardImproveDialogProps = {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
};

export function IdeasListIdeaCardImproveDialog({
  isOpened,
  setIsOpened,
}: IdeasListIdeaCardImproveDialogProps) {
  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button icon={<WandSparklesIcon />}>Улучшить</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader
          title="Улучшить идею"
          description="Опишите, что бы вы хотели улучшить или что вас в ней не устраивает"
        />
        <DialogBody>Тут будет форма для улучшения идеи</DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Отмена</Button>
          </DialogClose>
          <Button>Улучшить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
