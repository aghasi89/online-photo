import { ImageSourcePropType } from 'react-native';
import I18n from '../../../../I18n/I18n';

export class Product {

  constructor(readonly id: number,
              public size: any,
              public price: number,
			  public amount: number,
			   public images:any[]) {
  }

  get formattedPrice(): string {
    return `${this.price} ${I18n.t('amd')}`;
  }


  get totalPrice(): number {
    return this.price * this.amount*this.images.length;
  }

}
