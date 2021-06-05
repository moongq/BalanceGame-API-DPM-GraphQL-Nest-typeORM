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
exports.BalanceGameKeywordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const balance_game_keyword_model_1 = require("./balance-game-keyword.model");
let BalanceGameKeywordService = class BalanceGameKeywordService {
    constructor(keywordRepository) {
        this.keywordRepository = keywordRepository;
    }
    async create(createBalanceGameKeywordInput) {
        const newKeyword = await this.keywordRepository.create(createBalanceGameKeywordInput);
        const savedKeyword = await this.keywordRepository.save(newKeyword);
        return savedKeyword;
    }
    async createBulk(createBalanceGameKeywordInputs) {
        const newKeyword = await this.keywordRepository.create(createBalanceGameKeywordInputs);
        const savedKeyword = await this.keywordRepository.save(newKeyword);
        return savedKeyword;
    }
    async findAll() {
        return await this.keywordRepository.find({});
    }
    findOne(id) {
        return `This action returns a #${id} balanceGameKeyword`;
    }
    async removeKeywordsWithGameId(balanceGameId) {
        const result = await this.keywordRepository
            .createQueryBuilder()
            .delete()
            .where("balanceGameId = :balanceGameId", { balanceGameId: balanceGameId })
            .execute();
        console.log("keyword delete all");
        console.log(result);
        return true;
    }
};
BalanceGameKeywordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(balance_game_keyword_model_1.BalanceGameKeyword)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BalanceGameKeywordService);
exports.BalanceGameKeywordService = BalanceGameKeywordService;
//# sourceMappingURL=balance-game-keyword.service.js.map