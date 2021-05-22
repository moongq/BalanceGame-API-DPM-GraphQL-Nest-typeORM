import { Repository } from "typeorm";
import { BalanceGame } from "./balance-game.model";
import { BalanceGameList } from "./dto/balance-game-list.output";
import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";
import { BalanceGameKeywordService } from "../balance-game-keyword/balance-game-keyword.service";
import { BalanceGameSelectionService } from "../balance-game-selection/balance-game-selection.service";
import { FileService } from "../file/file.service";
import { User } from "../user/user.model";
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";
export declare class BalanceGameService {
    private balanceGameRepository;
    private userRepository;
    private voteRepository;
    private balanceGameKeywordService;
    private balanceGameSelectionService;
    private fileService;
    constructor(balanceGameRepository: Repository<BalanceGame>, userRepository: Repository<User>, voteRepository: Repository<BalanceGameSelectionVote>, balanceGameKeywordService: BalanceGameKeywordService, balanceGameSelectionService: BalanceGameSelectionService, fileService: FileService);
    update(updateBalanceGameInput: UpdateBalanceGameInput, currentUserId: string): Promise<BalanceGame>;
    create(token: string, createBalanceGameInput: CreateBalanceGameInput): Promise<BalanceGame>;
    findAll(limit?: number, offset?: number): Promise<BalanceGameList>;
    findAllTEST(): Promise<BalanceGame[]>;
    findOne(userId: string, gameId: string): Promise<BalanceGame>;
    findOneNotLogined(gameId: string): Promise<BalanceGame>;
    findAllByUserID(userId: string): Promise<BalanceGame[]>;
    remove(balanceGameId: string, currentUserId: string): Promise<boolean>;
}
