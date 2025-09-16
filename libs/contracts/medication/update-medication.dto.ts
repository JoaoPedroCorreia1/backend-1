import { AddMedicationDto } from "./add-medication.dto";

export class UpdateMedicationDto implements Partial<AddMedicationDto> {
  childId?: string;
  name?: string;
  dosage?: string;
  frequency?: string;
  description?: string;
}
