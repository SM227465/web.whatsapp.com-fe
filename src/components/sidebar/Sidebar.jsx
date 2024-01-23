import { useState } from 'react';

import Notification from './Notification';
import SidebarHeader from './header/SidebarHeader';
import Search from '../search/Search';

const Sidebar = (props) => {
  const { onlineUsers, isTyping } = props;
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className='flex0030 max-w-[30%] h-full select-none'>
      <SidebarHeader />
      <Notification />
      <Search searchLength={searchResults.length} setSearchResults={setSearchResults} />
      {searchResults.length > 0 ? (
        <>
          {/* <SearchResults searchResults={searchResults} setSearchResults={setSearchResults} /> */}
        </>
      ) : (
        <>{/* <Conversations onlineUsers={onlineUsers} isTyping={isTyping} /> */}</>
      )}
    </div>
  );
};

export default Sidebar;
