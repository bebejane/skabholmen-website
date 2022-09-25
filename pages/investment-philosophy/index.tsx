import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { Content, Intro, BannerImage } from '/components';
import { InvestmentPhilosophyDocument } from '/graphql'
import type { GetStaticProps } from 'next';
import type { PageProps } from '../../lib/context/page';

type Props = { investmentPhilosophy: InvestmentPhilosophyRecord }

export default function InvestmentPhilosophy({ investmentPhilosophy : {title, intro, image }}: Props) {

	return (
		<>
			<BannerImage image={image} stripes={true}/>
			<Content className={s.investment}>
				<Intro title={title} intro={intro}/>
			</Content>
		</>
	)
}

InvestmentPhilosophy.page = {layout: 'full', menu:'inverted'} as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [InvestmentPhilosophyDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
