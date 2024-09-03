import * as React from 'react';
import { Layout } from 'react-admin';
import AppBar from './appBar';
import Menu from './menu';

export default ({ children }: { children: React.ReactNode }) => (
    <Layout appBar={AppBar} menu={Menu}>
        {children}
    </Layout>
);
