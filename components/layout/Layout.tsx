import s from './Layout.module.scss'
import React from 'react'
import { Grid } from '/components'

export default function LayoutFull({children}){

	return (
		<>
			<main className={s.full}>
				{children}
			</main>
			<Grid/>
		</>
	)
}

export function LayoutPage({children}){

	return (
		<>
			<main className={s.page}>
				{children}
			</main>
			<Grid/>
		</>
	)
}