import { Component, input, output } from '@angular/core';
import { Lunch, Menu, Snack } from 'src/app/models/menu';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
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
  public snacks = input.required<Snack[]>();
  public lunches = input.required<Lunch[]>();
  public changedMenu = output<Menu>();

  constructor(
    private menuService: MenuService,
  ) { }
  
  public changeMeal(menu: Menu, type: 'snack' | 'lunch', id: string) {
    const newMenu: Menu = menu;

    if (type === 'snack') {
      newMenu.idSnack = id;
    } else {
      newMenu.idLunch = id;
    }

    this.menuService.changeMenu(newMenu);
  }

  public changeMenu(menu: Menu) {
    this.changedMenu.emit(menu);
  }

  public openNutritionalInfoDialog(menu: Menu) {
    // const dialogRef = this.dialog.open(NutritionalInfoDialogComponent, {
    //   data: menu,
    // });
  }
}
