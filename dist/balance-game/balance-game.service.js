"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceGameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const balance_game_model_1 = require("./balance-game.model");
const balance_game_keyword_service_1 = require("../balance-game-keyword/balance-game-keyword.service");
const balance_game_selection_service_1 = require("../balance-game-selection/balance-game-selection.service");
const file_service_1 = require("../file/file.service");
const user_model_1 = require("../user/user.model");
const balance_game_selection_vote_model_1 = require("../balance-game-selection-vote/balance-game-selection-vote.model");
let BalanceGameService = class BalanceGameService {
    constructor(balanceGameRepository, userRepository, voteRepository, balanceGameKeywordService, balanceGameSelectionService, fileService) {
        this.balanceGameRepository = balanceGameRepository;
        this.userRepository = userRepository;
        this.voteRepository = voteRepository;
        this.balanceGameKeywordService = balanceGameKeywordService;
        this.balanceGameSelectionService = balanceGameSelectionService;
        this.fileService = fileService;
    }
    async update(updateBalanceGameInput, currentUserId) {
        const result = await this.balanceGameRepository
            .createQueryBuilder("game")
            .where("id = :id", { id: updateBalanceGameInput.balanceGameId })
            .select(["game.userId"])
            .getOne();
        if (!result) {
            throw new common_1.HttpException("Wrong id input/gameId", common_1.HttpStatus.BAD_REQUEST);
        }
        if (result["userId"] !== currentUserId) {
            throw new common_1.HttpException("You are not owner of this game", common_1.HttpStatus.UNAUTHORIZED);
        }
        for (const balanceGameSelectionInput of updateBalanceGameInput.balanceGameSelections) {
            const updatedSelection = await this.balanceGameSelectionService.update(balanceGameSelectionInput.id, balanceGameSelectionInput);
            console.log("updatedSelection");
            console.log(updatedSelection);
        }
        if (updateBalanceGameInput.balanceGameKeywords.length > 0) {
            const deletedResult = await this.balanceGameKeywordService.removeKeywordsWithGameId(updateBalanceGameInput.balanceGameId);
            console.log("deletedResult");
            console.log(deletedResult);
            for (const balanceGameKeyword of updateBalanceGameInput.balanceGameKeywords) {
                const newKeyword = await this.balanceGameKeywordService.create({
                    balanceGameId: updateBalanceGameInput.balanceGameId,
                    name: balanceGameKeyword.name,
                });
                console.log("new keyword");
                console.log(newKeyword);
            }
        }
        if (updateBalanceGameInput.description) {
            const updatedBalanceGame = await this.balanceGameRepository
                .createQueryBuilder()
                .update()
                .set({ description: updateBalanceGameInput.description })
                .where(`id = :id`, { id: updateBalanceGameInput.balanceGameId })
                .execute();
            console.log("updatedBalanceGame");
            console.log(updatedBalanceGame);
        }
        const changedGame = await this.balanceGameRepository.findOne({ id: updateBalanceGameInput.balanceGameId }, {
            relations: ["balanceGameSelections", "balanceGameKeywords"],
        });
        console.log(changedGame);
        return changedGame;
    }
    async create(token, createBalanceGameInput) {
        const newBalanceGame = this.balanceGameRepository.create({
            userId: token,
            description: createBalanceGameInput.description,
        });
        const savedBalanceGame = await this.balanceGameRepository.save(newBalanceGame);
        for (const selection of createBalanceGameInput.balanceGameSelections) {
            selection.balanceGameId = savedBalanceGame.id;
        }
        const gameSelections = await this.balanceGameSelectionService.createBulk(createBalanceGameInput.balanceGameSelections);
        for (const keyword of createBalanceGameInput.balanceGameKeywords) {
            keyword.balanceGameId = savedBalanceGame.id;
        }
        const gameKeywords = await this.balanceGameKeywordService.createBulk(createBalanceGameInput.balanceGameKeywords);
        savedBalanceGame.balanceGameSelections = gameSelections;
        savedBalanceGame.balanceGameKeywords = gameKeywords;
        return savedBalanceGame;
    }
    async findAll(limit, offset) {
        const [balanceGames, count] = await this.balanceGameRepository.findAndCount({
            relations: ["balanceGameKeywords", "balanceGameSelections"],
            take: limit,
            skip: offset,
            order: {
                createdAt: "DESC",
            },
        });
        return {
            num: count,
            balanceGame: balanceGames,
        };
    }
    async findAllTEST() {
        const balanceGames = await this.balanceGameRepository.find({
            relations: ["balanceGameKeywords", "balanceGameSelections"],
            take: 5,
            order: {
                createdAt: "DESC",
            },
        });
        return balanceGames;
    }
    async findOne(userId, gameId) {
        const result = await this.balanceGameRepository.findOne({ id: gameId }, { relations: ["balanceGameKeywords", "balanceGameSelections"] });
        if (!result) {
            throw new common_1.HttpException("Wrong id input/gameId", common_1.HttpStatus.BAD_REQUEST);
        }
        const myGameWithSelection = await this.voteRepository
            .createQueryBuilder()
            .where("userId = :userId", { userId: userId })
            .andWhere("balanceGameId = :gameId", { gameId: gameId })
            .getOne();
        if (myGameWithSelection) {
            const selectionId = myGameWithSelection.balanceGameSelectionId;
            result.mySelection = selectionId;
        }
        else {
            result.mySelection = null;
        }
        console.log("put voted");
        console.log(result);
        return result;
    }
    async findOneNotLogined(gameId) {
        const result = await this.balanceGameRepository.findOne({ id: gameId }, { relations: ["balanceGameKeywords", "balanceGameSelections"] });
        if (!result) {
            throw new common_1.HttpException("Wrong id input/gameId", common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    async findAllByUserID(userId) {
        return await this.balanceGameRepository.find({ userId });
    }
    async remove(balanceGameId, currentUserId) {
        const result = await this.balanceGameRepository
            .createQueryBuilder("game")
            .where("id = :id", { id: balanceGameId })
            .select(["game.userId"])
            .getOne();
        if (!result) {
            throw new common_1.HttpException("Wrong id input/gameId", common_1.HttpStatus.BAD_REQUEST);
        }
        if (result["userId"] !== currentUserId) {
            throw new common_1.HttpException("You are not owner of this game", common_1.HttpStatus.UNAUTHORIZED);
        }
        const deleteResult = await this.balanceGameRepository
            .createQueryBuilder()
            .delete()
            .where(`id = :id`, { id: balanceGameId })
            .execute();
        console.log(deleteResult);
        if (deleteResult.affected == 1) {
            return true;
        }
        else {
            return false;
        }
    }
};
BalanceGameService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(balance_game_model_1.BalanceGame)),
    __param(1, typeorm_1.InjectRepository(user_model_1.User)),
    __param(2, typeorm_1.InjectRepository(balance_game_selection_vote_model_1.BalanceGameSelectionVote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        balance_game_keyword_service_1.BalanceGameKeywordService,
        balance_game_selection_service_1.BalanceGameSelectionService,
        file_service_1.FileService])
], BalanceGameService);
exports.BalanceGameService = BalanceGameService;
//# sourceMappingURL=balance-game.service.js.map