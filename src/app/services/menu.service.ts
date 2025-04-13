import { Injectable, signal } from '@angular/core';
import { Meal, Menu, MenuDatabase } from '../models/menu';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import Backendless from 'backendless';
import { Auth } from '../models/auth';

const authSaved = localStorage.getItem('auth');

if (authSaved) {
  const authJSON = JSON.parse(authSaved) as Auth;

  const APP_ID = authJSON.appid;
  const API_KEY = authJSON.appkey;

  Backendless.initApp(APP_ID, API_KEY);
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menu = signal<Menu[]>([]);
  public lunches = signal<Meal[]>([]);
  public snacks = signal<Meal[]>([]);
  public loadMenu = signal<boolean>(false);
  public loadDatabase = signal<boolean>(false);

  private NAME_SERVE_MENU = 'menu';
  private NAME_SERVE_MENU_DATABASE = 'menu-database';
  
  constructor(
    private toastController: ToastController
  ) {
    this.getServeMenu();
    this.getServeMenuDatabase();
  }

  public reload() {
    this.getServeMenu();
    this.getServeMenuDatabase();
  }

  private getServeMenu() {    
    this.loadMenu.set(true);
    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU).find().then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: (res) => {
        const menu = res as Menu[];        
        this.menu.set(menu);
        this.validateMenu();
      },
      error: () => this.loadMenu.set(false),
      complete: () => this.loadMenu.set(false),
    });
  }

  private getServeMenuDatabase() {
    this.loadDatabase.set(true);
    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU_DATABASE).find().then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: (res) => {
        const database = res as MenuDatabase[];

        let snacks: Meal[] = [];
        let lunches: Meal[] = [];
        
        database.forEach((data) => {
          data.type === 'snack' ? snacks.push({ calories: data.calories, carbohydrates: data.carbohydrates, glucose: data.glucose, id: data.id, objectId: data.objectId, lactose: data.lactose, name: data.name }) : lunches.push({ calories: data.calories, carbohydrates: data.carbohydrates, glucose: data.glucose, id: data.id, objectId: data.objectId, lactose: data.lactose, name: data.name });
        });

        this.snacks.set(snacks);
        this.lunches.set(lunches);
      },
      error: () => {
        this.presentToast('Erro ao carregar cardápio :/', 'danger');
        this.loadDatabase.set(false);
      },
      complete: () => this.loadDatabase.set(false),
    });
  }

  public changeMenu(menu: Menu) {
    const idMenu = (menu as any).objectId;

    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU).save({ ...menu, objectId: idMenu }).then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: () => {
        this.menu.update(menus => menus.map(m => m.id === menu.id ? { ...menu } : m));
      }
    });
  }

  public updateMeal(meal: Meal) {
    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU_DATABASE).save({ ...meal, objectId: meal.objectId }).then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: () => {
        this.lunches.update(lunches => lunches.map(l => l.id === meal.id ? { ...meal } : l));
        this.snacks.update(snacks => snacks.map(s => s.id === meal.id ? { ...meal } : s));
        this.presentToast('Refeição atualizada com sucesso!', 'success');
      },
      error: () => {
        this.presentToast('Erro ao atualizar a refeição!', 'danger');
      }
    });
  }

  private addDataDatabaseServer(newMenuDatabase: MenuDatabase) {
    const { objectId, ...dataToSave } = newMenuDatabase;

    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU_DATABASE).save(dataToSave).then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: (res) => {
        const data = res as MenuDatabase;
        
        const meal: Meal = { calories: data.calories, carbohydrates: data.carbohydrates, glucose: data.glucose, id: data.id, lactose: data.lactose, name: data.name, objectId: data.objectId };
        
        data.type === 'lunch' ? this.lunches.update(lunches => [ ...lunches, meal ]) : this.snacks.update(snacks => [ ...snacks, meal ]);
        this.presentToast('Item adicionado com sucesso!', 'success');
      },
      error: () => {
        this.presentToast('Erro ao adicionar item :/', 'danger');
      }
    });
  }

  private createServerTables() {    
    const tables: Menu[] = [
      { day: 'segunda', id: 'mon', idLunch: 'empty', idSnack: 'empty' },
      { day: 'terça', id: 'tue', idLunch: 'empty', idSnack: 'empty' },
      { day: 'quarta', id: 'wed', idLunch: 'empty', idSnack: 'empty' },
      { day: 'quinta', id: 'thu', idLunch: 'empty', idSnack: 'empty' },
      { day: 'sexta', id: 'fri', idLunch: 'empty', idSnack: 'empty' },
    ];

    tables.forEach((table) => {      
      new Observable(observer => {
        Backendless.Data.of(this.NAME_SERVE_MENU).save(table).then(result => {
            observer.next(result);
            observer.complete();
          }).catch(error => observer.error(error));
      }).subscribe({
        next: (res) => {
          const menu = res as Menu[];
          this.menu.set(menu);
        }
      });
    });
  }

  public deleteMeal(meal: Meal) {
    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU_DATABASE).remove({ objectId: meal.objectId }).then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: () => {
        this.snacks.update(snacks => snacks.filter(s => s.id !== meal.id));
        this.lunches.update(lunches => lunches.filter(l => l.id !== meal.id));
        this.presentToast(`Sucesso ao deletar ${meal.name}`, 'success');
      },
      error: () => {
        this.presentToast(`Erro ao deletar ${meal.name} :/`, 'danger');
      }
    });
  }

  public validateMenu() {
    const zero = this.menu().length === 0;

    if (zero) {
      this.createServerTables();
    }
  }

  public getMealId(id: string): Meal | undefined {
    return this.snacks().find((s) => s.id === id) || this.lunches().find((l) => l.id === id);
  }

  public addMeal(meal: Meal, type: 'snack' | 'lunch') {    
    const mealFound = this.snacks().find((s) => s.name.toLowerCase() === meal.name.toLowerCase()) || this.lunches().find((l) => l.name.toLowerCase() === meal.name.toLowerCase());
    
    if (mealFound) {
      this.presentToast('Este refeição já existe!', 'warning');
    } else {
      meal.id = this.makeID();

      const menuDatabase: MenuDatabase = { calories: meal.calories, carbohydrates: meal.carbohydrates, glucose: meal.glucose, id: meal.id, objectId: meal.objectId, lactose: meal.lactose, name: meal.name, type: type };

      this.addDataDatabaseServer(menuDatabase);
    }
  }

  private async presentToast(text: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'bottom',
      color: color,
      buttons: [{ text: 'Fechar', role: 'cancel' }],
    });
  
    await toast.present();
  }

  private makeID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}
