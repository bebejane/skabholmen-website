import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { Content, Intro } from '/components';
import { ResponsibilityDocument } from '/graphql'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import type { GetStaticProps } from 'next';
import type { PageProps } from '/lib/context/page';
import { format } from 'date-fns'
import cn from 'classnames'

type Props = { responsibility: ResponsibilityRecord, sponsors: SponsorRecord[] }

export default function Responsibility({ responsibility: { title, intro, projects }, sponsors }: Props) {

	return (
		<Content className={s.responsibility}>
			<Intro title={title} intro={intro} />
			<h1>Projects</h1>
			<hr />
			<ul>
				{projects.map(({ title, description, startDate, id, url }) =>
					<li key={id}>
						<div className={s.title}>
							{url ?
								<a href={url} target="_new">
									<h2>{title}</h2>
								</a>
								:
								<h2>{title}</h2>
							}
							<h3>Since {format(new Date(startDate), 'yyyy')}</h3>
						</div>
						<div className={s.description}>
							<Markdown>{description}</Markdown>
						</div>
					</li>
				)}
				<li>
					<div className={s.title}>
						<h2>Proud sponsors of:</h2>
					</div>
					<div className={cn(s.description, s.sponsors)}>
						{sponsors?.map(({ name, url, startDate }, idx) =>
							<div key={idx}>
								<h2>{url ? <a href={url} target="_new">{name}</a> : name}</h2>
								<h3>Since {format(new Date(startDate), 'yyyy')}</h3>
							</div>
						)}
					</div>
				</li>
			</ul>
		</Content>
	)
}

Responsibility.page = { title: 'Corporate Social Responsibility', layout: 'page', menu: 'normal', footerSeparator: true } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [ResponsibilityDocument], seo: { model: 'responsibility' } }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});

