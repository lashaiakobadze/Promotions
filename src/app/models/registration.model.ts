import { Gender } from './gender.enum';

export class Registration {
  constructor(
    public userId: number,
    public firstName: string,
    public lastName: string,
    public gender: Gender,
    public personalNumber: number,
    public phone: string,
    public address: string,
    public country: string,
    public city: string,
    public email: string,
    public imageUrl?: string,
    public files?: File[]
  ) {}
}
