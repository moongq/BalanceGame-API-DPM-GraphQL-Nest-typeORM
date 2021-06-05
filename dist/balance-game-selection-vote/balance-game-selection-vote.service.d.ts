import { Repository } from "typeorm";
import { CreateBalanceGameSelectionVoteInput } from "./dto/create-balance-game-selection-vote.input";
import { UpdateBalanceGameSelectionVoteInput } from "./dto/update-balance-game-selection-vote.input";
import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelection } from "../balance-game-selection/balance-game-selection.model";
import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
export declare class BalanceGameSelectionVoteService {
    private balanceGameSelectionVoteRepository;
    private balanceGameRepository;
    private balanceGameSelectionRepository;
    constructor(balanceGameSelectionVoteRepository: Repository<BalanceGameSelectionVote>, balanceGameRepository: Repository<BalanceGame>, balanceGameSelectionRepository: Repository<BalanceGameSelection>);
    createLogined(userId: string, createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput): Promise<BalanceGame>;
    createNotLogined(createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput): Promise<BalanceGame>;
    findAll(): Promise<BalanceGameSelectionVote[]>;
    findOne(id: number): string;
    getSelectionCounts(selectionId: string): Promise<number>;
    updateLogined(updateInput: UpdateBalanceGameSelectionVoteInput, currentUserId: string): Promise<BalanceGame>;
    removeLogined(gameId: string, currentUserId: string): Promise<BalanceGame>;
    checkVoted(userId: string, balanceGameId: string): Promise<boolean>;
}
