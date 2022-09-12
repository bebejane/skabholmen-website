import styles from './index.module.scss'
import { GetStaticProps } from 'next'
import withGlobalProps from "/lib/withGlobalProps";

export type HomeProps = { site:Site, menu: MenuRecord[] }

export default function Home({ site, menu } : HomeProps) {
	//console.log(menu)
	return (
		<div className={styles.container}>
			skabholmen
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({queries:[]}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});
