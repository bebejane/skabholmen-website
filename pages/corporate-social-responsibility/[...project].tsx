import styles from './[...project].module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from '/lib/dato/api'
import { PageProps } from '/lib/context/page'
import { AllProjectsDocument, ProjectDocument } from '/graphql'
import { Content, Intro } from '/components';

export type ProjectProps = { project: ProjectRecord };

export default function Project({ project }: ProjectProps) {

	return (
		<Content className={styles.content}>
			<Intro title={project.title} intro={project.description}/>
		</Content>
	)
}

Project.page = {layout: 'page', menu:'normal', footerSeparator:true} as PageProps

export async function getStaticPaths(context) {
	const { projects } = await apiQuery(AllProjectsDocument)
	const paths = projects.map(({ slug }) => ({ params: { project: [slug] } }))
	return {
		paths,
		fallback: 'blocking'
	}
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, context, revalidate }) => {
	console.log(context.params.project[0]);
	
	const { project} = await apiQuery(ProjectDocument, { variables: { slug: context.params.project[0] } })
	
	if (!project)
		return { notFound: true }

	return {
		props: {
			...props,
			project
		},
		revalidate
	};
});