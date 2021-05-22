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
exports.ReplyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reply_model_1 = require("./reply.model");
const balance_game_selection_vote_service_1 = require("../balance-game-selection-vote/balance-game-selection-vote.service");
let ReplyService = class ReplyService {
    constructor(replyRepository, balanceGameSelectionVoteService) {
        this.replyRepository = replyRepository;
        this.balanceGameSelectionVoteService = balanceGameSelectionVoteService;
    }
    async create(userId, createReplyInput) {
        const isVoted = await this.balanceGameSelectionVoteService.checkVoted(userId, createReplyInput.balanceGameId);
        if (isVoted == false) {
            throw new common_1.HttpException("please vote before make comment", common_1.HttpStatus.BAD_REQUEST);
        }
        const newReply = this.replyRepository.create(Object.assign({ userId }, createReplyInput));
        const savedReply = await this.replyRepository.save(newReply);
        return savedReply;
    }
    async update(userId, updateReplyInput) {
        const reply = await this.replyRepository.findOne({ id: updateReplyInput.replyId });
        if (!reply) {
            throw new common_1.HttpException("wrong id inputed/replyId", common_1.HttpStatus.BAD_REQUEST);
        }
        if (reply.userId !== userId) {
            throw new common_1.HttpException("you are not owner of this reply", common_1.HttpStatus.BAD_REQUEST);
        }
        const updatedComment = await this.replyRepository
            .createQueryBuilder()
            .update()
            .set({ content: updateReplyInput.content, color: reply.color })
            .where("id = :replyId", { replyId: updateReplyInput.replyId })
            .execute();
        return await this.replyRepository.findOne({ id: updateReplyInput.replyId });
    }
    async remove(userId, replyId) {
        const reply = await this.replyRepository.findOne({ id: replyId });
        if (!reply) {
            throw new common_1.HttpException("wrong id inputed/replyId", common_1.HttpStatus.BAD_REQUEST);
        }
        if (reply.userId !== userId) {
            throw new common_1.HttpException("It is not your reply", common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await this.replyRepository
            .createQueryBuilder()
            .delete()
            .where("id = :replyId", { replyId: replyId })
            .execute();
        if (result.affected !== 1) {
            throw new common_1.HttpException("something wrong in server", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return true;
    }
};
ReplyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(reply_model_1.Reply)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        balance_game_selection_vote_service_1.BalanceGameSelectionVoteService])
], ReplyService);
exports.ReplyService = ReplyService;
//# sourceMappingURL=reply.service.js.map