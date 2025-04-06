import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonModal, MenuController, IonList, IonItem, IonInput, IonToggle } from '@ionic/angular/standalone';
import { Lunch } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { addIcons } from 'ionicons';
import { add, checkmark, close } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { HeaderComponent } from "../../components/header/header.component";

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
export class LunchComponent {
  public lunches = computed(() => this.menuService.lunches());
  public loadMenu = computed(() => this.menuService.load());
  public selLunch: Lunch;
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

  presentingElement!: HTMLElement | null;

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  constructor (
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
      lactose: false,
      name: ''
    }
  }

  public setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public openMenu() {
    this.menuCtrl.open('side');
  }

  public openEditLunch(lunch: Lunch) {
    this.selLunch = lunch;
    this.setOpen(true);
  }

  public openCreateLunch() {
    this.clearSelectedLunch();
    this.setOpen(true);
  }

  public confirmModal() {
    if (this.selLunch.id.length === 0) {
      this.menuService.addLunch(this.selLunch);
    } else {
      this.menuService.updateLunch(this.selLunch);
    }

    this.closeModal();
  }

  public cancelModal() {
    this.clearSelectedLunch();
    this.closeModal();
  }

  public closeModal() {
    this.isModalOpen = false;
  }

  async presentDeleteConfirm(lunch: Lunch) {
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

  private deleteLunch(lunch: Lunch) {
    this.menuService.deleteLunch(lunch);
  }
  
  public clearSelectedLunch() {
    this.setOpen(false);
    this.selLunch = { calories: 0, carbohydrates: 0, glucose: 0, id: '', lactose: false, name: '' };
  }
}
