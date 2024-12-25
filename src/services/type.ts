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
  name: string;
  age: string;
  base64Photo: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface BlindBlogListResponse {
  data: Array<{
    status: 'published' | 'archived' | 'draft';
    user_created: string;
    user_updated: string;
    date_created: string;
    date_updated: string;
    sort: number | null;
    blog_image: string;
    id: number;
    tr_title: string;
    en_title: string;
    es_title: string;
    ru_title: string;
    fr_title: string;
    pt_title: string;
    slug: string;
    tr_content: string;
  }>;
}

export interface BlindBlogResponse {
  status: 'published' | 'archived' | 'draft';
  user_created: string;
  user_updated: string;
  date_created: string;
  date_updated: string;
  sort: number | null;
  blog_image: string;
  id: number;
  tr_title: string;
  en_title: string;
  es_title: string;
  ru_title: string;
  fr_title: string;
  pt_title: string;
  slug: string;
  tr_content: string;
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

interface AiResultResponse {
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

interface AiResultResponseLanguages {
  turkish: AiResultResponse;
  english: AiResultResponse;
  spanish: AiResultResponse;
  portuguese: AiResultResponse;
  french: AiResultResponse;
  russian: AiResultResponse;
  _id: string;
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

export interface QuestionResult {
  data: {
    _id: string;
    customerId: string;
    aiResultResponse: AiResultResponseLanguages;
    createdAt: string;
    updatedAt: string;
  };
}
