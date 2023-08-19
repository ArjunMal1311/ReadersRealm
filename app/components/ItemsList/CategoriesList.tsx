import { FaHiking, FaHistory, FaHeart, FaBrain, FaGlobeAmericas, FaMusic, FaRegNewspaper } from 'react-icons/fa';
import { GiBookCover, GiHealthNormal, GiCookingPot, GiMicroscope } from 'react-icons/gi';
import { IoIosFilm, IoIosFlame } from 'react-icons/io';

export const bookCategories = [
    {
        label: 'Adventure',
        description: 'Experience thrilling journeys and exciting escapades.',
        icon: FaHiking,
    },
    {
        label: 'History',
        description: 'Explore the past and uncover the stories of our ancestors.',
        icon: FaHistory,
    },
    {
        label: 'Romance',
        description: 'Find stories of love, passion, and heartfelt emotions.',
        icon: FaHeart,
    },
    {
        label: 'Fiction',
        description: 'Dive into imaginative tales and create new realities.',
        icon: GiBookCover,
    },
    {
        label: 'Film',
        description: 'Explore the world of cinema and filmmaking.',
        icon: IoIosFilm,
    },
    {
        label: 'Mind & Psychology',
        description: 'Delve into the human mind.',
        icon: FaBrain,
    },
    {
        label: 'Travel & Geography',
        description: 'Embark on virtual journeys around the world.',
        icon: FaGlobeAmericas,
    },
    {
        label: 'Music',
        description: 'Learn about musical compositions, artists, and history.',
        icon: FaMusic,
    },
    {
        label: 'Health & Wellness',
        description: 'Discover ways to lead a healthy and balanced life.',
        icon: GiHealthNormal,
    },
    {
        label: 'Cooking & Culinary',
        description: 'Explore the art of cooking and culinary delights.',
        icon: GiCookingPot,
    },
    {
        label: 'News & Current Affairs',
        description: 'Stay informed about global events and current affairs.',
        icon: FaRegNewspaper,
    },
    {
        label: 'Exploration & Adventure',
        description: 'Embark on scientific explorations and adventurous quests.',
        icon: GiMicroscope,
    },
    {
        label: 'Inspiration & Motivation',
        description: 'Find inspiration and motivation for personal growth.',
        icon: IoIosFlame,
    },
];

export const rating = [
    { ratings: "4 and above", range: { "min": 4, "max": 5 } },
    { ratings: "Between 3 and 4", range: { "min": 3, "max": 4 } },
    { ratings: "Between 2 and 3", range: { "min": 2, "max": 3 } },
    { ratings: "Below 2", range: { "min": 0, "max": 2 } }
]
