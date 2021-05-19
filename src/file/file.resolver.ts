import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";

import { File } from "./file.model";
import { FileService } from "./file.service";

import { CreateFileInput } from "./dto/create-file.input";
import { UpdateFileInput } from "./dto/update-file.input";

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  // @Mutation(() => Boolean)
  // async uploadFile(@Args({name: 'file1', type: () => GraphQLUpload})
  //     file1: FileUpload,
  //     ) {
  //       const { filename, mimetype, encoding, createReadStream} = file1;
  //       console.log('attachment:', filename, mimetype, encoding);

  //       return new Promise(async (resolve, reject) =>
  //         createReadStream()
  //             .pipe(createWriteStream(`./uploads/${filename}`))
  //             .on('finish', () => resolve(true))
  //             .on('error', () => reject(false))
  //     );
  // }

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: "file1", type: () => GraphQLUpload })
    file1: FileUpload
  ) {
    const result = await this.fileService.uploadFile(file1);
    return result;
  }

  @Mutation(() => File)
  createFile(@Args("createFileInput") createFileInput: CreateFileInput) {
    return this.fileService.create(createFileInput);
  }

  @Query(() => [File], { name: "file" })
  findAll() {
    return this.fileService.findAll();
  }

  @Query(() => File, { name: "file" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.fileService.findOne(id);
  }

  @Mutation(() => File)
  updateFile(@Args("updateFileInput") updateFileInput: UpdateFileInput) {
    return this.fileService.update(updateFileInput.id, updateFileInput);
  }

  @Mutation(() => File)
  removeFile(@Args("id", { type: () => Int }) id: number) {
    return this.fileService.remove(id);
  }
}
