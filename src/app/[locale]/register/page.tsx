'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { IconGoogle } from '@/assets/IconGoogle';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
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
import { showToast } from '@/helpers/toastHelper';
import { Link } from '@/i18n/routing';
import { BlindServices } from '@/services/manager';

export default function RegisterPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('RegisterPage');

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    termsAccepted: false,
    mailLanguage: '',
  });

  const validateForm = () => {
    let valid = true;

    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      showToast({
        message: t('error_message_mail'),
        type: 'error',
      });
      valid = false;
    }

    if (!formData.name) {
      showToast({
        message: t('error_message_name'),
        type: 'error',
      });
      valid = false;
    }

    if (!formData.password) {
      showToast({
        message: t('error_message_password'),
        type: 'error',
      });
      valid = false;
    } else if (formData.password.length < 6) {
      showToast({
        message: t('error_message_password_length'),
        type: 'error',
      });
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast({
        message: t('error_message_password_match'),
        type: 'error',
      });
      valid = false;
    }

    if (!formData.mailLanguage) {
      showToast({
        message: t('error_message_language'),
        type: 'error',
      });
      valid = false;
    }

    if (!formData.age || isNaN(Number(formData.age))) {
      showToast({
        message: t('error_message_age'),
        type: 'error',
      });
      valid = false;
    }

    if (!formData.gender) {
      showToast({
        message: t('error_message_gender'),
        type: 'error',
      });
      valid = false;
    }

    if (!formData.termsAccepted) {
      showToast({
        message: t('error_message_terms'),
        type: 'error',
      });
      valid = false;
    }

    return valid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const handleLangChange = (value: string) => {
    setFormData({ ...formData, mailLanguage: value });
  };

  function handleGoogleRegister() {
    router.push('/api/auth/google');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const request = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        age: formData.age.toString(),
        gender: formData.gender,
        mailLanguage: formData.mailLanguage,
      };
      BlindServices.RegisterUser(request).then((result) => {
        if (result.status === 200) {
          BlindServices.Activate();
          router.push(`/${locale}/activate`);
        }
      });
    } else {
      //showToast
    }
  };

  return (
    <AppLayout type="detail">
      <div className="">
        <div className="relative flex justify-center items-center md:block min-h-[240px] md:min-h-[200px] sm:p-12 p-10 text-center bg-white">
          <div className="absolute top-0 left-0 w-full h-full bg-fixed bg-[url('/heartPattern1.png')] bg-repeat bg-contain opacity-35"></div>
          <h4 className="sm:text-3xl text-2xl font-bold text-primaryColor">{t('title')}</h4>
        </div>

        <div className="relative z-2 mx-4 mb-4 -mt-16">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-backgroundColor shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md"
          >
            <div className="grid">
              <Button
                variant={'light'}
                type="button"
                className="w-full px-6 py-3 flex items-center justify-center rounded-md text-gray-800 text-sm tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200"
                title={'Google'}
                onClick={handleGoogleRegister}
              >
                <IconGoogle />
                <span>{t('google')}</span>
              </Button>
              {/* <Button
                variant={'dark'}
                title="Apple"
                type="button"
                className="w-full px-6 py-3 flex items-center justify-center rounded-md text-backgroundColor text-sm tracking-wider font-semibold border-none outline-none bg-foreground hover:bg-[#333]"
              >
                <IconApple width={20} height={20} />
                <span>{t('apple')}</span>
              </Button> */}
            </div>

            <div className="my-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 text-center">{t('or')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('email')}</label>
                <Input
                  name="email"
                  type="text"
                  className=" focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder={t('email_placeholder')}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('name')}</label>
                <Input
                  name="name"
                  type="text"
                  className=" focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder={t('name_placeholder')}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('password')}</label>
                <Input
                  name="password"
                  type="password"
                  className=" focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder={t('password_placeholder')}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('age')}</label>
                {/* <DatePicker /> */}
                <Input
                  name="age"
                  type="number"
                  className=" focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder={t('age_placeholder')}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('confirm_password')}</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  className="focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder={t('confirm_password_placeholder')}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">{t('gender')}</label>
                <Select onValueChange={handleGenderChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('gender_placeholder')} />
                  </SelectTrigger>
                  <SelectContent className="bg-backgroundColor">
                    <SelectGroup>
                      <SelectLabel>{t('gender')}</SelectLabel>
                      <SelectItem value="MALE">{t('male')}</SelectItem>
                      <SelectItem value="FEMALE">{t('female')}</SelectItem>
                      <SelectItem value="PREFER_NOT_TO_SAY">{t('other')}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center justify-center mt-8">
              <div className="items-top flex items-center space-x-2 w-full">
                <Checkbox
                  id="terms1"
                  onCheckedChange={(checked) => {
                    if (checked === true || checked === false) {
                      setFormData((prev) => ({
                        ...prev,
                        termsAccepted: checked,
                      }));
                    }
                  }}
                />{' '}
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('terms')}
                  </label>
                  <p className="text-xs text-muted-foreground">{t('terms1')}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-gray-800 text-sm mb-2 block">{t('lang')}</label>
                <Select onValueChange={handleLangChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('lang_placeholder')} />
                  </SelectTrigger>
                  <SelectContent className="bg-backgroundColor">
                    <SelectGroup>
                      <SelectLabel>{t('lang')}</SelectLabel>
                      <SelectItem value="tr">Turkish</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="ru">Russian</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-8">
              <Button size="md" variant="primary" title="Sign Up" type="submit" className="w-full">
                {t('button')}
              </Button>
            </div>
            <Link href="/login">
              <div className="text-center text-xs mt-4 underline">{t('login')}</div>
            </Link>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
