// interface GResponse {
//   status: number;
//   timestamp: string;
//   message: string;
// }

import {
  AgeRange,
  DesiredPartnerFocus,
  LoveAspectToAnalyze,
  PerceivedImportance,
  QuestionCategory,
  RelationDuration,
} from '@/types/enum';

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  age: string;
  gender: string;
  mailLanguage: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ProfileInfoResponse {
  data: {
    email: string;
    name: string;
    gender: string;
    age: string;
    emailVerified: boolean;
    relationInfo: RelationInfoRequest | null;
    profileImageUrl: null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProfileUpdateRequest {
  name?: string;
  age?: string;
  base64Photo?: string;
  gender?: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface BlindBlogListResponse {
  data: Array<{
    status: 'published' | 'archived' | 'draft';
    date_created: string;
    banner_image: string;
    small_image: string;
    id: number;
    title_tr: string;
    title_en: string;
    title_es: string;
    title_ru: string;
    title_fr: string;
    title_pt: string;
    slug: string;
    content_tr: string;
    content_en: string;
    content_es: string;
    content_ru: string;
    content_fr: string;
    content_pt: string;
  }>;
}

export interface BlindMovieListResponse {
  data: Array<{
    status: 'published' | 'archived' | 'draft';
    date_created: string;
    id: number;
    movie_name: string;
    category_tr: string;
    category_en: string;
    category_es: string;
    category_ru: string;
    category_fr: string;
    category_pt: string;
    link: string;
    content_tr: string;
    content_en: string;
    content_es: string;
    content_ru: string;
    content_fr: string;
    content_pt: string;
  }>;
}

export interface BlindSeriesListResponse {
  data: Array<{
    status: 'published' | 'archived' | 'draft';
    date_created: string;
    id: number;
    series_name: string;
    category_tr: string;
    category_en: string;
    category_es: string;
    category_ru: string;
    category_fr: string;
    category_pt: string;
    link: string;
    series_content_tr: string;
    series_content_en: string;
    series_content_es: string;
    series_content_ru: string;
    series_content_fr: string;
    series_content_pt: string;
  }>;
}

export interface BlindBlogResponse {
  status: 'published' | 'archived' | 'draft';
  date_created: string;
  banner_image: string;
  small_image: string;
  id: number;
  title_tr: string;
  title_en: string;
  title_es: string;
  title_ru: string;
  title_fr: string;
  title_pt: string;
  slug: string;
  content_tr: string;
  content_en: string;
  content_es: string;
  content_ru: string;
  content_fr: string;
  content_pt: string;
}

export interface QuestionListResponse {
  data: Array<{
    _id: string;
    index: string;
    english: string;
    turkish: string;
    spanish: string;
    portuguese: string;
    russian: string;
    french: string;
    category: QuestionCategory;
    inRelation: boolean;
    ageRange: AgeRange;
  }>;
}

export interface AnswerRequest {
  answers: AnswerType[];
  language: 'tr' | 'en' | 'es' | 'pt' | 'ru' | 'fr';
}

export interface AnswerType {
  answer: string;
  questionId: string;
}

export interface RelationInfoRequest {
  isInRelation: boolean | '';
  hasCrush: boolean | '';
  relationDuration: RelationDuration | '';
  desiredPartnerFocus: DesiredPartnerFocus | '';
  loveAspectToAnalyze: LoveAspectToAnalyze | '';
  perceivedImportance: PerceivedImportance | '';
}

export interface AiResultResponse {
  lovePercentage: string;
  answerCategoryAnalysis: {
    generalRelationStatus: string;
    emotionalAttachment: string;
    loyaltyAndTrust: string;
    romanticBehavior: string;
    funAndDailyHabits: string;
  };
  comment: string;
  _id: string;
}

export interface AiResultResponseLanguages {
  turkish: AiResultResponse;
  english: AiResultResponse;
  spanish: AiResultResponse;
  portuguese: AiResultResponse;
  french: AiResultResponse;
  russian: AiResultResponse;
  _id: string;
}
export interface QuestionResult {
  data: {
    _id: string;
    customerId: string;
    aiResultResponse: AiResultResponseLanguages;
    createdAt: string;
    updatedAt: string;
  };
}

export interface QuestionResultList {
  data: Array<{
    _id: string;
    customerId: string;
    aiResultResponse: AiResultResponseLanguages;
    createdAt: string;
    updatedAt: string;
  }>;
}
