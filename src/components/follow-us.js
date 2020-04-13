import React from 'react';
import {IconFacebook} from '@apollo/space-kit/icons/IconFacebook';
import {IconGithub} from '@apollo/space-kit/icons/IconGithub';
import {IconInstagram} from '@apollo/space-kit/icons/IconInstagram';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {IconYoutube} from '@apollo/space-kit/icons/IconYoutube';
import {SectionHeading, SidebarSection, SocialIcons} from './ui';

const socialIcons = Object.entries({
  github: IconGithub,
  twitter: IconTwitter,
  youtube: IconYoutube,
  facebook: IconFacebook,
  instagram: IconInstagram
});

export default function FollowUs() {
  return (
    <SidebarSection>
      <SectionHeading>Connect with us</SectionHeading>
      <SocialIcons>
        {socialIcons.map(([key, Icon]) => (
          <a
            key={key}
            href={`https://${key}.com/apollographql`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Icon />
          </a>
        ))}
      </SocialIcons>
    </SidebarSection>
  );
}
