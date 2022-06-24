import { Currency } from './currency.enum';
import { PromoType } from './promoType.enum';

export class Promotion {
  constructor(
    public promoId: number,
    public consumerId: number,
    public promoType: PromoType,
    public promoCount: number,
    public currency?: Currency
  ) {}
}
