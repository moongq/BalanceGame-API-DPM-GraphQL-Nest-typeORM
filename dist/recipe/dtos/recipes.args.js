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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let RecipesArgs = class RecipesArgs {
    constructor() {
        this.skip = 0;
        this.recipe = 25;
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: false, type: () => String }, skip: { nullable: false, type: () => Number }, recipe: { nullable: false, type: () => Number } };
    }
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], RecipesArgs.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], RecipesArgs.prototype, "skip", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    class_validator_1.Min(1),
    class_validator_1.Max(50),
    __metadata("design:type", Object)
], RecipesArgs.prototype, "recipe", void 0);
RecipesArgs = __decorate([
    graphql_1.ArgsType()
], RecipesArgs);
exports.RecipesArgs = RecipesArgs;
//# sourceMappingURL=recipes.args.js.map