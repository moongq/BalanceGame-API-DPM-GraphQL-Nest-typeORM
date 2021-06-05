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
exports.BalanceGameSelectionVoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const balance_game_selection_model_1 = require("../balance-game-selection/balance-game-selection.model");
const balance_game_selection_vote_model_1 = require("./balance-game-selection-vote.model");
let BalanceGameSelectionVoteService = class BalanceGameSelectionVoteService {
    constructor(balanceGameSelectionVoteRepository, balanceGameRepository, balanceGameSelectionRepository) {
        this.balanceGameSelectionVoteRepository = balanceGameSelectionVoteRepository;
        this.balanceGameRepository = balanceGameRepository;
        this.balanceGameSelectionRepository = balanceGameSelectionRepository;
    }
    async createLogined(userId, createBalanceGameSelectionVoteInput) {
        const getSelections = await this.balanceGameRepository.findOne({ id: createBalanceGameSelectionVoteInput.balanceGameId }, { relations: ["balanceGameSelections"] });
        const checkBeforeCreateSelection0 = await this.balanceGameSelectionVoteRepository
            .createQueryBuilder()
            .where("balanceGameId = :gameId", { gameId: createBalanceGameSelectionVoteInput.balanceGameId })
            .andWhere("balanceGameSelectionId = :selectionId", {
            selectionId: getSelections.balanceGameSelections[0].id,
        })
            .andWhere("userId = :userId", { userId: userId })
            .getMany();
        const checkBeforeCreateSelection1 = await this.balanceGameSelectionVoteRepository
            .createQueryBuilder()
            .where("balanceGameId = :gameId", { gameId: createBalanceGameSelectionVoteInput.balanceGameId })
            .andWhere("balanceGameSelectionId = :selectionId", {
            selectionId: getSelections.balanceGameSelections[1].id,
        })
            .andWhere("userId = :userId", { userId: userId })
            .getMany();
        if (checkBeforeCreateSelection0.length > 0 || checkBeforeCreateSelection1.length > 0) {
            throw new common_1.HttpException("already voted", common_1.HttpStatus.BAD_REQUEST);
        }
        const newVote = this.balanceGameSelectionVoteRepository.create(Object.assign({ userId }, createBalanceGameSelectionVoteInput));
        const createdVote = await this.balanceGameSelectionVoteRepository.save(newVote);
        await this.balanceGameRepository
            .createQueryBuilder()
            .update()
            .where("id = :gameId", { gameId: createBalanceGameSelectionVoteInput.balanceGameId })
            .set({ totalVoteCount: () => "totalVoteCount + 1" })
            .execute();
        await this.balanceGameSelectionRepository
            .createQueryBuilder()
            .update()
            .where("id = :selectionId", { selectionId: createBalanceGameSelectionVoteInput.balanceGameSelectionId })
            .set({ voteCount: () => "voteCount + 1" })
            .execute();
        const result = await this.balanceGameRepository.findOne({ id: createdVote.balanceGameId }, { relations: ["balanceGameKeywords", "balanceGameSelections"] });
        return result;
    }
    async createNotLogined(createBalanceGameSelectionVoteInput) {
        const newVote = this.balanceGameSelectionVoteRepository.create(Object.assign({}, createBalanceGameSelectionVoteInput));
        const createdVote = await this.balanceGameSelectionVoteRepository.save(newVote);
        await this.balanceGameRepository
            .createQueryBuilder()
            .update()
            .where("id = :gameId", { gameId: createBalanceGameSelectionVoteInput.balanceGameId })
            .set({ totalVoteCount: () => "totalVoteCount + 1" })
            .execute();
        await this.balanceGameSelectionRepository
            .createQueryBuilder()
            .update()
            .where("id = :selectionId", { selectionId: createBalanceGameSelectionVoteInput.balanceGameSelectionId })
            .set({ voteCount: () => "voteCount + 1" })
            .execute();
        const result = await this.balanceGameRepository.findOne({ id: createdVote.balanceGameId }, { relations: ["balanceGameKeywords", "balanceGameSelections"] });
        return result;
    }
    async findAll() {
        return await this.balanceGameSelectionVoteRepository.find({});
    }
    findOne(id) {
        return `This action returns a #${id} balanceGameSelectionVote`;
    }
    async getSelectionCounts(selectionId) {
        return await this.balanceGameSelectionVoteRepository
            .createQueryBuilder("vote")
            .where("balanceGameSelectionId = :selectionId", { selectionId: selectionId })
            .getCount();
    }
    async updateLogined(updateInput, currentUserId) {
        const voteBeforeUpdate = await this.balanceGameSelectionVoteRepository
            .createQueryBuilder("vote")
            .where("balanceGameId = :gameId", { gameId: updateInput.balanceGameId })
            .andWhere("userId = :userId", { userId: currentUserId })
            .select(["vote.userId", "vote.id", "vote.balanceGameSelectionId"])
            .getOne();
        if (!voteBeforeUpdate) {
            throw new common_1.HttpException("Wrong id input/gameId", common_1.HttpStatus.BAD_REQUEST);
        }
        if (voteBeforeUpdate.balanceGameSelectionId == updateInput.newBalanceGameSelectionId) {
            throw new common_1.HttpException("already updated", common_1.HttpStatus.BAD_REQUEST);
        }
        if (voteBeforeUpdate["userId"] !== currentUserId) {
            throw new common_1.HttpException("You are not owner of this vote", common_1.HttpStatus.UNAUTHORIZED);
        }
        const updateResult = await this.balanceGameSelectionVoteRepository
            .createQueryBuilder()
            .update()
            .where("id = :voteId", { voteId: voteBeforeUpdate.id })
            .set({ balanceGameSelectionId: updateInput.newBalanceGameSelectionId })
            .execute();
        if (updateResult.affected !== 1) {
            throw new common_1.HttpException("not deleted/something wrong", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        await this.balanceGameSelectionRepository
            .createQueryBuilder()
            .update()
            .where("id = :selectionId", { selectionId: voteBeforeUpdate.balanceGameSelectionId })
            .set({ voteCount: () => "voteCount - 1" })
            .execute();
        await this.balanceGameSelectionRepository
            .createQueryBuilder()
            .update()
            .where("id = :selectionId", { selectionId: updateInput.newBalanceGameSelectionId })
            .set({ voteCount: () => "voteCount + 1" })
            .execute();
        const game = await this.balanceGameRepository.findOne({ id: updateInput.balanceGameId }, { relations: ["balanceGameKeywords", "balanceGameSelections"] });
        return game;
    }
    async removeLogined(gameId, currentUserId) {
        const voteBeforeUpdate = await this.balanceGameSelectionVoteRepository
            .createQueryBuilder("vote")
            .where("balanceGameId = :gameId", { gameId: gameId })
            .andWhere("userId = :userId", { userId: currentUserId })
            .select(["vote.userId", "vote.id", "vote.balanceGameSelectionId"])
            .getOne();
        if (!voteBeforeUpdate) {
            throw new common_1.HttpException("Wrong id input/gameId", common_1.HttpStatus.BAD_REQUEST);
        }
        if (voteBeforeUpdate["userId"] !== currentUserId) {
            throw new common_1.HttpException("You are not owner of this vote", common_1.HttpStatus.UNAUTHORIZED);
        }
        const deleteResult = await this.balanceGameSelectionVoteRepository
            .createQueryBuilder()
            .delete()
            .where("id = :voteId", { voteId: voteBeforeUpdate.id })
            .execute();
        if (deleteResult.affected !== 1) {
            throw new common_1.HttpException("not deleted/something wrong", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        await this.balanceGameRepository
            .createQueryBuilder()
            .update()
            .where("id = :gameId", { gameId: gameId })
            .set({ totalVoteCount: () => "totalVoteCount - 1" })
            .execute();
        await this.balanceGameSelectionRepository
            .createQueryBuilder()
            .update()
            .where("id = :selectionId", { selectionId: voteBeforeUpdate.balanceGameSelectionId })
            .set({ voteCount: () => "voteCount - 1" })
            .execute();
        const game = await this.balanceGameRepository.findOne({ id: gameId }, { relations: ["balanceGameKeywords", "balanceGameSelections"] });
        return game;
    }
    async checkVoted(userId, balanceGameId) {
        const result = await this.balanceGameSelectionVoteRepository
            .createQueryBuilder()
            .where("userId = :userId", { userId: userId })
            .andWhere("balanceGameId = :balanceGameId", { balanceGameId: balanceGameId })
            .getMany();
        console.log(result);
        if (result.length > 0) {
            return true;
        }
        return false;
    }
};
BalanceGameSelectionVoteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(balance_game_selection_vote_model_1.BalanceGameSelectionVote)),
    __param(1, typeorm_1.InjectRepository(balance_game_model_1.BalanceGame)),
    __param(2, typeorm_1.InjectRepository(balance_game_selection_model_1.BalanceGameSelection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BalanceGameSelectionVoteService);
exports.BalanceGameSelectionVoteService = BalanceGameSelectionVoteService;
//# sourceMappingURL=balance-game-selection-vote.service.js.map