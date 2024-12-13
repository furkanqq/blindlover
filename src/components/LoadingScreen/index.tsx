import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-white flex flex-col gap-8 items-center justify-center bg-[url(/heartPattern1.png)] bg-[contain]">
      <div className="animate-ping animate-infinite animate-ease-in animate-alternate-reverse animate-duration-500 rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 shadow-xl shadow-inner shadow-white flex justify-center items-center">
        <Image src="/heart.png" alt="Blind Lover" width={200} height={120} />
      </div>
      <div className="text-3xl text-white flex flex-col justify-center items-center">
        <Image src="/blindlover_text.png" alt="Blind Lover" width={200} height={120} />
        <span className="text-primaryColor">Loading...</span>
      </div>
    </div>
  );
}
