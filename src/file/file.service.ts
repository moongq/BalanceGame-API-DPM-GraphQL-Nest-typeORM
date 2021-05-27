import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createWriteStream, createReadStream } from "fs";
import AWS from "aws-sdk";
// import fs from "fs";

import { CreateFileInput } from "./dto/create-file.input";
import { UpdateFileInput } from "./dto/update-file.input";
import { FileUpload } from "graphql-upload";

@Injectable()
export class FileService {
  async uploadFile(file1) {
    const { filename, mimetype, encoding, createReadStream } = file1;
    console.log("attachment:", filename, mimetype, encoding);

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );
    // return saveds3 path
  }

  create(createFileInput: CreateFileInput) {
    return "This action adds a new file";
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileInput: UpdateFileInput) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }

  // async uploadFileToS3(file: any) {
  async uploadFileToS3(filename: string) {
    // 1. 파일 읽어오기
    const stream = createReadStream(filename);
    stream.on("error", function (error) {
      return error;
    });

    const params = {
      Bucket: `${process.env.BUCKET}`,
      Key: `/00_graphql_test`,
      Body: stream,
      ContentType: "image/jpeg", // updated
      ACL: "public-read",
    };

    // this.s3.upload(
    //   {
    //     Bucket: `${process.env.BUCKET}`,
    //     Body: stream,
    //     Key: `/00_graphql_test`,
    //   },
    //   function (error: Error, uploadedData) {
    //     if (error) {
    //       console.log(error);
    //       throw new HttpException("something wrong file upload", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }

    //     console.log(uploadedData);
    //   }
    // );

    // 2. S3 param 설정

    // 3. 업로드
  }
}
