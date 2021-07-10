import { FakeAccountApi } from './endpoints/account.api';
import { FakeBlogApi } from './endpoints/fake-blog.api';
import { FakeCountriesApi } from './endpoints/fake-countries.api';
import { FakeShopApi } from './endpoints/fake-shop.api';
import { FakeVehicleApi } from './endpoints/fake-vehicle.api';

export const accountApi = new FakeAccountApi();
export const blogApi = new FakeBlogApi();
export const countriesApi = new FakeCountriesApi();
export const shopApi = new FakeShopApi();
export const vehicleApi = new FakeVehicleApi();
