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
exports.BalanceGameSelectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const balance_game_selection_model_1 = require("./balance-game-selection.model");
let BalanceGameSelectionService = class BalanceGameSelectionService {
    constructor(balanceGameSelectionRepository) {
        this.balanceGameSelectionRepository = balanceGameSelectionRepository;
    }
    async create(createBalanceGameSelectionInput) {
        console.log("Input Check");
        console.log(createBalanceGameSelectionInput);
        const newSelection = await this.balanceGameSelectionRepository.create(createBalanceGameSelectionInput);
        const createdSelection = await this.balanceGameSelectionRepository.save(newSelection);
        return createdSelection;
    }
    async createBulk(createBalanceGameSelectionInputs) {
        const newSelections = await this.balanceGameSelectionRepository.create(createBalanceGameSelectionInputs);
        const savedSelections = await this.balanceGameSelectionRepository.save(newSelections);
        return savedSelections;
    }
    async findAll() {
        const selections = await this.balanceGameSelectionRepository.find({});
        return selections;
    }
    findOne(id) {
        return `This action returns a #${id} balanceGameSelection`;
    }
    async update(id, updateBalanceGameSelectionInput) {
        const selection = await this.balanceGameSelectionRepository
            .update({ id: updateBalanceGameSelectionInput.id }, Object.assign({}, updateBalanceGameSelectionInput))
            .then((response) => response.raw[0]);
        console.log("UPDATED DATA");
        console.log(selection);
        return selection;
    }
};
BalanceGameSelectionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(balance_game_selection_model_1.BalanceGameSelection)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BalanceGameSelectionService);
exports.BalanceGameSelectionService = BalanceGameSelectionService;
//# sourceMappingURL=balance-game-selection.service.js.map