import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';

@Injectable()
export class FileService {

  async uploadFile(file1) {
        const { filename, mimetype, encoding, createReadStream} = file1;
        console.log('attachment:', filename, mimetype, encoding);

        return new Promise(async (resolve, reject) => 
          createReadStream()
              .pipe(createWriteStream(`./uploads/${filename}`))
              .on('finish', () => resolve(true))
              .on('error', () => reject(false))
      );
      // return saveds3 path
  }


  create(createFileInput: CreateFileInput) {
    return 'This action adds a new file';
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
}
