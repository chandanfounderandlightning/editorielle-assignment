import { Dict } from 'mixpanel-browser';
import { Mixpanel } from '.';
import {
  MixpanelEventName, UserEventProps, CustomEventProps,
} from './types';
export type { Dict };
export { MixpanelEventName };

export const mixpanelUserEvent = ({
  mixpanelProps = {}, id, eventName,
}: UserEventProps) => {
  try {
    Mixpanel.identify(id?.toString());
    Mixpanel.people.set(mixpanelProps);
    Mixpanel.track(eventName, mixpanelProps);
  } catch (err) {
    console.error('error', `Mixpanel tracking error: ${err}`);
  }
};

export const mixpanelCustomEvent = ({
  mixpanelProps = {}, id, eventName,
}: CustomEventProps) => {
  try {
    Mixpanel.identify(id?.toString());
    Mixpanel.track(eventName, mixpanelProps);
  } catch (err) {
    console.error('error', `Mixpanel tracking error: ${err}`);
  }
};
