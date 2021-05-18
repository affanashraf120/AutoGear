// application
import { IReview } from '~/interfaces/review';
import { makeIdGenerator } from '~/server/utils';

export const getNextReviewId = makeIdGenerator();

export const reviews: IReview[] = [
    {
        id: getNextReviewId(),
        date: '2018-05-27',
        author: 'Aslam',
        avatar: '/images/avatars/avatar.jpeg',
        rating: 4,
        content: `Honda civic is good model. And used for 10 years.`,
    },
    {
        id: getNextReviewId(),
        date: '2018-04-12',
        author: 'Bilal',
        avatar: '/images/avatars/avatar.jpeg',
        rating: 3,
        content: `Nice`,
    },
    {
        id: getNextReviewId(),
        date: '2018-01-02',
        author: 'Hira',
        avatar: '/images/avatars/female-avatar.jpeg',
        rating: 5,
        content: `Amazing 😻 `,
    },
];
