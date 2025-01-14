'use client';

import { TrashIcon } from '@heroicons/react/16/solid';
import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { IconArrowRight } from '@/assets/IconArrowRight';
import { IconCheck } from '@/assets/IconCheck';
import { IconClose } from '@/assets/IconClose';
import { IconEdit } from '@/assets/IconEdit';
import { IconKey } from '@/assets/IconKey';
import { IconLogin } from '@/assets/IconLogin';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Container } from '@/components/Container';
import { Input } from '@/components/Input';
import { ProfileImageUpdater } from '@/components/ProfileImageUpdater';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import { deleteAuthTokenToHeader } from '@/services/helper';
import { BlindServices } from '@/services/manager';
import { ProfileInfoResponse, RelationInfoRequest } from '@/services/type';
import { base64ImageAtom, profileInfoAtom } from '@/stores';
import { DesiredPartnerFocus, LoveAspectToAnalyze, PerceivedImportance, RelationDuration } from '@/types/enum';
import { formatDate } from '@/utils/formatDate';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FillNow: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [fillForm, setFillForm] = useState<RelationInfoRequest>({
    isInRelation: '',
    hasCrush: '',
    relationDuration: '',
    desiredPartnerFocus: '',
    loveAspectToAnalyze: '',
    perceivedImportance: '',
  });
  const t = useTranslations('ProfilePage');
  if (!isOpen) return null;

  const handleIsInRelationChange = (value: string) => {
    setFillForm({ ...fillForm, isInRelation: value === 'true' ? true : false });
  };

  const handleHasCrushChange = (value: string) => {
    setFillForm({ ...fillForm, hasCrush: value === 'true' ? true : false });
  };

  const handleRelationDurationChange = (value: RelationDuration) => {
    setFillForm({ ...fillForm, relationDuration: value });
  };

  const handleDesiredPartnerFocusChange = (value: DesiredPartnerFocus) => {
    setFillForm({ ...fillForm, desiredPartnerFocus: value });
  };

  const handleLoveAspectToAnalyzeChange = (value: LoveAspectToAnalyze) => {
    setFillForm({ ...fillForm, loveAspectToAnalyze: value });
  };

  const handlePerceivedImportanceChange = (value: PerceivedImportance) => {
    setFillForm({ ...fillForm, perceivedImportance: value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    BlindServices.RelationInfo(fillForm).then((result) => {
      if (result.status === 200) {
        onClose();
      }
    });
  };

  return (
    <div
      id="crud-modal"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      aria-hidden={!isOpen}
    >
      <div className="relative p-4 w-full max-w-md max-h-[90vh] overflow-auto">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('relationship_info')}</h3>
            <Button onClick={onClose} type={'button'} variant={'dark'} title={''}>
              <IconClose />
            </Button>
          </div>
          {/* Modal body */}
          <form onSubmit={onSubmit} className="p-4 md:p-5">
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">{t('is_there_relationship')}</label>
              <Select value={fillForm.isInRelation ? 'true' : 'false'} onValueChange={handleIsInRelationChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('relationship_status_without')} />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value="true">{t('yes')}</SelectItem>
                    <SelectItem value="false">{t('no')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">{t('against')}</label>
              <Select value={fillForm.hasCrush ? 'true' : 'false'} onValueChange={handleHasCrushChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('love_status')} />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value="true">{t('yes')}</SelectItem>
                    <SelectItem value="false">{t('no')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">{t('relationship_duration')}</label>
              <Select value={fillForm.relationDuration} onValueChange={handleRelationDurationChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('time_without')} />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value={RelationDuration.NOT_YET}>{t(RelationDuration.NOT_YET)}</SelectItem>
                    <SelectItem value={RelationDuration.ONE_THREE_MONTHS}>
                      {t(RelationDuration.ONE_THREE_MONTHS)}
                    </SelectItem>
                    <SelectItem value={RelationDuration.THREE_TWELVE_MONTHS}>
                      {t(RelationDuration.THREE_TWELVE_MONTHS)}
                    </SelectItem>
                    <SelectItem value={RelationDuration.ONE_YEAR_ABOVE}>
                      {t(RelationDuration.ONE_YEAR_ABOVE)}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">{t('focus_on_partner')}</label>
              <Select value={fillForm.desiredPartnerFocus} onValueChange={handleDesiredPartnerFocusChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('preview_focus')} />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value={DesiredPartnerFocus.EMOTIONAL_SUPPORT}>
                      {t(DesiredPartnerFocus.EMOTIONAL_SUPPORT)}
                    </SelectItem>
                    <SelectItem value={DesiredPartnerFocus.ROMANTIC_GESTURE}>
                      {t(DesiredPartnerFocus.ROMANTIC_GESTURE)}
                    </SelectItem>
                    <SelectItem value={DesiredPartnerFocus.TIME_SEPARATION}>
                      {t(DesiredPartnerFocus.TIME_SEPARATION)}
                    </SelectItem>
                    <SelectItem value={DesiredPartnerFocus.FINANCIAL_SUPPORT}>
                      {t(DesiredPartnerFocus.FINANCIAL_SUPPORT)}
                    </SelectItem>
                    <SelectItem value={DesiredPartnerFocus.OTHER}>{t(DesiredPartnerFocus.OTHER)}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">{t('love_direction_question')}</label>
              <Select value={fillForm.loveAspectToAnalyze} onValueChange={handleLoveAspectToAnalyzeChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('love_analyze')} />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value={LoveAspectToAnalyze.EMOTIONAL_ATTACHMENT}>
                      {t(LoveAspectToAnalyze.EMOTIONAL_ATTACHMENT)}
                    </SelectItem>
                    <SelectItem value={LoveAspectToAnalyze.LOYALTY}>{t(LoveAspectToAnalyze.LOYALTY)}</SelectItem>
                    <SelectItem value={LoveAspectToAnalyze.ATTENTIVE_BEHAVIOR}>
                      {t(LoveAspectToAnalyze.ATTENTIVE_BEHAVIOR)}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">{t('importance')}</label>
              <Select value={fillForm.perceivedImportance} onValueChange={handlePerceivedImportanceChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('relationship_status_without')} />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value={PerceivedImportance.VERY_MUCH}>{t(PerceivedImportance.VERY_MUCH)}</SelectItem>
                    <SelectItem value={PerceivedImportance.MODERATE}>{t(PerceivedImportance.MODERATE)}</SelectItem>
                    <SelectItem value={PerceivedImportance.UNSURE}>{t(PerceivedImportance.UNSURE)}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" title={''} variant={'green'} size="md" className="w-full">
              {t('save')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: ProfileInfoResponse['data'];
}

const UpdatePassword: React.FC<UpdateModalProps> = ({ isOpen, onClose, info }) => {
  const router = useRouter();
  const locale = useLocale();
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const t = useTranslations('ProfilePage');

  if (!isOpen) return null;
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (info.emailVerified === false) {
      router.push(`/${locale}/not-approved`);
      return;
    }
    const updateForm = {
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword,
    };
    if (passwordForm.newPassword === passwordForm.newPasswordConfirm) {
      BlindServices.UpdatePassword(updateForm);
      //toast gelecek
      setTimeout(() => {
        onClose();
        deleteAuthTokenToHeader();
        router.push(`/${locale}/login`);
      }, 500);
    } else {
      //toast gelecek
      console.log('Şifreler uyuşmuyor');
    }
  };

  return (
    <div
      id="crud-modal"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      aria-hidden={!isOpen}
    >
      <div className="relative p-4 w-full max-w-md max-h-[90vh] overflow-auto">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('update_password')}</h3>
            <Button onClick={onClose} type={'button'} variant={'dark'} title={''}>
              <IconClose />
            </Button>
          </div>
          {/* Modal body */}
          <form onSubmit={(e) => handleUpdatePassword(e)} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="OldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('old_password')}
                </label>
                <Input
                  type="password"
                  name="OldPassword"
                  id="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t('old_password')}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="NewPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('new_password')}
                </label>
                <Input
                  type="password"
                  name="NewPassword"
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t('new_password')}
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="NewPasswordConfirm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t('confirm_password')}
                </label>
                <Input
                  type="password"
                  name="NewPasswordConfirm"
                  id="newPasswordConfirm"
                  value={passwordForm.newPasswordConfirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPasswordConfirm: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t('confirm_password')}
                  required
                />
              </div>
            </div>
            <Button type="submit" title={''} variant={'blue'} size="md" className="w-full">
              {t('update')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const DeleteAccount: React.FC<UpdateModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const locale = useLocale();
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    newPasswordConfirm: '',
  });
  const t = useTranslations('ProfilePage');

  if (!isOpen) return null;
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword === passwordForm.newPasswordConfirm) {
      BlindServices.ProfileDelete(passwordForm.newPassword.toString())
        .then((result) => {
          if (result.status === 200) {
            //toast gelecek
            setTimeout(() => {
              onClose();
              deleteAuthTokenToHeader();
              router.push(`/${locale}/login`);
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //toast gelecek
    } else {
      //toast gelecek
      console.log('Şifreler uyuşmuyor');
    }
  };

  return (
    <div
      id="crud-modal"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      aria-hidden={!isOpen}
    >
      <div className="relative p-4 w-full max-w-md max-h-[90vh] overflow-auto">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('delete_account_title')}</h3>
            <Button onClick={onClose} type={'button'} variant={'dark'} title={''}>
              <IconClose />
            </Button>
          </div>
          {/* Modal body */}
          <form onSubmit={(e) => handleUpdatePassword(e)} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="NewPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('password')}
                </label>
                <Input
                  type="password"
                  name="NewPassword"
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t('password')}
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="NewPasswordConfirm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t('confirm_pass')}
                </label>
                <Input
                  type="password"
                  name="NewPasswordConfirm"
                  id="newPasswordConfirm"
                  value={passwordForm.newPasswordConfirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPasswordConfirm: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t('confirm_pass')}
                  required
                />
              </div>
            </div>
            <Button type="submit" title={''} variant={'primary'} size="md" className="w-full">
              {t('delete')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

interface FormInfo {
  fullName: string;
  email: string;
  age: string;
  gender: string;
  image: string;
}

interface updateForm {
  name: string;
  age: string;
  base64Photo?: string;
  gender: string;
}

export default function ProfilePage() {
  const t = useTranslations('ProfilePage');
  const router = useRouter();
  const locale = useLocale();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formInfo, setFormInfo] = useState<FormInfo>({
    fullName: '',
    email: '',
    age: '',
    gender: '',
    image: '',
  });
  const [info] = useAtom(profileInfoAtom);
  const [image] = useAtom(base64ImageAtom);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  useEffect(() => {
    BlindServices.ProfileInfo();
  }, []);

  useEffect(() => {
    if (info) {
      setFormInfo({
        fullName: info?.name || '',
        email: info?.email || '',
        age: info.age.toString() || '',
        gender: info?.gender || '',
        image: info.profileImageUrl || '',
      });
    }
  }, [info]);

  const handleGenderChange = (value: string) => {
    setFormInfo({ ...formInfo, gender: value });
  };

  function handleLogOut() {
    deleteAuthTokenToHeader();
    window.location.href = `/${locale}/`;
  }

  function handleSave() {
    if (!info) return;
    if (info?.emailVerified === false) {
      router.push(`/${locale}/not-approved`);
    }
    let updateForm: updateForm = {
      name: '',
      age: '',
      gender: '',
    };

    if (image) {
      updateForm = {
        name: formInfo.fullName,
        age: formInfo.age,
        base64Photo: image,
        gender: formInfo.gender,
      };
    } else {
      updateForm = {
        name: formInfo.fullName,
        age: formInfo.age,
        gender: formInfo.gender,
      };
    }

    BlindServices.ProfileUpdate(updateForm).then((result) => {
      if (result.status === 200) {
        setIsDisabled(!isDisabled);
      }
    });
  }

  function handleFillNow() {
    if (info?.emailVerified === false) {
      router.push(`/${locale}/not-approved`);
    } else {
      openModal();
    }
  }

  console.log(info);

  return (
    <AppLayout>
      <Container className="pb-0 md:pb-20 pt-16 md:pt-24">
        <div className="flex flex-col gap-4 md:gap-12 md:px-16 py-12 rounded-lg">
          <div className="flex gap-5 justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-start text-2xl font-semibold">{t('profile')}</h1>
              <p className="text-gray-600 text-[12px]">{t('subtitle')}</p>
              <p className="text-gray-600 text-[12px]">
                {t('last_update')}{' '}
                {info?.updatedAt
                  ? formatDate(info?.updatedAt, { locale: `${locale}-${locale.toUpperCase()}` })
                  : formatDate(info?.createdAt as string, { locale: `${locale}-${locale.toUpperCase()}` })}
              </p>
            </div>
            <div id="change out" className="flex justify-center items-end flex-col md:flex-row gap-2 w-full md:w-2/5">
              <UpdatePassword
                info={info as ProfileInfoResponse['data']}
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
              />
              <Button
                onClick={openUpdateModal}
                type={'button'}
                title={'Change'}
                variant={'blue'}
                className="hidden md:flex w-full md:w-4/12 h-12"
              >
                {t('change_password')}
                <IconKey width={16} height={16} />
              </Button>
              {isDisabled ? (
                <Button
                  type={'button'}
                  title={'Update'}
                  variant={'green'}
                  className="hidden md:flex w-full md:w-4/12 h-12"
                  onClick={() => setIsDisabled(!isDisabled)}
                >
                  {t('update_info')}
                  <IconEdit width={16} height={16} />
                </Button>
              ) : (
                <div className="flex gap-2 md:w-5/12">
                  <Button
                    type={'button'}
                    title={'Save'}
                    variant={'green'}
                    className="hidden md:flex w-full md:w-1/2 h-12"
                    onClick={() => handleSave()}
                  >
                    <IconCheck width={16} height={16} />
                  </Button>
                  <Button
                    type={'button'}
                    title={'Cancel'}
                    variant={'primary'}
                    className="hidden md:flex w-full md:w-1/2 h-12"
                    onClick={() => setIsDisabled(!isDisabled)}
                  >
                    <IconClose width={16} height={16} />
                  </Button>
                </div>
              )}
              <Button
                type={'button'}
                title={'Logout'}
                variant={'primary'}
                className="w-[100px] md:w-3/12 h-12"
                onClick={handleLogOut}
              >
                <span> {t('logout')}</span>
                <IconLogin width={16} height={16} />
              </Button>
            </div>
          </div>

          <hr />
          <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
            <ProfileImageUpdater image={formInfo.image} isDisabled={isDisabled} />
            <div id="inputs" className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('name_label')}</label>
                <Input
                  disabled={isDisabled}
                  value={formInfo.fullName}
                  onChange={(e) => setFormInfo({ ...formInfo, fullName: e.target.value })}
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-3 py-2 text-gray-800 text-sm border border-solid rounded-md outline-none focus:border-primaryColor"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('mail')}</label>
                <Input
                  disabled
                  value={formInfo.email}
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 text-gray-800 text-sm border border-solid rounded-md outline-none focus:border-primaryColor"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('gender_label')}</label>
                <Select disabled={isDisabled} value={formInfo.gender} onValueChange={handleGenderChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-backgroundColor">
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="MALE">{t('male')}</SelectItem>
                      <SelectItem value="FEMALE">{t('female')}</SelectItem>
                      <SelectItem value="OTHER">{t('OTHER')}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('age_label')}</label>
                <Input
                  disabled={isDisabled}
                  value={formInfo.age}
                  onChange={(e) => setFormInfo({ ...formInfo, age: e.target.value })}
                  type="number"
                  placeholder="Age"
                  className="w-full px-3 py-2 text-gray-800 text-sm border border-solid rounded-md outline-none focus:border-primaryColor"
                />
              </div>
            </div>
          </div>
          <hr />
          {info?.relationInfo ? (
            <div className="grid gap-6">
              <h1 className="font-semibold text-lg">{t('relationship_info')}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">{t('relationship_status')}</span>
                  {info?.relationInfo.isInRelation ? t('yes') : t('no')}{' '}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">{t('love')}</span> {info?.relationInfo.hasCrush ? t('yes') : t('no')}{' '}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">{t('time')}</span> {t(info?.relationInfo.relationDuration)}{' '}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">{t('focus')}</span> {t(info?.relationInfo.desiredPartnerFocus)}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">{t('love_direction')}</span>{' '}
                  {t(info?.relationInfo.loveAspectToAnalyze)}{' '}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">{t('degree')}</span> {t(info?.relationInfo.perceivedImportance)}{' '}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex md:flex-row flex-col w-full md:items-center justify-end md:justify-between gap-4 md:gap-12">
              <div className="flex flex-col w-[80%]">
                <label className="font-semibold">{t('info_title')}</label>
                <span className="text-[12px]">{t('info_desc')}</span>
              </div>

              <Button onClick={handleFillNow} size="md" type={'button'} title={'Edit'} variant={'primary'}>
                <span>{t('fill_now')}</span>
                <IconArrowRight className="hidden md:flex" width={16} height={16} />
              </Button>
            </div>
          )}
          <Button
            onClick={openDeleteModal}
            type={'button'}
            title={'Change'}
            size="md"
            variant={'primary'}
            className="hidden md:flex w-full"
          >
            {t('delete_account')}
            <TrashIcon width={16} height={16} />
          </Button>
          <DeleteAccount
            info={info as ProfileInfoResponse['data']}
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
          />
          <FillNow isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </Container>
    </AppLayout>
  );
}
