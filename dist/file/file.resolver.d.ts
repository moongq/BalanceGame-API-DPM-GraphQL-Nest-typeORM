import { FileUpload } from "graphql-upload";
import { FileService } from "./file.service";
import { CreateFileInput } from "./dto/create-file.input";
import { UpdateFileInput } from "./dto/update-file.input";
export declare class FileResolver {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file1: FileUpload): Promise<unknown>;
    createFile(createFileInput: CreateFileInput): string;
    findAll(): string;
    findOne(id: number): string;
    updateFile(updateFileInput: UpdateFileInput): string;
    removeFile(id: number): string;
}
