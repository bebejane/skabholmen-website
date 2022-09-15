import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { Content, Intro } from '/components';
import { ResponsibilityDocument } from '/graphql'
import { Image } from 'react-datocms'
import Markdown from '/lib/dato/components/Markdown';

import type { GetStaticProps } from 'next';
import type { PageLayoutProps } from '/lib/context/layout';

type Props = { responsibility: ResponsibilityRecord }

export default function Responsibility({ responsibility : {title, intro, image, projects }}: Props) {

	return (
		<Content className={s.responsibility}>
      <Intro title={title} intro={intro}/>
			<h1>Projects</h1>
			<hr/>
			<ul>
				{projects.map(({title, description, startDate, id}) => 
					<li key={id}>
						<div className={s.title}>
							<h2>{title}</h2>
							<h3>{startDate}</h3>
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

Responsibility.layout = {type: 'page', menu:'normal'} as PageLayoutProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [ResponsibilityDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});

