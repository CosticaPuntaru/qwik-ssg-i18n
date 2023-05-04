import { createDOM } from '@builder.io/qwik/testing';
import { component$ } from '@builder.io/qwik';
import { test, describe, expect } from 'vitest';

import { formatDate as fd } from '../use-format-date';
import { QwikSpeakProvider } from '../qwik-speak-component';
import { config } from './config';

const TestComponent = component$(() => {
  const value = '2022-07-19T16:30:00Z';

  return (
    <div>
      <div id="A">{fd(value)}</div>
      <div id="A1">{fd(value, { dateStyle: 'full' })}</div>
      <div id="A2">{fd(value, { dateStyle: 'full', timeStyle: 'short' })}</div>
    </div>
  );
});

describe('formatDate function', async () => {
  const { screen, render } = await createDOM();

  await render(
    <QwikSpeakProvider config={config} locale={config.defaultLocale}>
      <TestComponent />
    </QwikSpeakProvider>
  );

  test('format', () => {
    expect((screen.querySelector('#A') as HTMLDivElement).innerHTML).toContain('7/19/2022');
    expect((screen.querySelector('#A1') as HTMLDivElement).innerHTML).toContain('Tuesday, July 19, 2022');
    expect((screen.querySelector('#A2') as HTMLDivElement).innerHTML).toContain('Tuesday, July 19, 2022 at 9:30 AM');
  });
});