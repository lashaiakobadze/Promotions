import { Currency } from './currency.enum';
import { PromoType } from './promoType.enum';

export class Promotion {
  constructor(
    public promoId: number,
    public consumerId: string,
    public promoType: PromoType,
    public promoCount: number,
    public currency?: Currency,
    public basicPromo?: boolean
  ) {}
}
