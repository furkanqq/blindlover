import Image from 'next/image';

import { IconArrowRight } from '@/assets/IconArrowRight';
import { Container } from '../Container';

const SmallSection = () => {
  return (
    <Container>
      <div className="items-center justify-center flex flex-wrap bg-backgroundColor rounded-lg border border-solid mt-32 ">
        <div className="relative md:w-4/12 md:flex hidden ml-auto mr-auto px-4 ">
          <Image
            alt="..."
            className="max-w-full rounded-lg shadow-lg bg-primaryColor"
            src="/banner.webp"
            width={300}
            height={400}
          />
        </div>
        <div className="w-full md:w-5/12 ml-auto mr-auto px-12 pb-10 pt-4 rounded-lg">
          <div className="md:pr-12">
            <div className="text-primaryColor p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-primaryColor mt-8 relative rotate-[-40deg]">
              <IconArrowRight color="white" />
            </div>
            <h3 className="text-3xl font-semibold">A growing company</h3>
            <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
              The extension comes with three pre-built pages to help you get started faster. You can change the text and
              images and you're good to go.
            </p>
            <ul className="list-none mt-6">
              <li className="py-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primaryColor mr-3"></span>

                  <div>
                    <h4 className="text-blueGray-500">Carefully crafted components</h4>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primaryColor mr-3"></span>
                  <div>
                    <h4 className="text-blueGray-500">Amazing page examples</h4>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primaryColor mr-3"></span>
                  <div>
                    <h4 className="text-blueGray-500">Dynamic components</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { SmallSection };
