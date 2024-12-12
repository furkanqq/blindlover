'use client';

import Image from 'next/image';
import React, { useState } from 'react';

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';

export default function ProfilePage() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // bg-backgroundColor border-2 border-solid
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
              <Button type={'button'} title={'Change'} variant={'blue'} className="hidden md:flex w-full md:w-5/12">
                Change Password
                <IconKey width={16} height={16} />
              </Button>
              <Button
                type={'button'}
                title={'Update'}
                variant={'green'}
                className="hidden md:flex w-full md:w-4/12"
                onClick={() => setIsDisabled(!isDisabled)}
              >
                {isDisabled ? 'Update Info' : 'Save'}
                {isDisabled ? <IconEdit width={16} height={16} /> : <IconCheck width={16} height={16} />}
              </Button>
              <Button type={'button'} title={'Logout'} variant={'primary'} className="w-[100px] md:w-3/12">
                <span>Logout</span>
                <IconLogin width={16} height={16} />
              </Button>
            </div>
          </div>

          <hr />
          <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
            <div id="avatar">
              <div className="relative bg-backgroundColor w-32 h-32 border border-solid rounded-full overflow-hidden shadow">
                <Image src={'/heart.png'} alt="avatar" fill className="absolute object-contain" />
              </div>
            </div>
            <div id="inputs" className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
                <Input
                  disabled={isDisabled}
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-3 py-2 text-gray-800 text-sm border border-solid rounded-md outline-none focus:border-primaryColor"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <Input
                  disabled={isDisabled}
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 text-gray-800 text-sm border border-solid rounded-md outline-none focus:border-primaryColor"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Gender</label>
                <Select disabled={isDisabled}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-backgroundColor">
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Date of Birth</label>
                <Input
                  disabled={isDisabled}
                  type="date"
                  placeholder="Date of Birth"
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
            <Button onClick={openModal} size="md" type={'button'} title={'Edit'} variant={'primary'}>
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
