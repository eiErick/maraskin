import { Component, computed, } from '@angular/core';
import { IonContent, IonButton, IonList, IonItem, ModalController } from '@ionic/angular/standalone';
import { Meal } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { AlertController } from '@ionic/angular';
import { HeaderComponent } from "../../components/header/header.component";
import { MealFormModalComponent } from 'src/app/components/meal-form-modal/meal-form-modal.component';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss'],
  imports: [
    IonContent,
    IonButton,
    IonList,
    IonItem,
    HeaderComponent
  ],
})
export class SnackComponent {
  public snacks = computed(() => this.menuService.snacks());
  public loadMenu = computed(() => this.menuService.load());
  public deletedSnackId: string = '';

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Deletar',
      role: 'confirm',
    },
  ];

  constructor (
    private menuService: MenuService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  public async openEditSnack(snack: Meal) {
    const modal = await this.modalController.create({
      component: MealFormModalComponent,
      componentProps: {
        meal: snack,
      },
    });

    modal.onDidDismiss().then((data) => this.menuService.updateMeal(data.data));
    await modal.present();
  }

  public async openCreateSnack() {
    const modal = await this.modalController.create({
      component: MealFormModalComponent
    });

    modal.onDidDismiss().then((data) => this.menuService.addMeal(data.data, 'snack'));
    await modal.present();
  }

  async presentDeleteConfirm(snack: Meal) {
    const alert = await this.alertController.create({
      header: 'Confirmar Deleção',
      message: `Tem certeza de que deseja deletar "${snack.name}?"`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Ação de deleção cancelada.');
          },
        },
        {
          text: 'Deletar',
          handler: () => {
            this.deleteSnack(snack);
          },
        },
      ],
    });
  
    await alert.present();
  }

  private deleteSnack(snack: Meal) {
    this.menuService.deleteMeal(snack);
  }
}
