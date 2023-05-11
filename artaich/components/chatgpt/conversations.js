import { useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { ChatGPTLogo, EmptyAvatar } from '../icons/icons';
import { useChat } from '../../hooks/useChat';
import { strapiUrl } from '../../constants/constans';

export const Conversations = () => {
  const { user } = useContext(UserContext);

  const { data, isLoading } = useChat(user?.id);
  // console.log('Request of chatGpt user, bot', data);
  const reversedData = data?.data?.slice().reverse();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="border border-blue-300 shadow p-4 w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-100">
      <section className="flex flex-col text-sm h-[80vh] lg:h-[85vh] overflow-y-scroll overflow-x-hidden">
        {reversedData?.map((item) => (
          <div key={item.id}>
            <div className={`group w-full text-gray-800 bg-gray-100 `}>
              <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl md:py-6 lg:px-0 m-auto">
                <div className="flex-shrink-0 ml-2 flex flex-col relative items-end w-[30px]">
                  {user?.avatar ? (
                    <img
                      className="w-7 h-7 rounded-full object-cover"
                      src={strapiUrl + user.avatar.url}
                      alt="user_avatar"
                    />
                  ) : (
                    <EmptyAvatar />
                  )}
                </div>
                <div className="relative flex flex-col text-left w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                  {item?.attributes?.payload_in?.prompt}
                </div>
              </div>
            </div>
            <div
              className={`group w-full text-gray-100 border-b border-black/10 bg-gray-800 `}
            >
              <div className="flex  p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl  md:py-6 lg:px-0 m-auto">
                <div className="flex-shrink-0 ml-1 flex flex-col relative items-end w-[30px]">
                  <ChatGPTLogo />
                </div>
                <div className="relative flex flex-col text-left w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                  {item?.attributes?.payload_out?.resp}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={lastMessageRef}></div>
      </section>
    </div>
  );
};
