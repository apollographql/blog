import React from 'react';
import {SectionHeading, SidebarSection, SocialIcons} from './ui';
import {SiDiscord, SiGithub, SiRss, SiTwitter, SiYoutube} from 'react-icons/si';

const socialIcons = {
  'https://github.com/apollographql': SiGithub,
  'https://discord.gg/graphos': SiDiscord,
  'https://twitter.com/apollographql': SiTwitter,
  'https://youtube.com/apollographql': SiYoutube,
  'https://www.apollographql.com/blog/rss.xml': SiRss
};

export default function FollowUs() {
  return (
    <SidebarSection>
      <SectionHeading>Connect with us</SectionHeading>
      <SocialIcons>
        {Object.entries(socialIcons).map(([url, Icon]) => (
          <a key={url} href={url} target="_blank" rel="noreferrer noopener">
            <Icon />
          </a>
        ))}
      </SocialIcons>
    </SidebarSection>
  );
}
