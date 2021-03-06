import { Container, ContainerModule, interfaces } from 'inversify';
import DeviceService from '../devices/DeviceService';
import DeviceUnmarshaller from '../../types/marshalling/DeviceUnmarshaller';
import DeviceSettingsService from '../devices/DeviceSettingsService';
import FilterService from '../filter/FilterService';

const dependenciesContainer = new Container();

const services = new ContainerModule((bind: interfaces.Bind) => {
    bind<DeviceService>(DeviceService).toSelf().inSingletonScope();
    bind<DeviceSettingsService>(DeviceSettingsService).toSelf().inSingletonScope();
    bind<FilterService>(FilterService).toSelf().inSingletonScope();
});

const domain = new ContainerModule((bind: interfaces.Bind) => {
    bind<DeviceUnmarshaller>(DeviceUnmarshaller).toSelf().inSingletonScope();
});

dependenciesContainer.load(services, domain);

export default dependenciesContainer;
