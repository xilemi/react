import { Link, Outlet } from 'umi';
import styles from './index.less';
import { Provider } from 'mobx-react';
import { store } from '@/mobx/store';

export default function Layout() {
  return (
    <div>
      <Provider {...store}>
        <Outlet />
      </Provider>
    </div>
  );
}
