import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Canciones } from "./canciones.model";
import { Repository } from "typeorm";

@Injectable()
export class CancionesService {
    constructor(
        @InjectRepository(Canciones)
        private cancionesRepository: Repository<Canciones>,
    ) {}
    findAll(): Promise<Canciones[]> {
        return this.cancionesRepository.find();
    }
    findById(id: number): Promise<Canciones | null> {
        return this.cancionesRepository.findOneBy({ id });
    }
    createCancion(album: Canciones): Promise<Canciones> {
        return this.cancionesRepository.save(album);
    }
    deleteCancion(album: Canciones): Promise<Canciones> {
        return this.cancionesRepository.remove(album);
    }
    async updateCancion(album: Canciones): Promise<Canciones> {
        await this.cancionesRepository.update(album.id.toString(), album);
        return album;
    }
    async buscarPorNombre(termino: string): Promise<Canciones[]> {
        return this.cancionesRepository
            .createQueryBuilder("cancion")
            .where("cancion.nombre LIKE :termino", { termino: `%${termino}%` })
            .getMany();
    }
}
