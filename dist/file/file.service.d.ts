import { CreateFileInput } from "./dto/create-file.input";
import { UpdateFileInput } from "./dto/update-file.input";
export declare class FileService {
    uploadFile(file1: any): Promise<unknown>;
    create(createFileInput: CreateFileInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFileInput: UpdateFileInput): string;
    remove(id: number): string;
    uploadFileToS3(filename: string): Promise<void>;
}
