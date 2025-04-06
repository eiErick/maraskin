import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Lunch, Menu, Snack } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { CardComponent } from "../../components/card/card.component";
import { SettingsService } from 'src/app/services/settings.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    FormsModule,
    CardComponent,
    HeaderComponent
  ],
})
export class HomePage {
  public userName = computed(() => this.settingService.auth().name);
  public menus = computed(() => this.menuService.menu());
  public snacks = computed(() => this.menuService.snacks());
  public lunches = computed(() => this.menuService.lunches());
  public loadMenu = computed(() => this.menuService.load());

  public select: 'menu' | 'database' = 'menu';
  public databaseType: 'snack' | 'lunch' = 'snack';

  constructor (
    private menuService: MenuService,
    private settingService: SettingsService,
  ) {}

  public openDialogCreateMeal() {
    // const mealDialogOpen: MealDialogOpen = { 
    //   snack: { name: '', calories: 0, gluten: false, lactose: false, id: '' },
    //   lunch: { name: '', calories: 0, gluten: false, id: '' },
    // };

    // const dialogRef = this.dialog.open(DialogCreateMealComponent, {
    //   data: mealDialogOpen,
    // });

    // dialogRef.afterClosed().subscribe({
    //   next: (res) => {        
    //     if (res.type === 'snack') {
    //       this.menuService.addSnack(res.meal);
    //     } else {
    //       this.menuService.addLunch(res.meal);
    //     }
    //   }
    // });
  }

  public openNutritionalInfoDialog(menu: Menu) {
    // const dialogRef = this.dialog.open(NutritionalInfoDialogComponent, {
    //   data: menu,
    // });
  }

  public editSnack(snack: Snack) {
    // const mealDialogOpen: MealDialogOpen = { snack: { ...snack }, lunch: { name: '', calories: 0, gluten: false, id: '' }};

    // const dialogRef = this.dialog.open(DialogCreateMealComponent, {
    //   data: mealDialogOpen,
    // });

    // dialogRef.afterClosed().subscribe({
    //   next: (res) => {
    //     this.menuService.updateSnacks(res.meal);
    //   }
    // });
  }

  public editLunch(lunch: Lunch) {
    // const mealDialogOpen: MealDialogOpen = { lunch: { ...lunch }, snack: { name: '', calories: 0, gluten: false, lactose: false, id: '' }};

    // const dialogRef = this.dialog.open(DialogCreateMealComponent, {
    //   data: mealDialogOpen,
    // });

    // dialogRef.afterClosed().subscribe({
    //   next: (res) => {        
    //     this.menuService.updateLunch(res.meal);
    //   }
    // });
  }

  public deleteSnack(snack: Snack) {
    // const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, {
    //   data: snack.name,
    // });
    
    // dialogRef.afterClosed().subscribe({
    //   next: (res) => {
    //     if (res === true) {
    //       this.menuService.deleteSnack(snack);
    //     }
    //   }
    // });
  }

  public deleteLunch(lunch: Lunch) {
    // const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, {
    //   data: lunch.name,
    // });
    
    // dialogRef.afterClosed().subscribe({
    //   next: (res) => {
    //     if (res === true) {
    //       this.menuService.deleteLuch(lunch);
    //     }
    //   }
    // });
  }
}
