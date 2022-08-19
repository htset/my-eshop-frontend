import { BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user';

let testUser:User = 
{
    id: 1,
    username: 'htset',
    password: '',
    firstName: 'Haris',
    lastName: 'Tse',
    token: '',
    role: 'admin',
    email: 'haris@tse.gr'
};

export class AuthenticationServiceStub {

    public get currentUserValue(): User {
        let currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(testUser);
        return currentUserSubject.value;
    }

}