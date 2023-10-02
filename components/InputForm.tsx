'use client';

import { Input } from './ui/input';
import { create } from 'ipfs-http-client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { getAccount } from 'wagmi/actions';
import { isMember } from '../app/utils/isMember';
import { addMember } from '@/app/utils/addMember';

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

const InputForm = () => {
  const { address } = getAccount();
  const router = useRouter();
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isButtonDisabled = !name || !image;

  // const handleUpload = async (image: File) => {
  //   const formData = new FormData();
  //   formData.append('file', image);

  //   try {
  //     const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     setHash(data.Hash);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const demoNavigate = () => {
    router.push('/home');
  };

  // const handleJoinDao = async (name: string, image: File) => {
  //   try {
  //     await handleUpload(image);
  //     const userhash = hash ?? '';
  //     await addMember({ name: name ?? '', profilePicture: userhash });
  //     setFeedback('Member Added');
  //   } catch (error) {
  //     console.error(error);
  //     setFeedback('Error adding member');
  //   }
  // };

  // const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   if (!name || !image) {
  //     return;
  //   }

  //   try {
  //     await handleJoinDao(name, image);
  //     router.push('/home');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleCheckIsMember = async (memberAddress: string) => {
  //   const isMemberResult = await isMember({ memberAddress });
  //   if (isMemberResult === true) {
  //     router.push('/home');
  //   } else {
  //     console.log('User is Not a Member');
  //   }
  // };

  // useEffect(() => {
  //   if (address) {
  //     handleCheckIsMember(address);
  //   }
  // }, []);

  console.log(address);

  return (
    <form className="mt-3">
      <label className="flex-center flex-ol">
        <div className=" lg:w-[600px] lg:h-[600px]  md:w-[500px] md:h-[500px] max-xs:w-[320px] max-xs:h-[370px] p-5 bg-black-300/50 frame flex flex-col rounded-[12px] shadow-lg">
          <div className="flex flex-col gap-3 items-center p-3">
            <Image src="/logo.png" alt="logo" width={50} height={52} />
            <div className="flex flex-row relative items-center lg:mt-[20px]">
              {/* <Image
                src="/Person.png"
                alt="person"
                width={30}
                height={30}
                className="absolute left-3 top-[10px] "
              /> */}
              <Input
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-grey-200 !ring-0 !ring-offset-0 placeholder:text-white-800 placeholder:font-Azeret h-fit  border-0 p-2 placeholder:z-10 lg:w-[450px] lg:h-[50px]  md:w-[350px] max-xs:w-[250px] "
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center p-3 mt-5">
            <div className="flex-center flex-row relative text-white-800">
              {/* <Image
                src="/Full Image.png"
                alt="person"
                width={30}
                height={30}
                className="absolute left-3 top-[3px] "
              /> */}
              <Input
                type="file"
                // required
                onChange={(e) => setImage(e.target.files[0])}
                className="bg-grey-200 !ring-0 !ring-offset-0  h-fit border-0 p-2 lg:w-[450px] md:w-[350px] max-xs:w-[250px] lg:h-[50px] placeholder:text-white-800 "
              />
            </div>
          </div>
          <Button
            className="bg-grey-200 lg:w-[250px] w-[150px] h-[50px] max-xs:h-[40px] rounded-[15px] self-center lg:mt-[200px] md:mt-[100px] max-xs:mt-[40px] font-Azeret font-bold text-white-800"
            onClick={demoNavigate}
            // disabled={isButtonDisabled}
          >
            Continue
          </Button>
        </div>
      </label>
    </form>
  );
};

export default InputForm;
