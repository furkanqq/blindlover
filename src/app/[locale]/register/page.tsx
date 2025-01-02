'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { IconApple } from '@/assets/IconApple';
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
import { Link } from '@/i18n/routing';
import { BlindServices } from '@/services/manager';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    termsAccepted: '',
  });

  console.log(errors, 'errors');

  const validateForm = () => {
    let valid = true;
    const newErrors: typeof errors = {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: '',
      termsAccepted: '',
    };

    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
      valid = false;
    }

    if (!formData.name) {
      newErrors.name = 'Name is required.';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    if (!formData.age || isNaN(Number(formData.age))) {
      console.log(formData.age, 'age1');
      newErrors.age = 'Please enter a valid age.';
      valid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required.';
      valid = false;
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const request = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        age: formData.age.toString(),
        gender: formData.gender,
      };
      BlindServices.RegisterUser(request)
        .then((result) => {
          if (result.status === 200) {
            router.push('/activate');
          }
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    } else {
      //showToast
    }
  };

  return (
    <AppLayout type="auth">
      <div className="">
        <div className="relative text-center bg-primaryColor min-h-[200px] sm:p-12 p-10">
          <div className="absolute top-0 left-0 w-full h-full bg-fixed bg-[url('/pattern.webp')] bg-repeat bg-contain opacity-35"></div>
          <h4 className="sm:text-3xl text-2xl font-bold text-backgroundColor">Hesabınızı Oluşturun</h4>
        </div>

        <div className="relative z-2 mx-4 mb-4 -mt-16">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-backgroundColor shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <Button
                variant={'light'}
                type="button"
                className="w-full px-6 py-3 flex items-center justify-center rounded-md text-gray-800 text-sm tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200"
                title={'Google'}
              >
                <IconGoogle />
                <span>Google ile Devam Et</span>
              </Button>
              <Button
                variant={'dark'}
                title="Apple"
                type="button"
                className="w-full px-6 py-3 flex items-center justify-center rounded-md text-backgroundColor text-sm tracking-wider font-semibold border-none outline-none bg-foreground hover:bg-[#333]"
              >
                <IconApple width={20} height={20} />
                <span>Apple ile Devam Et</span>
              </Button>
            </div>

            <div className="my-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 text-center">Ya da </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <Input
                  name="email"
                  type="text"
                  className=" focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder="Email Girin"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Ad Soyad</label>
                <Input
                  name="name"
                  type="text"
                  className=" focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder="Ad Soyad Girin"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Şifre</label>
                <Input
                  name="password"
                  type="password"
                  className=" focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder="Şifre girin"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Yaş</label>
                {/* <DatePicker /> */}
                <Input
                  name="age"
                  type="number"
                  className=" focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder="Yaşınızı girin"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Şifreyi Onayla</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  className="focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder="Şifreyi onayla"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Cinsiyet</label>
                <Select onValueChange={handleGenderChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cinsiyet Seçiniz" />
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
            </div>
            <div className="items-top flex items-center space-x-2 mt-8">
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
                  Şartları ve koşulları kabul edin
                </label>
                <p className="text-xs text-muted-foreground">
                  Hizmet Şartlarımızı ve Gizlilik Politikamızı kabul ediyorsunuz.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Button size="md" variant="primary" title="Sign Up" type="submit" className="w-full">
                Kayıt Ol
              </Button>
            </div>
            <Link href="/login">
              <div className="text-center text-xs mt-4 underline">Zaten bir hesabınız var mı? Oturum aç</div>
            </Link>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
