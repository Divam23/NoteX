import mongoose, { Schema } from 'mongoose';
import { NOTE_CATEGORY_ENUM } from './constants/noteCategory.constant';
import { NOTE_CONTENT_TYPE_ENUM } from './constants/noteContentType.constant';
import { NOTE_STATUS_ENUM } from './constants/noteStatus.constant';
import { MODERATION_FLAGS_ENUM } from './constants/noteModerationFlags.constant';
import { INote } from './types/note.types';

const NoteSchema = new Schema<INote>(
    {
        // Core metadata
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 120,
            index: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 1000,
            default:""
        },

        subject: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
            index: true,
        },

        category: {
            type: String,
            enum: NOTE_CATEGORY_ENUM,
            default: 'lecture_notes',
            required: true,
            index: true,
        },

        contentType: {
            type: String,
            enum: NOTE_CONTENT_TYPE_ENUM,
            required: true,
            index: true,
        },

        tags: {
            type: [String],
            default: [],
            set: (tags: string[]) => tags.map((tag) => tag.toLowerCase().trim()),
        },

        // Academic metadata
        course: {
            type: String,
            trim: true,
            maxlength: 100,
            index: true,
        },

        university: {
            type: String,
            trim: true,
            maxlength: 100,
            default:""
        },

        semester: {
            type: Number,
            min: 1,
            max: 10,
            index: true,
        },

        language: {
            type: String,
            default: 'en',
        },

        // File metadata
        file: {
            url: {
                type: String,
                required: true,
                validate: {
                    validator: function (v: string) {
                        return /^https?:\/\/.+/.test(v);
                    },
                    message: 'Invalid file URL',
                },
            },
            storagePath:{
                type:String,
                required:true
            },

            mimeType: {
                type: String,
                required: true,
            },

            size: {
                type: Number,
                min: 0,
            },

            thumbnailUrl: {
                type: String,
                validate: {
                    validator: function (v: string) {
                        return !v || /^https?:\/\/.+/.test(v);
                    },
                    message: 'Invalid thumbnail URL',
                },
            },

            pageCount: {
                type: Number,
                min: 0,
            },

            readingTime: {
                type: Number,
                min: 0,
            },
        },

        // Content extraction
        extractedText: {
            type: String,
            select:false
        },

        // Ownership
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        // Visibility & publishing
        isPublic: {
            type: Boolean,
            default: true,
        },

        status: {
            type: String,
            enum: NOTE_STATUS_ENUM,
            default: 'published',
            index: true,
        },

        publishedAt: {
            type: Date,
        },

        // Analytics & stats
        stats: {
            viewsCount: {
                type: Number,
                default: 0,
                min: 0,
            },

            downloadCount: {
                type: Number,
                default: 0,
                min: 0,
            },

            likesCount: {
                type: Number,
                default: 0,
                min: 0,
            },

            bookmarksCount: {
                type: Number,
                default: 0,
                min: 0,
            },
            commentsCount:{
                type:Number,
                default:0,
                min:0
            },

            sharesCount: {
                type: Number,
                default: 0,
                min: 0,
            },

            ratingsAverage: {
                type: Number,
                default: 0,
                min: 0,
                max: 5,
            },

            ratingsCount: {
                type: Number,
                default: 0,
                min: 0,
            },

            engagementScore: {
                type: Number,
                default: 0,
                min: 0,
            },

            qualityScore: {
                type: Number,
                default: 0,
                min: 0,
                max: 100,
            },

            conversionRate: {
                type: Number,
                default: 0,
                min: 0,
                max: 1,
            },

            lastViewedAt: {
                type: Date,
            },
        },

        // Moderation
        moderation: {
            reportCount: {
                type: Number,
                default: 0,
                min: 0,
            },

            moderationFlags: [
                {
                    type: String,
                    enum: MODERATION_FLAGS_ENUM,
                },
            ],

            moderatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },

            moderatedAt: {
                type: Date,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
NoteSchema.index({
    title: 'text',
    description: 'text',
    subject: 'text',
    extractedText: 'text',
});

NoteSchema.index({
    subject: 1,
    semester: 1,
    category: 1,
});

NoteSchema.index({
    createdAt: -1,
    status: 1,
    isPublic: 1,
});

NoteSchema.index({
    uploader: 1,
    createdAt: -1,
});

NoteSchema.index({
    'stats.viewsCount': -1,
});

NoteSchema.index({
    'stats.engagementScore': -1,
});

NoteSchema.index({
    'stats.qualityScore': -1,
});

NoteSchema.index({
    status: 1,
    isPublic: 1,
});

// Virtuals
NoteSchema.set('toJSON', {
    virtuals: true,
});

NoteSchema.set('toObject', {
    virtuals: true,
});

// Methods
NoteSchema.methods.calculateEngagementScore = function () {
    const views = this.stats?.viewsCount || 0;
    const downloads = this.stats?.downloadCount || 0;
    const likes = this.stats?.likesCount || 0;
    const bookmarks = this.stats?.bookmarksCount || 0;
    const ratings = this.stats?.ratingsAverage || 0;
    const score = downloads * 5 + likes * 3 + bookmarks * 4 + views * 0.5 + ratings * 10;

    return Math.min(100, Math.round(score / 10));
};


// Hooks
NoteSchema.pre('save', async function () {
    this.stats = this.stats || {};

    this.stats.engagementScore = this.calculateEngagementScore();
});

const Note = mongoose.model<INote>('Note', NoteSchema);

export default Note;
