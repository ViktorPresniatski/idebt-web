import React from 'react';
import { Layout } from 'antd';
import * as styles from './styles';
const { Footer, Content } = Layout;

export default class NotLoggedLayout extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <Layout style={styles.layout}>
        <Content>{props.children}</Content>
        <Footer />
      </Layout>
    );
  }
}
