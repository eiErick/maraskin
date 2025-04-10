import { Component, computed, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonModal, MenuController, IonList, IonItem, IonInput, IonToggle, Platform } from '@ionic/angular/standalone';
import { Meal } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { addIcons } from 'ionicons';
import { add, checkmark, close } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { HeaderComponent } from "../../components/header/header.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    IonButtons,
    IonButton,
    IonIcon,
    IonModal,
    IonList,
    IonItem,
    IonInput,
    IonToggle,
    HeaderComponent
  ],
})
export class LunchComponent implements OnDestroy {
  public lunches = computed(() => this.menuService.lunches());
  public loadMenu = computed(() => this.menuService.load());
  private backButtonSubscription: Subscription;
  public selLunch: Meal;
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

  isModalOpen = false;

  constructor (
    private platform: Platform,
    private menuService: MenuService,
    private menuCtrl: MenuController,
    private alertController: AlertController
  ) {
    addIcons({ add, checkmark, close });

    this.selLunch = {
      calories: 0,
      carbohydrates: 0,
      glucose: 0,
      id: '',
      objectId: '',
      lactose: false,
      name: ''
    }

    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10000, async () => {      
      if (this.isModalOpen) {
        this.closeModal();
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe()
  }

  public setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public openMenu() {
    this.menuCtrl.open('side');
  }

  public openEditLunch(lunch: Meal) {
    this.selLunch = lunch;
    this.setOpen(true);
  }

  public openCreateLunch() {
    this.clearSelectedLunch();
    this.setOpen(true);
  }

  public confirmModal() {
    this.selLunch.id.length === 0 ? this.menuService.addMeal(this.selLunch, 'lunch') : this.menuService.updateMeal(this.selLunch);
    this.closeModal();
  }

  public cancelModal() {
    this.clearSelectedLunch();
    this.closeModal();
  }

  public closeModal() {
    this.isModalOpen = false;
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
  
  public clearSelectedLunch() {
    this.setOpen(false);
    this.selLunch = { calories: 0, carbohydrates: 0, glucose: 0, id: '', objectId: '', lactose: false, name: '' };
  }
}
