import { Test, TestingModule } from "@nestjs/testing";
import { BandasController } from "./bandas.controller";

describe("BandasController", () => {
    let controller: BandasController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BandasController],
        }).compile();

        controller = module.get<BandasController>(BandasController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
