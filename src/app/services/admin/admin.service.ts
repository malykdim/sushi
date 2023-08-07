import { Injectable } from '@angular/core';

import { User } from '../auth/user.model';

@Injectable({ providedIn: 'root' })
export class AdminService {

  roles = ['guest', 'client', 'chef', 'admin'];

  constructor() { }

  getRole(userId: string) {}

  setRole(userId: string, role: string) {

  }
}
