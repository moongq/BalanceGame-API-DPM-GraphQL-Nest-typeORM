import { BalanceGameSelectionVoteService } from "./balance-game-selection-vote.service";
import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
import { CreateBalanceGameSelectionVoteInput } from "./dto/create-balance-game-selection-vote.input";
import { UpdateBalanceGameSelectionVoteInput } from "./dto/update-balance-game-selection-vote.input";
import { BalanceGame } from "../balance-game/balance-game.model";
import { UserJwt } from "../user/dto/user-jwt";
export declare class BalanceGameSelectionVoteResolver {
    private readonly balanceGameSelectionVoteService;
    constructor(balanceGameSelectionVoteService: BalanceGameSelectionVoteService);
    createBalanceGameSelectionVoteLogined(token: UserJwt, createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput): Promise<BalanceGame>;
    createBalanceGameSelectionVoteNotLogined(createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput): Promise<BalanceGame>;
    findAll(): Promise<BalanceGameSelectionVote[]>;
    findOne(id: number): string;
    updateBalanceGameSelectionVoteLogined(updateBalanceGameSelectionVoteInput: UpdateBalanceGameSelectionVoteInput, token: UserJwt): Promise<BalanceGame>;
    removeBalanceGameSelectionVoteLogined(balanceGameId: string, token: UserJwt): Promise<BalanceGame>;
}
