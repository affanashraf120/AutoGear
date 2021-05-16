// application
import { IAddress } from '~/interfaces/address';
import { makeIdGenerator } from '~/fake-server/utils';

export const getNextAddressId = makeIdGenerator();

export const addresses: IAddress[] = [
    {
        id: getNextAddressId(),
        firstName: 'Affan',
        lastName: 'Ashraf',
        company: '',
        country: 'Pakistan',
        address1: 'Central park, lahore',
        address2: '',
        city: 'Lahore',
        state: 'Punjab',
        postcode: '115302',
        email: 'affan@gmail.com',
        phone: '+923213782654',
        default: true,
    },
    {
        id: getNextAddressId(),
        firstName: 'Talha',
        lastName: 'Ashraf',
        company: '',
        country: 'Pakistan',
        address1: 'Central park, lahore',
        address2: '',
        city: 'Lahore',
        state: 'Punjab',
        postcode: '115302',
        email: 'affan@example.com',
        phone: '+923213782654',
        default: true,
    },
];
