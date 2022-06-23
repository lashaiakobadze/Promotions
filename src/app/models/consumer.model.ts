import { Gender } from './gender.enum';

export class Consumer {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public gender: Gender,
    public personalNumber: number,
    public phone: number,
    public address: string,
    public country: string,
    public city: string,
    public email: string,
    public image?: File,
    public imagePath?: string,
    public creator?: string
  ) {}
}
