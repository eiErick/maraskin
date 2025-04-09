import { Component, computed, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonModal, MenuController, IonList, IonItem, IonInput, IonToggle, Platform, ModalController } from '@ionic/angular/standalone';
import { Snack } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { addIcons } from 'ionicons';
import { add, checkmark, close } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { HeaderComponent } from "../../components/header/header.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss'],
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
export class SnackComponent implements OnDestroy {
  public snacks = computed(() => this.menuService.snacks());
  public loadMenu = computed(() => this.menuService.load());
  private backButtonSubscription: Subscription;
  public selSnack: Snack;
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

  isModalOpen = false;

  constructor (
    private platform: Platform,
    private menuService: MenuService,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {
    addIcons({ add, checkmark, close });

    this.selSnack = {
      calories: 0,
      carbohydrates: 0,
      glucose: 0,
      id: '',
      objectId: '',
      lactose: false,
      name: ''
    }

    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10000, async () => {
      const modal = await this.modalCtrl.getTop();
      if (modal) {
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

  public openEditSnack(snack: Snack) {
    this.selSnack = snack;
    this.setOpen(true);
  }

  public openCreateSnack() {
    this.clearSelectedSnack();
    this.setOpen(true);
  }

  public confirmModal() {
    if (this.selSnack.id.length === 0) {
      this.menuService.addLunch(this.selSnack);
    } else {
      this.menuService.updateLunch(this.selSnack);
    }

    this.closeModal();
  }

  public cancelModal() {
    this.clearSelectedSnack();
    this.closeModal();
  }

  public closeModal() {
    this.isModalOpen = false;
  }

  async presentDeleteConfirm(snack: Snack) {
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

  private deleteSnack(snack: Snack) {
    this.menuService.deleteSnack(snack);
  }
  
  public clearSelectedSnack() {
    this.setOpen(false);
    this.selSnack = { calories: 0, carbohydrates: 0, glucose: 0, id: '', objectId: '', lactose: false, name: '' };
  }
}
