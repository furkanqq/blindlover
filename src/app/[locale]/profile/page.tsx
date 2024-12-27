'use client';

import { useAtom } from 'jotai';
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

interface FormInfo {
  fullName: string;
  email: string;
  age: string;
  gender: string;
  image: string;
}

export default function ProfilePage() {
  const RelationDurationMap: { [key in RelationDuration]: string } = {
    [RelationDuration.NOT_YET]: 'Henüz başlamadı',
    [RelationDuration.ONE_THREE_MONTHS]: '1-3 ay',
    [RelationDuration.THREE_TWELVE_MONTHS]: '3-12 ay',
    [RelationDuration.ONE_YEAR_ABOVE]: '1 yıl veya daha uzun',
  };
  const DesiredPartnerFocusMap: { [key in DesiredPartnerFocus]: string } = {
    [DesiredPartnerFocus.EMOTIONAL_SUPPORT]: 'Duygusal destek',
    [DesiredPartnerFocus.ROMANTIC_GESTURE]: 'Romantik jestler',
    [DesiredPartnerFocus.TIME_SEPARATION]: 'Birlikte geçirilen zamanın ayrımı',
    [DesiredPartnerFocus.FINANCIAL_SUPPORT]: 'Finansal destek',
    [DesiredPartnerFocus.OTHER]: 'Diğer',
  };

  const LoveAspectToAnalyzeMap: { [key in LoveAspectToAnalyze]: string } = {
    [LoveAspectToAnalyze.EMOTIONAL_ATTACHMENT]: 'Duygusal bağlılık',
    [LoveAspectToAnalyze.LOYALTY]: 'Sadakat',
    [LoveAspectToAnalyze.ATTENTIVE_BEHAVIOR]: 'İlgili davranışlar',
  };

  const PerceivedImportanceMap: { [key in PerceivedImportance]: string } = {
    [PerceivedImportance.VERY_MUCH]: 'Çok fazla',
    [PerceivedImportance.MODERATE]: 'Orta düzeyde',
    [PerceivedImportance.UNSURE]: 'Emin değilim',
  };

  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
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

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  // bg-backgroundColor border-2 border-solid

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

  function handleLogOut() {
    deleteAuthTokenToHeader();
    window.location.href = '/';
  }

  function handleSave() {
    if (info?.emailVerified === false) {
      router.push('/not-approved');
    }
    const updateForm = {
      name: formInfo.fullName,
      age: formInfo.age,
      base64Photo: image,
    };

    BlindServices.ProfileUpdate(updateForm).then((result) => {
      if (result.status === 200) {
        setIsDisabled(!isDisabled);
      }
    });
  }

  function handleFillNow() {
    if (info?.emailVerified === false) {
      router.push('/not-approved');
    } else {
      openModal();
    }
  }

  return (
    <AppLayout>
      <Container className="pb-0 md:pb-20 pt-16 md:pt-24">
        <div className="flex flex-col gap-4 md:gap-12 md:px-16 py-12 rounded-lg">
          <div className="flex gap-5 justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-start text-2xl font-semibold">Profil</h1>
              <p className="text-gray-600 text-[12px]">Bu sizin genel görünümünüz..</p>
              <p className="text-gray-600 text-[12px]">
                Son Güncelleme:{' '}
                {info?.updatedAt
                  ? formatDate(info?.updatedAt, { locale: 'tr-TR' })
                  : formatDate(info?.createdAt as string, { locale: 'tr-TR' })}
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
                className="hidden md:flex w-full md:w-4/12"
              >
                Şifre Değiştir
                <IconKey width={16} height={16} />
              </Button>
              {isDisabled ? (
                <Button
                  type={'button'}
                  title={'Update'}
                  variant={'green'}
                  className="hidden md:flex w-full md:w-4/12"
                  onClick={() => setIsDisabled(!isDisabled)}
                >
                  Bilgi Güncelle
                  <IconEdit width={16} height={16} />
                </Button>
              ) : (
                <div className="flex gap-2 md:w-5/12">
                  <Button
                    type={'button'}
                    title={'Save'}
                    variant={'green'}
                    className="hidden md:flex w-full md:w-1/2"
                    onClick={() => handleSave()}
                  >
                    <IconCheck width={16} height={16} />
                  </Button>
                  <Button
                    type={'button'}
                    title={'Cancel'}
                    variant={'primary'}
                    className="hidden md:flex w-full md:w-1/2"
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
                className="w-[100px] md:w-3/12"
                onClick={handleLogOut}
              >
                <span>Çıkış</span>
                <IconLogin width={16} height={16} />
              </Button>
            </div>
          </div>

          <hr />
          <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
            <ProfileImageUpdater image={formInfo.image} isDisabled={isDisabled} />
            <div id="inputs" className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Ad Soyad</label>
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
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <Input
                  disabled
                  value={formInfo.email}
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 text-gray-800 text-sm border border-solid rounded-md outline-none focus:border-primaryColor"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Cinsiyet</label>
                <Select disabled value={formInfo.gender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-backgroundColor">
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="MALE">Erkek</SelectItem>
                      <SelectItem value="FEMALE">Kadın</SelectItem>
                      <SelectItem value="OTHER">Diğer</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Yaş</label>
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
              <h1 className="font-semibold text-lg">İlişki Bilgileri</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">İlişki Durumu:</span>{' '}
                  {info?.relationInfo.isInRelation ? 'Evet' : 'Hayır'}{' '}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">Aşık mısınız:</span> {info?.relationInfo.hasCrush ? 'Evet' : 'Hayır'}{' '}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">İlişki Süresi:</span>{' '}
                  {RelationDurationMap[info?.relationInfo.relationDuration as RelationDuration]}{' '}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">Partnerinizde odaklanmasını istediğiniz konu:</span>{' '}
                  {DesiredPartnerFocusMap[info?.relationInfo.desiredPartnerFocus as DesiredPartnerFocus]}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">Analiz edilmesini istediğiniz aşk yönü:</span>{' '}
                  {LoveAspectToAnalyzeMap[info?.relationInfo.loveAspectToAnalyze as LoveAspectToAnalyze]}{' '}
                </p>
                <p className="border border-solid p-4 rounded-md bg-backgroundColor text-[14px]">
                  <span className="font-semibold">Önem derecesi:</span>{' '}
                  {PerceivedImportanceMap[info?.relationInfo.perceivedImportance as PerceivedImportance]}{' '}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex md:flex-row flex-col w-full md:items-center justify-end md:justify-between gap-4 md:gap-12">
              <div className="flex flex-col w-[80%]">
                <label className="font-semibold">İlişki bilgisi</label>
                <span className="text-[12px]">
                  Testlere başlamak için gerekli tüm alanları boşluk bırakmadan doldurmanız gerekmektedir. Lütfen tüm
                  bölümleri dikkatlice inceleyin ve devam etmeden önce eksik bilgileri doldurun. Formun doğru bir
                  şekilde doldurulması, test sonuçlarının güvenilirliğini ve doğruluğunu sağlamak için çok önemlidir.
                </span>
              </div>

              <Button onClick={handleFillNow} size="md" type={'button'} title={'Edit'} variant={'primary'}>
                <span>Şimdi Doldur</span>
                <IconArrowRight className="hidden md:flex" width={16} height={16} />
              </Button>
            </div>
          )}
          <FillNow isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </Container>
    </AppLayout>
  );
}

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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Relationship Information</h3>
            <Button onClick={onClose} type={'button'} variant={'dark'} title={''}>
              <IconClose />
            </Button>
          </div>
          {/* Modal body */}
          <form onSubmit={onSubmit} className="p-4 md:p-5">
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">Şu anda bir ilişki içinde misiniz?</label>
              <Select value={fillForm.isInRelation ? 'true' : 'false'} onValueChange={handleIsInRelationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="İlişki Durumu" />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value="true">Evet</SelectItem>
                    <SelectItem value="false">Hayır</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">
                Şu anda birine karşı duygusal bir ilgi duyuyor musunuz?
              </label>
              <Select value={fillForm.hasCrush ? 'true' : 'false'} onValueChange={handleHasCrushChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Aşık Olma Durumu" />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value="true">Evet</SelectItem>
                    <SelectItem value="false">Hayır</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">İlişkinizin süresi ne kadar?</label>
              <Select value={fillForm.relationDuration} onValueChange={handleRelationDurationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="İlişki Süresi" />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value={RelationDuration.NOT_YET}>Henüz Başlamadı</SelectItem>
                    <SelectItem value={RelationDuration.ONE_THREE_MONTHS}>1-3 ay</SelectItem>
                    <SelectItem value={RelationDuration.THREE_TWELVE_MONTHS}>3-12 ay</SelectItem>
                    <SelectItem value={RelationDuration.ONE_YEAR_ABOVE}>1 yıl veya daha uzun</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">
                Partnerinizde hangi konulara daha çok odaklanmasını isterdiniz?
              </label>
              <Select value={fillForm.desiredPartnerFocus} onValueChange={handleDesiredPartnerFocusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Öne Çıkmasını İstediğiniz Odak" />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value={DesiredPartnerFocus.EMOTIONAL_SUPPORT}>Duygusal destek</SelectItem>
                    <SelectItem value={DesiredPartnerFocus.ROMANTIC_GESTURE}>Romantik jestler</SelectItem>
                    <SelectItem value={DesiredPartnerFocus.TIME_SEPARATION}>
                      Birlikte geçirdiğiniz zamanın ayrımı
                    </SelectItem>
                    <SelectItem value={DesiredPartnerFocus.FINANCIAL_SUPPORT}>Finansal destek</SelectItem>
                    <SelectItem value={DesiredPartnerFocus.OTHER}>Diğer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">
                İlişkinizde analiz edilmesini istediğiniz aşkın hangi yönüdür?
              </label>
              <Select value={fillForm.loveAspectToAnalyze} onValueChange={handleLoveAspectToAnalyzeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Analiz Edilecek Yön" />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value={LoveAspectToAnalyze.EMOTIONAL_ATTACHMENT}>Duygusal bağlılık</SelectItem>
                    <SelectItem value={LoveAspectToAnalyze.LOYALTY}>Sadakat</SelectItem>
                    <SelectItem value={LoveAspectToAnalyze.ATTENTIVE_BEHAVIOR}>İlgili davranışlar</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-4">
              <label className="text-gray-800 text-sm mb-2 block">
                Bu konuyu sizin için ne kadar önemli görüyorsunuz?
              </label>
              <Select value={fillForm.perceivedImportance} onValueChange={handlePerceivedImportanceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="İlişki Durumu" />
                </SelectTrigger>
                <SelectContent className="bg-backgroundColor">
                  <SelectGroup>
                    <SelectItem value={PerceivedImportance.VERY_MUCH}>Çok fazla</SelectItem>
                    <SelectItem value={PerceivedImportance.MODERATE}>Orta düzeyde</SelectItem>
                    <SelectItem value={PerceivedImportance.UNSURE}>Emin değilim</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" title={''} variant={'green'} size="md" className="w-full">
              Kaydet
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
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  if (!isOpen) return null;
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (info.emailVerified === false) {
      router.push('/not-approved');
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
        router.push('/login');
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Şifre Güncelleme</h3>
            <Button onClick={onClose} type={'button'} variant={'dark'} title={''}>
              <IconClose />
            </Button>
          </div>
          {/* Modal body */}
          <form onSubmit={(e) => handleUpdatePassword(e)} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="OldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Eski Şifre
                </label>
                <Input
                  type="password"
                  name="OldPassword"
                  id="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Eski Şifre"
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="NewPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Yeni Şifre
                </label>
                <Input
                  type="password"
                  name="NewPassword"
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Yeni Şifre"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="NewPasswordConfirm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Yeni Şifre Tekrarı
                </label>
                <Input
                  type="password"
                  name="NewPasswordConfirm"
                  id="newPasswordConfirm"
                  value={passwordForm.newPasswordConfirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPasswordConfirm: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Yeni Şifre Tekrarı"
                  required
                />
              </div>
            </div>
            <Button type="submit" title={''} variant={'blue'} size="md" className="w-full">
              Güncelle
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
