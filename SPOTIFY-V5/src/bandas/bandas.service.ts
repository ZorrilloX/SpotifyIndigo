import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bandas } from "./bandas.model";
import { Repository } from "typeorm";

@Injectable()
export class BandasService {
    constructor(
        @InjectRepository(Bandas)
        private bandasRepository: Repository<Bandas>,
    ) {}
    findAll(): Promise<Bandas[]> {
        return this.bandasRepository.find();
    }
    findById(id: number): Promise<Bandas | null> {
        return this.bandasRepository.findOneBy({ id });
    }
    createBanda(banda: Bandas): Promise<Bandas> {
        return this.bandasRepository.save(banda);
    }
    deleteBanda(banda: Bandas): Promise<Bandas> {
        return this.bandasRepository.remove(banda);
    }
    async updateBanda(banda: Bandas): Promise<Bandas> {
        await this.bandasRepository.update(banda.id.toString(), banda);
        return banda;
    }
    async buscarPorNombre(termino: string): Promise<Bandas[]> {
        return this.bandasRepository
            .createQueryBuilder("banda")
            .where("banda.nombre LIKE :termino", { termino: `%${termino}%` })
            .getMany();
    }
}
