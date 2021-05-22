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
exports.RecipesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const apollo_server_express_1 = require("apollo-server-express");
const recipe_model_1 = require("./recipe.model");
const recipe_service_1 = require("./recipe.service");
const new_recipe_input_1 = require("./dtos/new-recipe.input");
const pubSub = new apollo_server_express_1.PubSub();
let RecipesResolver = class RecipesResolver {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async recipes() {
        const recipes = await this.recipesService.findAllFromORM();
        return recipes;
    }
    async create(newRecipeData) {
        const recipe = await this.recipesService.create(newRecipeData);
        return recipe;
    }
};
__decorate([
    graphql_1.Query(() => [recipe_model_1.Recipe]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipesResolver.prototype, "recipes", null);
__decorate([
    graphql_1.Mutation((returns) => recipe_model_1.Recipe),
    __param(0, graphql_1.Args("newRecipeData")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_recipe_input_1.NewRecipeInput]),
    __metadata("design:returntype", Promise)
], RecipesResolver.prototype, "create", null);
RecipesResolver = __decorate([
    graphql_1.Resolver(() => recipe_model_1.Recipe),
    __metadata("design:paramtypes", [recipe_service_1.RecipesService])
], RecipesResolver);
exports.RecipesResolver = RecipesResolver;
//# sourceMappingURL=recipe.resolver.js.map