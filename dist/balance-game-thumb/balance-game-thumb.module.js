"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceGameThumbModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const balance_game_thumb_model_1 = require("./balance-game-thumb.model");
const balance_game_thumb_resolver_1 = require("./balance-game-thumb.resolver");
const balance_game_thumb_service_1 = require("./balance-game-thumb.service");
let BalanceGameThumbModule = class BalanceGameThumbModule {
};
BalanceGameThumbModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([balance_game_thumb_model_1.BalanceGameThumb])],
        providers: [balance_game_thumb_resolver_1.BalanceGameThumbResolver, balance_game_thumb_service_1.BalanceGameThumbService],
    })
], BalanceGameThumbModule);
exports.BalanceGameThumbModule = BalanceGameThumbModule;
//# sourceMappingURL=balance-game-thumb.module.js.map