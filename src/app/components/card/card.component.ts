import { Component, input, output } from '@angular/core';
import { Meal, Menu } from 'src/app/models/menu';
import { IonSelect, IonSelectOption, ModalController } from '@ionic/angular/standalone';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { NutritionalInformationModalComponent } from '../nutritional-information-modal/nutritional-information-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    UpperCasePipe,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class CardComponent {
  public menu = input.required<Menu>();
  public snacks = input.required<Meal[]>();
  public lunches = input.required<Meal[]>();
  public changedMenu = output<Menu>();

  constructor(
    private menuService: MenuService,
    private modalController: ModalController
  ) { }

  public changeMenu(menu: Menu) {
    this.changedMenu.emit(menu);
  }

  public async openNutritionalInfoDialog(menu: Menu) {
    const snack = this.menuService.getMealId(menu.idSnack);
    const lunch = this.menuService.getMealId(menu.idLunch);

    this.modalController.create({
      component: NutritionalInformationModalComponent,
      componentProps: {
        snack: snack,
        lunch: lunch,
      }
    }).then((m) => m.present());
  }
}
