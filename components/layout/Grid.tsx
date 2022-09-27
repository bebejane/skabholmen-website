import s from './Grid.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'

export default function Grid(){

	const [showGrid, setShowGrid] = useState(false)

	useEffect(() => {
		if(process.env.NODE_ENV === 'production') return
		const toggleGrid = ({ key, target }) => target.tagName !== 'INPUT' && key === 'g' && setShowGrid(!showGrid)
		document.addEventListener('keydown', toggleGrid)
		return () => document.removeEventListener('keydown', toggleGrid)
	}, [showGrid, setShowGrid])

	if (!showGrid) return null

	return (
		<div className={s.grid}>
			<div className={s.gridWrapper}>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
				<div className={s.gridItem}></div>
			</div>
		</div>
	)
}