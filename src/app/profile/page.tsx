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
import { ProfileInfoResponse } from '@/services/type';
import { base64ImageAtom, profileInfoAtom } from '@/stores';

interface FormInfo {
  fullName: string;
  email: string;
  age: string;
  gender: string;
  image: string;
}

export default function ProfilePage() {
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
        image: info.base64Photo || '',
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
      <Container className="pb-0 md:pb-28 pt-16 md:pt-24">
        <div className="flex flex-col gap-4 md:gap-12 md:px-16 py-12 rounded-lg">
          <div className="flex gap-5 justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-start text-2xl font-semibold">Profile</h1>
              <p className="text-gray-600 text-[12px]">This is your general outlook.</p>
              <p className="text-gray-600 text-[12px]">Last update: [date]</p>
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
                className="hidden md:flex w-full md:w-5/12"
              >
                Change Password
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
                  Update Info
                  <IconEdit width={16} height={16} />
                </Button>
              ) : (
                <div className="flex gap-2 md:w-4/12">
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
                <span>Logout</span>
                <IconLogin width={16} height={16} />
              </Button>
            </div>
          </div>

          <hr />
          <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
            <ProfileImageUpdater isDisabled={isDisabled} />
            <div id="inputs" className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
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
                <label className="text-gray-800 text-sm mb-2 block">Gender</label>
                <Select disabled value={formInfo.gender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-backgroundColor">
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Age</label>
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
          <div className="flex md:flex-row flex-col w-full md:items-center justify-end md:justify-between gap-4 md:gap-12">
            <div className="flex flex-col w-[80%]">
              <label className="font-semibold">Relationship Info</label>
              <span className="text-[12px]">
                To start the tests, it is necessary to complete all the required fields without leaving any blanks.
                Please review all the sections carefully and fill in any missing information before proceeding. Properly
                completing the form is crucial to ensure the reliability and accuracy of the test results.
              </span>
            </div>
            <FillNow isOpen={isModalOpen} onClose={closeModal} />
            <Button onClick={handleFillNow} size="md" type={'button'} title={'Edit'} variant={'primary'}>
              <span>Fill Now</span>
              <IconArrowRight className="hidden md:flex" width={16} height={16} />
            </Button>
          </div>
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
  if (!isOpen) return null;

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
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              {Array.from({ length: 8 }, (_, index) => (
                <div className="col-span-2" key={index}>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    How much does the person you are with or like care about you?
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required
                  />
                </div>
              ))}
            </div>
            <Button type="submit" title={''} variant={'green'} size="md" className="w-full">
              Save
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
