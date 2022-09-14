import s from './Content.module.scss'
import React from 'react'
import { Grid } from '/components'

export default function Content({children}){

	return (
		<article className={s.content}>
			{children}
		</article>
	)
}