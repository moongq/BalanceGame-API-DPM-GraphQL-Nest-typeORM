import { FileUpload } from "graphql-upload";
import { BalanceGameService } from "./balance-game.service";
import { BalanceGame } from "./balance-game.model";
import { BalanceGameList } from "./dto/balance-game-list.output";
import { BalanceGamesStateInput } from "./dto/balance-game-state.input";
import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";
import { FileService } from "../file/file.service";
import { UserJwt } from "../user/dto/user-jwt";
export declare class BalanceGameResolver {
    private readonly balanceGameService;
    private fileService;
    constructor(balanceGameService: BalanceGameService, fileService: FileService);
    createBalanceGame(token: UserJwt, createBalanceGameInput: CreateBalanceGameInput): Promise<BalanceGame>;
    uploadFile(file1: FileUpload): Promise<unknown>;
    findAll(balanceGamesState: BalanceGamesStateInput): Promise<BalanceGameList>;
    findAllTEST(): Promise<BalanceGame[]>;
    findOneLogined(token: UserJwt, id: string): Promise<BalanceGame>;
    findOneNotLogined(token: UserJwt, id: string): Promise<BalanceGame>;
    updateBalanceGame(updateBalanceGameInput: UpdateBalanceGameInput, token: UserJwt): Promise<BalanceGame>;
    removeBalanceGame(id: string, token: UserJwt): Promise<boolean>;
}
