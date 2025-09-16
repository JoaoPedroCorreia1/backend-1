import { CreateReportDto } from "./create-report.dto";

export class UpdateReportDto implements Partial<CreateReportDto> {
    clinicId?: string;
    childId?: string;
    specialistId?: string;
    title?: string;
    content?: string;
}
