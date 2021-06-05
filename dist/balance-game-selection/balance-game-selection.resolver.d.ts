import { BalanceGameSelection } from "./balance-game-selection.model";
import { BalanceGameSelectionService } from "./balance-game-selection.service";
import { CreateBalanceGameSelectionInput } from "./dto/create-balance-game-selection.input";
export declare class BalanceGameSelectionResolver {
    private readonly balanceGameSelectionService;
    constructor(balanceGameSelectionService: BalanceGameSelectionService);
    createBalanceGameSelection(createBalanceGameSelectionInput: CreateBalanceGameSelectionInput): Promise<BalanceGameSelection>;
    findAll(): Promise<BalanceGameSelection[]>;
    findOne(id: number): string;
}
