import { Layout as AntLayout } from 'antd';
import styles from './index.module.css';
import Header from '../header';

type props = {
    children: React.ReactNode
}

const Layout = ({ children }: props) => {
  return (
    <div className={ styles.main }>
      <Header></Header>
      <AntLayout.Content style={{ height: '100%' }}>
        { children }
      </AntLayout.Content>
    </div>
  )
};

export default Layout;
