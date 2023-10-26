import mixpanel, { Dict } from 'mixpanel-browser';
import { mixpanelToken as token } from '../network/endpoints';
if (token) {
  mixpanel.init(token);
}
const actions = {
  identify: (id: string) => {
    mixpanel.identify(id);
  },
  alias: (id: string) => {
    mixpanel.alias(id);
  },
  track: (name: string, props: Dict = {}) => {
    mixpanel.track(name, props);
  },
  people: {
    set: (props: Dict) => {
      mixpanel.people.set(props);
    },
  },
  register: (props: Dict) => {
    mixpanel.register(props);
  },
};

export const Mixpanel = actions;
