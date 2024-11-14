import { IsNotEmpty, IsString } from "class-validator";

export class AlbumDto {
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    readonly banda_id: number;
}
