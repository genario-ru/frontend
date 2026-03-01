import { z } from "@/lib/zod";

import type { profileDialogFormSchema } from "../schemas/profile-dialog-form-schema";

export type ProfileDialogFormValues = z.infer<typeof profileDialogFormSchema>;
