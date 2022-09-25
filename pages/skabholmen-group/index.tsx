import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { Content, Intro, BannerImage } from '/components';
import { SkabholmenGroupDocument } from '/graphql'
import { Image } from 'react-datocms'
import Markdown from '/lib/dato/components/Markdown';

import type { GetStaticProps } from 'next';
import type { PageProps } from '../../lib/context/page';

type Props = { skabholmenGroup: SkabholmenGroupRecord, partners: PartnerRecord[] }

type PartnersByCategory = {
	[key: string] : {
		name: string,
		items:PartnerRecord[]
	}
}

export default function SkabholmenGroup({ skabholmenGroup: {title, intro, image }, partners}: Props) {

	const partnersByCategory : PartnersByCategory = {}
	
	partners.forEach(p => {
		if(!partnersByCategory[p.category.id])
			partnersByCategory[p.category.id] = { name: p.category.name,  items:[]}
		partnersByCategory[p.category.id].items.push(p)
	})
	

	return (
		<>
		<Content className={s.skabholmenGroup}>
      <Intro title={title} intro={intro}/>
			<>
				{Object.keys(partnersByCategory).map(key => {
					const category = partnersByCategory[key]
					return (
						<>
							<h1>{category.name}</h1>
							<hr/>
							<ul>
								{category.items.map(({id, name}) => 
									<li key={id}>{name}</li>
								)}
							</ul>
						</>
					)
				})}
			</>
    </Content>
		<BannerImage image={image} stripes={false}/>
		</>
	)
}

SkabholmenGroup.page = {layout: 'page', menu:'normal'} as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [SkabholmenGroupDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
