/* eslint-disable no-shadow */
import { Dict } from 'mixpanel-browser';

export enum MixpanelEventName {
    register = 'Register',
    pageView = 'Pageview'
}
export type UserEventProps = {
    mixpanelProps: Dict,
    id: string | number,
    eventName: MixpanelEventName,
}
export type CustomEventProps = {
    mixpanelProps: Dict,
    id: string | number,
    eventName: MixpanelEventName,
}
