"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
let FileService = class FileService {
    async uploadFile(file1) {
        const { filename, mimetype, encoding, createReadStream } = file1;
        console.log("attachment:", filename, mimetype, encoding);
        return new Promise(async (resolve, reject) => createReadStream()
            .pipe(fs_1.createWriteStream(`./uploads/${filename}`))
            .on("finish", () => resolve(true))
            .on("error", () => reject(false)));
    }
    create(createFileInput) {
        return "This action adds a new file";
    }
    findAll() {
        return `This action returns all file`;
    }
    findOne(id) {
        return `This action returns a #${id} file`;
    }
    update(id, updateFileInput) {
        return `This action updates a #${id} file`;
    }
    remove(id) {
        return `This action removes a #${id} file`;
    }
    async uploadFileToS3(filename) {
        const stream = fs_1.createReadStream(filename);
        stream.on("error", function (error) {
            return error;
        });
        const params = {
            Bucket: `${process.env.BUCKET}`,
            Key: `/00_graphql_test`,
            Body: stream,
            ContentType: "image/jpeg",
            ACL: "public-read",
        };
    }
};
FileService = __decorate([
    common_1.Injectable()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map