import { Component, computed } from '@angular/core';
import { IonContent, IonButton, MenuController, IonList, IonItem, ModalController } from '@ionic/angular/standalone';
import { Meal } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { AlertController } from '@ionic/angular';
import { HeaderComponent } from "../../components/header/header.component";
import { MealFormModalComponent } from 'src/app/components/meal-form-modal/meal-form-modal.component';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.scss'],
  imports: [
    IonContent,
    IonButton,
    IonList,
    IonItem,
    HeaderComponent,
  ],
})
export class LunchComponent {
  public lunches = computed(() => this.menuService.lunches());
  public loadMenu = computed(() => this.menuService.load());
  public deletedLunchId: string = '';

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
    private alertController: AlertController,
    private modalController: ModalController,
  ) {}

  public async openEditLunch(lunch: Meal) {
    const modal = await this.modalController.create({
      component: MealFormModalComponent,
      componentProps: {
        meal: lunch,
      },
    });

    modal.onDidDismiss().then((data) => this.menuService.updateMeal(data.data));
    await modal.present();
  }

  public async openCreateLunch() {
    const modal = await this.modalController.create({
      component: MealFormModalComponent
    });

    modal.onDidDismiss().then((data) => this.menuService.addMeal(data.data, 'lunch'));
    await modal.present();
  }

  async presentDeleteConfirm(lunch: Meal) {
    const alert = await this.alertController.create({
      header: 'Confirmar Deleção',
      message: `Tem certeza de que deseja deletar "${lunch.name}?"`,
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
            this.deleteLunch(lunch);
          },
        },
      ],
    });
  
    await alert.present();
  }

  private deleteLunch(lunch: Meal) {
    this.menuService.deleteMeal(lunch);
  }
}
