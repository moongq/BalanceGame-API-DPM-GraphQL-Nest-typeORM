import { Test, TestingModule } from "@nestjs/testing";
import { BalanceGameService } from "./balance-game.service";

describe("Test1Service", () => {
  let service: BalanceGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceGameService],
    }).compile();

    service = module.get<BalanceGameService>(BalanceGameService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
