import { Deal } from "./models";
import { BaseForms } from "./services/form.service";

export const materializeBaseForm = (
  baseForm: Readonly<BaseForms>
): Readonly<Deal> => ({
  id: baseForm.base.value.id,
  reference: baseForm.base.value.reference,
});
