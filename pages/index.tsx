import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { StartDocument } from '/graphql'
import { Image } from 'react-datocms'
import type { GetStaticProps } from 'next';
import type { PageProps } from '../lib/context/page';

export type HomeProps = { start: StartQuery['start'] }

export default function Home({ start: { intro, image } }: HomeProps) {

	return (
		<div id="banner" className={s.hero}>
			<Image
				data={image.responsiveImage}
				className={s.image}
				objectFit="cover"
				objectPosition={'center'}
			/>
			<div className={s.intro}>
				<h1>{intro}</h1>
			</div>
		</div>
	)
}

Home.page = { title: 'Skabholmen Invest', layout: 'full', menu: 'inverted', footerSeparator: false } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [StartDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
