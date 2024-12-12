import Image from 'next/image';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';

export default function BlogDetail() {
  return (
    <AppLayout type="landing" className="">
      <article className="">
        {/* Banner */}
        <div className="bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center bg-transparent text-foreground text-center h-[300px] w-full">
          <h1 className="text-4xl mt-12 font-bold">Blog title</h1>
          <p className="text-md text-gray-500 mt-4">Blog little desc</p>
        </div>

        <Container className="mt-12 flex flex-col gap-12">
          <div className="relative w-full h-[300px] py-[10px] flex justify-center items-center">
            <div className="relative h-full flex justify-center items-center overflow-hidden rounded-lg shadow-lg shadow-gray-400">
              <Image src={'/blog.png'} alt={'blog'} width={600} height={300} objectFit="cover" />
            </div>
          </div>
          <p className="px-2 md:px-32">
            Blog desc Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem sunt delectus cumque magni
            tempore error, consequuntur vitae eius nesciunt voluptates possimus esse, adipisci laudantium beatae nostrum
            at nemo asperiores temporibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quibusdam
            laboriosam atque assumenda consectetur, quod, et architecto quidem doloremque porro, sint magnam minima aut
            veniam dolores vitae beatae tempore culpa.
          </p>
        </Container>
      </article>
    </AppLayout>
  );
}
