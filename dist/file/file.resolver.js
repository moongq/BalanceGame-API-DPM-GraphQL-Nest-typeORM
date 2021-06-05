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
exports.FileResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_upload_1 = require("graphql-upload");
const file_model_1 = require("./file.model");
const file_service_1 = require("./file.service");
const create_file_input_1 = require("./dto/create-file.input");
const update_file_input_1 = require("./dto/update-file.input");
let FileResolver = class FileResolver {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadFile(file1) {
        const result = await this.fileService.uploadFile(file1);
        return result;
    }
    createFile(createFileInput) {
        return this.fileService.create(createFileInput);
    }
    findAll() {
        return this.fileService.findAll();
    }
    findOne(id) {
        return this.fileService.findOne(id);
    }
    updateFile(updateFileInput) {
        return this.fileService.update(updateFileInput.id, updateFileInput);
    }
    removeFile(id) {
        return this.fileService.remove(id);
    }
};
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args({ name: "file1", type: () => graphql_upload_1.GraphQLUpload })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "uploadFile", null);
__decorate([
    graphql_1.Mutation(() => file_model_1.File),
    __param(0, graphql_1.Args("createFileInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_input_1.CreateFileInput]),
    __metadata("design:returntype", void 0)
], FileResolver.prototype, "createFile", null);
__decorate([
    graphql_1.Query(() => [file_model_1.File], { name: "file" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FileResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => file_model_1.File, { name: "file" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FileResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => file_model_1.File),
    __param(0, graphql_1.Args("updateFileInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_file_input_1.UpdateFileInput]),
    __metadata("design:returntype", void 0)
], FileResolver.prototype, "updateFile", null);
__decorate([
    graphql_1.Mutation(() => file_model_1.File),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FileResolver.prototype, "removeFile", null);
FileResolver = __decorate([
    graphql_1.Resolver(() => file_model_1.File),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileResolver);
exports.FileResolver = FileResolver;
//# sourceMappingURL=file.resolver.js.map