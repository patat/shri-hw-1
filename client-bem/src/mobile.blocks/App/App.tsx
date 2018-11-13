import { Registry, withRegistry } from '@bem-react/di';
import { cn } from '@bem-react/classname';
import { App as AppCommon } from '../../common.blocks/App/App';
import { EventCard } from '../EventCard/EventCard';

const cnApp = cn('App');
const cnEventCard = cn('EventCard');

const mobile = new Registry({ id: cnApp() });

mobile.set(cnEventCard(), EventCard);

export const App = withRegistry(mobile)(AppCommon);