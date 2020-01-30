import React from 'react';
import {Button} from '@apollo/space-kit/Button';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from 'gatsby-theme-apollo-core';

export default function NewsletterForm() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Mailing list</h3>
      <p>
        Don’t miss a single post! Be the first to hear about meetups and other
        news.
      </p>
      <TextField placeholder="Your email address" />
      <Button type="submit" color={colors.primary} style={{width: '100%'}}>
        Subscribe
      </Button>
    </form>
  );
}
