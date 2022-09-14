import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { Content } from '/components';
import { StartDocument } from '/graphql'
import { Image } from 'react-datocms'
import Markdown from '/lib/dato/components/Markdown';

import type { GetStaticProps } from 'next';
import type { PageLayoutProps } from '/lib/context/layout';

type Props = { }

export default function InvestmentPhilosophy({ }: Props) {

	return (
		<Content>
      InvestmentPhilosophy
    </Content>
	)
}

InvestmentPhilosophy.layout = {type: 'page', menu:'inverted'} as PageLayoutProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
