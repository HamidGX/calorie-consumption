import { useEffect, useReducer } from 'react'

import CardStats from '@/components/CardStats'
import CalorieForm from '@/components/Form'
import Header from '@/components/Header'
import List from '@/components/List'

import { ActivityReducer, initialState } from '@/reducers/activity-reducers'

export function Dashboard() {
	const [state, dispatch] = useReducer(ActivityReducer, initialState)

	useEffect(() => {
		localStorage.setItem('activities', JSON.stringify(state.activities))
	}, [state.activities])

	return (
		<div className="flex min-h-screen w-full flex-col">
			<Header />
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
					<CardStats activities={state.activities} />
				</div>
				<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
					{/* Recent Orders Card */}
					<List activities={state.activities} dispatch={dispatch} />
					{/* Form Card*/}
					<CalorieForm dispatch={dispatch} state={state} />
				</div>
			</main>
		</div>
	)
}
