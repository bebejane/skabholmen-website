import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { StartDocument } from '/graphql'
import { Image } from 'react-datocms'
import Markdown from '/lib/dato/components/Markdown';

import type { GetStaticProps } from 'next';

type Props = { }

export default function Team({ }: Props) {

	return (
		<>
      Team
    </>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
