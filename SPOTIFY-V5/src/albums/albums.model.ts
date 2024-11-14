import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Albums {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    banda_id: number;
}
