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
exports.UserProfile = void 0;
const eager_import_0 = require("../user/user.model");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_model_1 = require("../user/user.model");
let UserProfile = class UserProfile {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: false, type: () => String }, email: { nullable: false, type: () => String }, nickname: { nullable: false, type: () => String }, userImage: { nullable: false, type: () => String }, level: { nullable: false, type: () => String }, createdAt: { nullable: false, type: () => String }, updatedAt: { nullable: false, type: () => Date }, user: { nullable: false, type: () => require("../user/user.model").User } };
    }
};
__decorate([
    graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], UserProfile.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserProfile.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserProfile.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserProfile.prototype, "userImage", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", String)
], UserProfile.prototype, "level", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    graphql_1.Field(() => Date),
    __metadata("design:type", String)
], UserProfile.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: "timestamp" }),
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], UserProfile.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_model_1.User, (user) => user.profile),
    __metadata("design:type", user_model_1.User)
], UserProfile.prototype, "user", void 0);
UserProfile = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], UserProfile);
exports.UserProfile = UserProfile;
//# sourceMappingURL=user-profile.model.js.map