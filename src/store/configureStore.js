import DevConfigurateStore from './configureStore.dev';
import ProdConfigurateStore from './configureStore.prod';

export default (process.env.NODE_ENV === 'production' ? ProdConfigurateStore : DevConfigurateStore);
