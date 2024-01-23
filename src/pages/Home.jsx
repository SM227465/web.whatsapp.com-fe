import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';

const Home = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  return (
    <>
      <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden'>
        <div className='container h-screen flex py-[19px]'>
          <Sidebar onlineUsers={onlineUsers} isTyping={isTyping} />
          {/* {activeConversation._id ? (
            <ChatContainer onlineUsers={onlineUsers} callUser={callUser} typing={typing} />
          ) : (
            <WhatsappHome />
          )} */}
        </div>
      </div>
      {/*Call*/}

      {/* <div className={(show || call.signal) && !call.callEnded ? '' : 'hidden'}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          answerCall={answerCall}
          show={show}
          endCall={endCall}
          totalSecInCall={totalSecInCall}
          setTotalSecInCall={setTotalSecInCall}
        />
      </div> */}
    </>
  );
};

export default Home;
