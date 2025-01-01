import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKey = 'userContent';
  private expiryKey = 'expiryTime';
  private sessionDuration = 3600000; // 1 minute in milliseconds

  // Set content and expiry time in both storages
  setContent(content: any) {
    if (typeof window !== 'undefined') {
      // Store in localStorage for persistent data
      localStorage.setItem(this.storageKey, JSON.stringify(content));
      const expiryTime = Date.now() + this.sessionDuration; // Set expiry time
      localStorage.setItem(this.expiryKey, expiryTime.toString());

      // Also store in sessionStorage for current tab data
      sessionStorage.setItem(this.storageKey, JSON.stringify(content));
      sessionStorage.setItem(this.expiryKey, expiryTime.toString());
    }
  }

  // Get content and check if session is valid
  getContent() {
    if (typeof window !== 'undefined') {
      const content = sessionStorage.getItem(this.storageKey);
      const expiryTime = sessionStorage.getItem(this.expiryKey);
      
      // Check if session is still valid
      if (content && expiryTime && Date.now() < parseInt(expiryTime, 10)) {
        return JSON.parse(content);
      } else {
        // If session has expired, fallback to localStorage
        const localContent = localStorage.getItem(this.storageKey);
        const localExpiryTime = localStorage.getItem(this.expiryKey);
        if (localContent && localExpiryTime && Date.now() < parseInt(localExpiryTime, 10)) {
          return JSON.parse(localContent);
        } else {
          this.clearContent(); // Clear expired session
        }
      }
    }
    return null;
  }

  // Clear content from both storages
  clearContent() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.expiryKey);
      sessionStorage.removeItem(this.storageKey);
      sessionStorage.removeItem(this.expiryKey);
    }
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const content = this.getContent();
    return content !== null; // Return true if user content exists
  }
}
