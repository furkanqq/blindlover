'use client';

import { CameraIcon, PlusCircleIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { useState } from 'react';

import { BlindStore } from '@/provider';
import { base64ImageAtom } from '@/stores';

const ProfileImageUpdater = ({ isDisabled, image }: { isDisabled: boolean; image: string }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        BlindStore.set(base64ImageAtom, base64String);
        setSelectedImage(base64String); // Base64'ü direkt olarak görüntülemek için kullanıyoruz
      };
      reader.readAsDataURL(file); // Base64'e çevirir
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Profil Resmi */}
        <label htmlFor="profileImageInput" className="cursor-pointer">
          <div
            className={`w-32 h-32 rounded-full bg-primaryDisabled/20 flex items-center justify-center overflow-hidden ${
              selectedImage || (image && isDisabled === true)
                ? 'shadow-lg shadow-gray-700'
                : 'border-2 border-dashed border-primaryColor/40'
            }`}
          >
            {selectedImage || (image && isDisabled === true) ? (
              <Image
                src={selectedImage !== null ? selectedImage : image}
                alt="Profile"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            ) : (
              <div className="flex flex-col justify-center items-center text-gray-600">
                <CameraIcon width={24} height={24} />
                <span className="text-sm">
                  <PlusCircleIcon width={16} height={16} />
                </span>
              </div>
            )}
          </div>
        </label>

        {/* Gizli Dosya Giriş Alanı */}
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export { ProfileImageUpdater };
