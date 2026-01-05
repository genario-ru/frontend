import * as z from "zod";

import type { profileDialogFormSchema } from "../schemas";

export type ProfileDialogFormValues = z.infer<typeof profileDialogFormSchema>;
