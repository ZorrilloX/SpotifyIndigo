import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bandas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    genero_id: number;
}
