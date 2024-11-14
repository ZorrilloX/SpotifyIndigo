import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Albums } from "./albums.model";
import { Repository } from "typeorm";

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Albums)
        private albumsRepository: Repository<Albums>,
    ) {}
    findAll(): Promise<Albums[]> {
        return this.albumsRepository.find();
    }
    findById(id: number): Promise<Albums | null> {
        return this.albumsRepository.findOneBy({ id });
    }
    createAlbum(album: Albums): Promise<Albums> {
        return this.albumsRepository.save(album);
    }
    deleteAlbum(album: Albums): Promise<Albums> {
        return this.albumsRepository.remove(album);
    }
    async updateAlbum(album: Albums): Promise<Albums> {
        await this.albumsRepository.update(album.id.toString(), album);
        return album;
    }
    async buscarPorNombre(termino: string): Promise<Albums[]> {
        return this.albumsRepository
            .createQueryBuilder("album")
            .where("album.nombre LIKE :termino", { termino: `%${termino}%` })
            .getMany();
    }
}
