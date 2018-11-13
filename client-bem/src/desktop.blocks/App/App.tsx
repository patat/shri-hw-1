import { Registry, withRegistry } from '@bem-react/di';
import { cn } from '@bem-react/classname';
import { App as AppCommon } from '../../common.blocks/App/App';
import { EventCard } from '../../common.blocks/EventCard';

const cnApp = cn('App');
const cnEventCard = cn('EventCard');

const desktop = new Registry({ id: cnApp() });

desktop.set(cnEventCard(), EventCard);

export const App = withRegistry(desktop)(AppCommon);