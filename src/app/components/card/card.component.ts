import { Component, input, output } from '@angular/core';
import { Meal, Menu } from 'src/app/models/menu';
import { IonSelect, IonSelectOption, AlertController } from '@ionic/angular/standalone';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';

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
    private alertController: AlertController
  ) { }

  public changeMenu(menu: Menu) {
    this.changedMenu.emit(menu);
  }

  public async openNutritionalInfoDialog(menu: Menu) {
    const snack = this.menuService.getMealId(menu.idSnack);
    const lunch = this.menuService.getMealId(menu.idLunch);

    const alert = await this.alertController.create({
      header: 'Informações nutricionais',
      message: `
        Nome: ${ snack?.name }
        Calorias: ${ snack?.calories }
        Carboidratos: ${ snack?.carbohydrates }
        Contém Lactose: ${ snack?.lactose }
        Glicose: ${ snack?.glucose }
      `,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
