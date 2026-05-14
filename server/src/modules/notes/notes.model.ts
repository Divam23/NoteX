import mongoose, { Schema, Document } from 'mongoose';

export const NOTE_CATEGORY_ENUM = [
  'lecture_notes',
  'previous_year_paper',
  'summaries',
  'assignments',
  'lab_manual',
  'others',
] as const;

export const NOTE_CONTENT_TYPE_ENUM = [
  'pdf',
  'docx',
  'txt',
  'pptx',
  'image',
] as const;

export const NOTE_STATUS_ENUM = [
  'published',
  'draft',
  'pending_review',
  'rejected',
] as const;

export const MODERATION_FLAGS_ENUM = [
  'spam',
  'inappropriate',
  'copyright',
  'low_quality',
] as const;

export type NoteCategoryType =
  typeof NOTE_CATEGORY_ENUM[number];

type NoteContentType =
  typeof NOTE_CONTENT_TYPE_ENUM[number];

type NoteStatusType =
  typeof NOTE_STATUS_ENUM[number];

type NoteModerationFlagsType =
  typeof MODERATION_FLAGS_ENUM[number];

interface INote extends Document {
  title: string;
  description?: string;

  subject: string;

  category: NoteCategoryType;

  contentType: NoteContentType;

  tags?: string[];

  course?: string;

  university?: string;

  semester?: number;

  language?: string;

  file: {
    url: string;
    mimeType: string;
    size?: number;
    thumbnailUrl?: string;
    pageCount?: number;
    readingTime?: number;
  };

  extractedText?: string;

  uploader: mongoose.Types.ObjectId;

  likedBy?: mongoose.Types.ObjectId[];

  bookmarkedBy?: mongoose.Types.ObjectId[];

  isPublic: boolean;

  status: NoteStatusType;

  publishedAt?: Date;

  stats?: {
    viewsCount?: number;
    downloadCount?: number;
    sharesCount?: number;
    ratingsAverage?: number;
    ratingsCount?: number;
    engagementScore?: number;
    qualityScore?: number;
    conversionRate?: number;
    lastViewedAt?: Date;
  };

  moderation?: {
    reportCount?: number;
    moderationFlags?: NoteModerationFlagsType[];
    moderatedBy?: mongoose.Types.ObjectId;
    moderatedAt?: Date;
  };

  calculateEngagementScore(): number;

  updateConversionRate(): void;
}

const NoteSchema = new Schema<INote>(
  {
    // Core metadata
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
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
      set: (tags: string[]) =>
        tags.map((tag) =>
          tag.toLowerCase().trim()
        ),
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
    },

    semester: {
      type: Number,
      min: 1,
      max: 8,
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
            return (
              !v ||
              /^https?:\/\/.+/.test(v)
            );
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
    },

    // Ownership
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Social interactions
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    bookmarkedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

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
      default: Date.now,
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
        max: 100,
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
  isPublic: 1
})

// Virtuals
NoteSchema.virtual('likesCount').get(
  function () {
    return this.likedBy?.length || 0;
  }
);

NoteSchema.virtual(
  'bookmarksCount'
).get(function () {
  return this.bookmarkedBy?.length || 0;
});

NoteSchema.set('toJSON', {
  virtuals: true,
});

NoteSchema.set('toObject', {
  virtuals: true,
});

// Methods
NoteSchema.methods.calculateEngagementScore =
  function () {
    const views =
      this.stats?.viewsCount || 0;

    const downloads =
      this.stats?.downloadCount || 0;

    const likes =
      this.likedBy?.length || 0;

    const bookmarks =
      this.bookmarkedBy?.length || 0;

    const ratings =
      this.stats?.ratingsAverage || 0;

    const score =
      downloads * 5 +
      likes * 3 +
      bookmarks * 4 +
      views * 0.5 +
      ratings * 10;

    return Math.min(
      100,
      Math.round(score / 10)
    );
  };

NoteSchema.methods.updateConversionRate =
  function () {
    if (
      this.stats &&
      this.stats.viewsCount > 0
    ) {
      this.stats.conversionRate =
        this.stats.downloadCount! /
        this.stats.viewsCount;
    }
  };

// Hooks
NoteSchema.pre('save', function (next) {
  this.stats = this.stats || {};

  this.stats.engagementScore =
    this.calculateEngagementScore();

  this.updateConversionRate();

  next;
});

const Note = mongoose.model<INote>(
  'Note',
  NoteSchema
);

export default Note;