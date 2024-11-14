import { IsNotEmpty } from "class-validator";

export class CancionDto {
    readonly id: number;

    readonly nombre: string;

    @IsNotEmpty()
    readonly album_id: number;
}
