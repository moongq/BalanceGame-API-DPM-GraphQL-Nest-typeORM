import { Test, TestingModule } from "@nestjs/testing";
import { BalanceGameResolver } from "./balance-game.resolver";
import { BalanceGameService } from "./balance-game.service";

describe("Test1Resolver", () => {
  let resolver: BalanceGameResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceGameResolver, BalanceGameService],
    }).compile();

    resolver = module.get<BalanceGameResolver>(BalanceGameResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
