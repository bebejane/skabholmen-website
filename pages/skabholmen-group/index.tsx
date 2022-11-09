import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { Content, Intro, BannerImage } from '/components';
import { SkabholmenGroupDocument } from '/graphql'
import type { GetStaticProps } from 'next';
import type { PageProps } from '../../lib/context/page';
import React from 'react';

type Props = { skabholmenGroup: SkabholmenGroupRecord, partners: PartnerRecord[], partnerCategories: PartnerCategoryRecord[] }

type PartnersByCategory = {
	[key: string]: {
		name: string,
		items: PartnerRecord[],
		categoryId: string
	}
}


export default function SkabholmenGroup({ skabholmenGroup: { title, intro, image }, partners, partnerCategories }: Props) {

	const partnersByCategory: PartnersByCategory = {}

	partners.forEach(p => {
		if (!partnersByCategory[p.category.id])
			partnersByCategory[p.category.id] = { name: p.category.name, items: [], categoryId: p.category.id }
		partnersByCategory[p.category.id].items.push(p)
	})

	const sortByCategory = (a: string, b: string) => {
		const aPos = partnerCategories.find(({ id }) => id === partnersByCategory[a].categoryId).position
		const bPos = partnerCategories.find(({ id }) => id === partnersByCategory[b].categoryId).position
		return aPos > bPos ? 1 : -1
	}

	return (
		<>
			<Content className={s.skabholmenGroup}>
				<Intro title={title} intro={intro} />
				<>
					{Object.keys(partnersByCategory).sort(sortByCategory).map(key => {
						const category = partnersByCategory[key]
						return (
							<React.Fragment key={key}>
								<h1>{category.name}</h1>
								<hr />
								<ul>
									{category.items.map(({ id, name, url }) =>
										<li key={id}>
											{url ? <a href={url}>{name}</a> : <>{name}</>}
										</li>
									)}
								</ul>
							</React.Fragment>
						)
					})}
				</>
			</Content>
			<BannerImage image={image} stripes={false} />
		</>
	)
}

SkabholmenGroup.page = { title: 'Skabholmen Group', layout: 'page', menu: 'normal', footerSeparator: false } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [SkabholmenGroupDocument], seo: { model: 'skabholmenGroup' } }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
