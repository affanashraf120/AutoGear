/* eslint-disable import/prefer-default-export */

// application
import { IPost } from '~/interfaces/post';

export const posts: IPost[] = [
    {
        id: 1,
        title: 'New Honda City Variants & Booking Update',
        image: '/images/posts/post-1.jpeg',
        categories: ['Special Offers'],
        date: '2019-10-10',
    },
    {
        id: 2,
        title: 'After Global Chip Crisis, Another Car Part Is Going Short',
        image: '/images/posts/post-2.jpeg',
        categories: ['Latest News'],
        date: '2019-09-05',
    },
    {
        id: 3,
        title: 'Another Car Theft In Karachi, Target MG HS [Video]',
        image: '/images/posts/post-3.jpeg',
        categories: ['New Arrivals'],
        date: '2019-04-12',
    },
    {
        id: 4,
        title: 'Expected Specs & Features Of New Honda City',
        image: '/images/posts/post-4.jpeg',
        categories: ['Special Offers'],
        date: '2019-07-30',
    },
];
