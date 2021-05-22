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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_model_1 = require("./comment.model");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const balance_game_selection_vote_service_1 = require("../balance-game-selection-vote/balance-game-selection-vote.service");
let CommentService = class CommentService {
    constructor(commentRepository, balanceGameRepository, balanceGameSelectionVoteService) {
        this.commentRepository = commentRepository;
        this.balanceGameRepository = balanceGameRepository;
        this.balanceGameSelectionVoteService = balanceGameSelectionVoteService;
    }
    async create(userId, createCommentInput) {
        const isVoted = await this.balanceGameSelectionVoteService.checkVoted(userId, createCommentInput.balanceGameId);
        console.log("isVoted");
        console.log(isVoted);
        if (isVoted == false) {
            throw new common_1.HttpException("please vote before make comment", common_1.HttpStatus.BAD_REQUEST);
        }
        const newComment = this.commentRepository.create(Object.assign({ userId }, createCommentInput));
        const savedComment = await this.commentRepository.save(newComment);
        await this.plusCommentCount(createCommentInput.balanceGameId);
        return savedComment;
    }
    async update(userId, commentId, content) {
        const comment = await this.commentRepository.findOne({ id: commentId });
        if (!comment) {
            throw new common_1.HttpException("wrong id inputed/commentId", common_1.HttpStatus.BAD_REQUEST);
        }
        if (comment.userId !== userId) {
            throw new common_1.HttpException("힘들당...", common_1.HttpStatus.BAD_REQUEST);
        }
        const updatedComment = await this.commentRepository
            .createQueryBuilder()
            .update()
            .set({ content: content, color: comment.color })
            .where("id = :commentId", { commentId: commentId })
            .execute();
        return await this.commentRepository.findOne({ id: commentId });
    }
    async findAll() {
        return await this.commentRepository.find({});
    }
    async findCommentsByGameId(gameId) {
        const result = await this.commentRepository.find({ where: { balanceGameId: gameId }, relations: ["replies"] });
        console.log(result);
        return result;
    }
    async remove(userId, commentId) {
        const comment = await this.commentRepository.findOne({ id: commentId });
        if (!comment) {
            throw new common_1.HttpException("wrong id inputed//commentId", common_1.HttpStatus.BAD_REQUEST);
        }
        if (comment.userId !== userId) {
            throw new common_1.HttpException("It is not your comment", common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await this.commentRepository
            .createQueryBuilder()
            .delete()
            .where("id = :commentId", { commentId: commentId })
            .execute();
        if (result.affected !== 1) {
            throw new common_1.HttpException("something wrong in server", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        await this.minusCommentCount(comment.balanceGameId);
        return true;
    }
    async plusCommentCount(gameId) {
        const result = await this.balanceGameRepository
            .createQueryBuilder()
            .update()
            .where("id = :gameId", { gameId: gameId })
            .set({ commentCount: () => "commentCount + 1" })
            .execute();
        if (result.affected !== 1) {
            throw new common_1.HttpException("someThing wrong", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async minusCommentCount(gameId) {
        const result = await this.balanceGameRepository
            .createQueryBuilder()
            .update()
            .where("id = :gameId", { gameId: gameId })
            .set({ commentCount: () => "commentCount - 1" })
            .execute();
        if (result.affected !== 1) {
            throw new common_1.HttpException("someThing wrong", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(comment_model_1.Comment)),
    __param(1, typeorm_1.InjectRepository(balance_game_model_1.BalanceGame)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        balance_game_selection_vote_service_1.BalanceGameSelectionVoteService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map