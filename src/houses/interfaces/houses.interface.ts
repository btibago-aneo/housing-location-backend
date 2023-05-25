import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class House {
    @ApiPropertyOptional({ type: Number })
    id?: number;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    city: string;
    @ApiProperty({ type: String })
    state: string;
    @ApiProperty({ type: String })
    photo: string;
    @ApiProperty({ type: Number })
    availableUnits: number;
    @ApiProperty({ type: Boolean })
    wifi: boolean;
    @ApiProperty({ type: Boolean })
    laundry: boolean;
}
