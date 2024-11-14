import { IsNotEmpty, IsString } from "class-validator";

export class BandaDto {
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    readonly genero_id: number;
}
