import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Canciones {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    album_id: number;
}
