import { Test, TestingModule } from "@nestjs/testing";
import { ImagenServiceService } from "./imagen.service";

describe("ImagenServiceService", () => {
    let service: ImagenServiceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ImagenServiceService],
        }).compile();

        service = module.get<ImagenServiceService>(ImagenServiceService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
