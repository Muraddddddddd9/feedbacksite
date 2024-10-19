import React, { useState } from 'react';
import { Profile, Users, Article, Navbar, News } from '../data.js';

const Home = () => {
  const [selectedLink, setSelectedLink] = useState('');

  let content;
  switch (selectedLink) {
    case "Links":
      content = <Profile />;
      break;
    case "Users":
      content = <Users />;
      break;
    case "Article":
      content = <Article />;
      break;
    case "News":
      content = <News />;
      break;
    default:
      content = <News />;
      // content = <Profile />;
  }

  return (
    <div className="Home">
      <Navbar onSelect={setSelectedLink} />
      <div className='table-db'>
        {content}
      </div>
    </div>
  );
}

export default Home;
