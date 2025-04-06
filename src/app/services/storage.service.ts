import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public save(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    const saved = localStorage.getItem(key);

    if (saved) return JSON.parse(saved);
        
    return null;
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public removeAll() {
    this.remove('auth');
    this.remove('menu');
    this.remove('lunches');
    this.remove('snacks');
  }
}
