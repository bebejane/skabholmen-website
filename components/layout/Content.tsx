import s from './Content.module.scss'
import React from 'react'
import cn from 'classnames'

type Props = { 
	children: React.ReactElement[] | React.ReactElement,
	className?: string
}

export default function Content({children, className} : Props){

	return (
		<div className={s.wrap}>
			<article className={cn(s.content, className)}>
				{children}
			</article>
		</div>
	)
}