import { Container, ContainerModule, interfaces } from 'inversify';
import DeviceService from '../devices/DeviceService';
import DeviceUnmarshaller from '../../types/marshalling/DeviceUnmarshaller';

const dependenciesContainer = new Container();

const services = new ContainerModule((bind: interfaces.Bind) => {
    bind<DeviceService>(DeviceService).toSelf().inSingletonScope();
});

const domain = new ContainerModule((bind: interfaces.Bind) => {
    bind<DeviceUnmarshaller>(DeviceUnmarshaller).toSelf().inSingletonScope();
});

dependenciesContainer.load(services, domain);

export default dependenciesContainer;