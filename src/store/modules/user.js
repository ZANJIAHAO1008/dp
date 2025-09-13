import { Module, getModule } from 'vuex-module-decorators';
import { User as UserBase } from '@co/store-user';
import store from '..';

@Module({ dynamic: true, store, name: 'user' })
class User extends UserBase {}

export const UserModule = getModule(User);
