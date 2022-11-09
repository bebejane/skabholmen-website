import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import { Content, Intro } from '/components';
import { TeamDocument } from '/graphql'
import { Image } from 'react-datocms'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import type { PageProps } from '../../lib/context/page';

import type { GetStaticProps } from 'next';

type Props = { team: TeamRecord }

export default function Team({ team: { title, intro, leadership } }: Props) {

	return (
		<Content className={s.team}>
			<Intro title={title} intro={intro} />
			<p>
				<ul>
					{leadership.map(({ name, role, email, image, biography }, idx) =>
						<li key={idx}>
							<h2>{name}</h2>
							<h3>{role}</h3>
							<div>
								<figure>
									<Image data={image.responsiveImage} objectFit="contain" className={s.image} />
								</figure>
								<Markdown className={s.biography}>
									{biography}
								</Markdown>
							</div>
						</li>
					)}
				</ul>
			</p>
		</Content>
	)
}

Team.page = { title: 'Team', layout: 'page', menu: 'normal', footerSeparator: true } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [TeamDocument], seo: { model: 'team' } }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
