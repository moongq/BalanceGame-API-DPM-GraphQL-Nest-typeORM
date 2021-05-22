import { Repository } from "typeorm";
import { BalanceGameSelection } from "./balance-game-selection.model";
import { CreateBalanceGameSelectionInput } from "./dto/create-balance-game-selection.input";
import { UpdateBalanceGameSelectionInput } from "./dto/update-balance-game-selection.input";
export declare class BalanceGameSelectionService {
    private balanceGameSelectionRepository;
    constructor(balanceGameSelectionRepository: Repository<BalanceGameSelection>);
    create(createBalanceGameSelectionInput: CreateBalanceGameSelectionInput): Promise<BalanceGameSelection>;
    createBulk(createBalanceGameSelectionInputs: [CreateBalanceGameSelectionInput]): Promise<BalanceGameSelection[]>;
    findAll(): Promise<BalanceGameSelection[]>;
    findOne(id: number): string;
    update(id: string, updateBalanceGameSelectionInput: UpdateBalanceGameSelectionInput): Promise<any>;
}
