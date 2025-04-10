import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonHeader, IonButtons, IonButton, IonToolbar, IonTitle, IonInput, ModalController, IonToggle } from '@ionic/angular/standalone';
import { Meal } from 'src/app/models/menu';

@Component({
  selector: 'app-meal-form-modal',
  templateUrl: './meal-form-modal.component.html',
  styleUrls: ['./meal-form-modal.component.scss'],
  imports: [
    IonContent,
    IonItem,
    IonHeader,
    IonButtons,
    IonButton,
    IonToolbar,
    IonTitle,
    IonInput,
    FormsModule,
    IonToggle
  ]
})
export class MealFormModalComponent  implements OnInit {
  @Input() meal!: Meal;
  public mealSel: Meal = { calories: 0, carbohydrates: 0, glucose: 0, id: '', lactose: false, name: '', objectId: '' };

  constructor(
    private modalCtrl: ModalController
  ) {}
  
  ngOnInit() {
    if (this.meal) {
      this.mealSel = this.meal;
    }
  }

  public confirmModal() {
    this.modalCtrl.dismiss(this.mealSel);
  }

  public cancelModal() {
    this.modalCtrl.dismiss();
  }

  public changeLactose(event: any) {
    console.log(event);
    
  }
}
