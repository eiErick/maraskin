import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonHeader, IonButtons, IonButton, IonToolbar, IonTitle, IonInput, ModalController, IonToggle, Platform } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
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
export class MealFormModalComponent implements OnInit, OnDestroy {
  @Input() meal!: Meal;

  private backButtonSubscription: Subscription;
  public mealSel: Meal = { calories: 0, carbohydrates: 0, glucose: 0, id: '', lactose: false, name: '', objectId: '', assessment: 0 };

  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
  ) {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10000, async () => {
      const modal = await this.modalCtrl.getTop();
      if (modal) this.cancelModal();
    });
  }
  
  ngOnInit() {
    if (this.meal) this.mealSel = this.meal;
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  public confirmModal() {
    this.modalCtrl.dismiss(this.mealSel);
  }

  public cancelModal() {
    this.modalCtrl.dismiss();
  }
}
