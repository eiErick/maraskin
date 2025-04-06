import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class EncryptedstorageService {
  private secretKey: string = '';

  public setEncryptionKey(password: string) {
    this.secretKey = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
  }

  private encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  private decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public save(key: string, value: any) {
    const encryptedValue = this.encrypt(JSON.stringify(value));
    localStorage.setItem(key, encryptedValue);
  }

  public get(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {      
      const decryptedValue = this.decrypt(encryptedValue);
      return JSON.parse(decryptedValue);
    }

    return null;
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public validPassword(password: string): boolean {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64) === this.secretKey;
  }
}