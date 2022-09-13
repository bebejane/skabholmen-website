import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { StartDocument } from '/graphql'
import { Image } from 'react-datocms'
import Markdown from '/lib/dato/components/Markdown';

import type { GetStaticProps } from 'next';


export type HomeProps = { start: StartQuery['start'] }

export default function Home({ start: { intro, image } }: HomeProps) {

	return (
		<div className={s.hero}>
			<Image 
				data={image.responsiveImage} 
				className={s.image}
				objectFit="cover"
				objectPosition={'center'}
			/>
			<Markdown className={s.intro}>{intro}</Markdown>
		</div>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [StartDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
