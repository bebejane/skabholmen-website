//import s from './Layout.module.scss'
import React from 'react'
import { Grid } from '/components'

export default function Layout({children}){

	return (
		<>
			<main>
				{children}
			</main>
			<Grid/>
		</>
	)
}