import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { Content, Intro } from '/components';
import { ResponsibilityDocument } from '/graphql'
import Markdown from '/lib/dato/components/Markdown';
import type { GetStaticProps } from 'next';
import type { PageProps } from '/lib/context/page';
import { format } from 'date-fns'
import Link from 'next/link';

type Props = { responsibility: ResponsibilityRecord }

export default function Responsibility({ responsibility : {title, intro, image, projects, slug : pageSlug }}: Props) {
	
	return (
		<Content className={s.responsibility}>
      <Intro title={title} intro={intro}/>
			<h1>Projects</h1>
			<hr/>
			<ul>
				{projects.map(({title, description, startDate, id, slug}) => 
					<li key={id}>
						<div className={s.title}>
							<Link href={`/${pageSlug}/${slug}`}>
								<a>
									<h2>{title}</h2>
								</a>
							</Link>
							<h3>Since {format(new Date(startDate), 'yyyy')}</h3>
						</div>
						<div className={s.description}>
							<Markdown>{description}</Markdown>
						</div>
					</li>
				)}
			</ul>
    </Content>
	)
}

Responsibility.page = {layout: 'page', menu:'normal', footerSeparator:true} as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [ResponsibilityDocument], seo:'responsibility' }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});

