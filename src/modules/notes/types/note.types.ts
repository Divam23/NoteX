import mongoose, { Document } from 'mongoose';
import { NoteModerationFlagsType } from '../constants/noteModerationFlags.constant';
import { NoteCategoryType } from '../constants/noteCategory.constant';
import { NoteContentType } from '../constants/noteContentType.constant';
import { NoteStatusType } from '../constants/noteStatus.constant';
import { IUser } from '@/modules/users/types/user.types';

export interface IPopulatedNote extends Omit<INote, 'uploader'> {
    uploader: IUser;
}

export interface INote extends Document {
    title: string;
    description: string;
    subject: string;
    category: NoteCategoryType;
    contentType: NoteContentType;
    tags: string[];
    course?: string;
    university: string;
    semester?: number;
    language: string;

    file: {
        url: string;
        storagePath:string;
        mimeType: string;
        size: number;
        thumbnailUrl: string;
        pageCount: number;
        readingTime: number;
    };

    extractedText?: string;

    uploader: mongoose.Types.ObjectId;
    isPublic: boolean;
    status: NoteStatusType;
    publishedAt: Date;

    stats: {
        viewsCount: number;
        downloadCount: number;
        sharesCount: number;
        likesCount:number;
        bookmarksCount:number;
        ratingsAverage: number;
        ratingsCount: number;
        engagementScore: number;
        qualityScore: number;
        conversionRate: number;
        lastViewedAt: Date;
    };

    moderation: {
        reportCount: number;
        moderationFlags: NoteModerationFlagsType[];
        moderatedBy: mongoose.Types.ObjectId;
        moderatedAt: Date;
    };
    createdAt: Date;
    updatedAt: Date;

    calculateEngagementScore(): number;

    updateConversionRate(): void;
}
