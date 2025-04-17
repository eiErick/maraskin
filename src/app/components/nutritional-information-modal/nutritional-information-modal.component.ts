import { Component, Input, OnInit } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular/standalone';
import { Meal } from 'src/app/models/menu';

@Component({
  selector: 'app-nutritional-information-modal',
  templateUrl: './nutritional-information-modal.component.html',
  styleUrls: ['./nutritional-information-modal.component.scss'],
  imports: [
    IonContent,
  ]
})
export class NutritionalInformationModalComponent  implements OnInit {
  @Input() snack: Meal = { calories: 0, carbohydrates: 0, glucose: 0, id: '', lactose: false, name: '', objectId: '', assessment: 0 }
  @Input() lunch: Meal = { calories: 0, carbohydrates: 0, glucose: 0, id: '', lactose: false, name: '', objectId: '', assessment: 0 }

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  public cancelModal() {
    this.modalController.dismiss();
  }
}
