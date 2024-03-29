import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { Activity } from '@/lib/types/activity'

import { categories } from '@/data/categories'

import { ActivityActions, ActivityState } from '@/reducers/activity-reducers'

type FormProps = {
	// FormProps is a type that defines the props that the CalorieForm component receives.
	dispatch: React.Dispatch<ActivityActions>
	state: ActivityState
}

const initialState: Activity = {
	id: uuidv4(),
	category: 1,
	name: '',
	calories: 0,
}

export default function CalorieForm({ dispatch, state }: FormProps) {
	const [activity, setActivity] = useState<Activity>(initialState)

	useEffect(() => {
		if (state.activeId) {
			const selectedActivity = state.activities.filter(
				(stateActivity) => stateActivity.id === state.activeId,
			)[0]
			setActivity(selectedActivity)
		}
	}, [state.activeId])

	const handleChange = (
		event:
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLInputElement>,
	) => {
		const isNumberField = ['category', 'calories'].includes(event.target.id)
		setActivity({
			...activity,
			[event.target.id]: isNumberField
				? +event.target.value // Convert to number
				: event.target.value,
		})
		// console.log(event.target.id)
	}

	const isValidActivity = () => {
		const { name, calories } = activity
		return name.trim() !== '' && calories > 0
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch({
			type: 'save-activity',
			payload: { newActivity: activity },
		})
		setActivity({ ...initialState, id: uuidv4() })
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Information</CardTitle>
						<CardDescription>
							Enter the information of the activity you want to save
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid gap-4">
							<Label htmlFor="category">Category:</Label>
							<Select
								value={activity.category.toString()} // Convert to string
								onValueChange={(
									value: string, // onValueChange is a prop similar to onChange. It is used to update the value of the Select component.
								) =>
									setActivity({
										...activity,
										category: parseInt(value),
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a verified email to display" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem
											key={category.id}
											value={category.id.toString()} // Convert to string
										>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-4">
							<Label htmlFor="name">Activity:</Label>
							<Input
								id="name"
								type="text"
								placeholder="Example: 1 hour of running"
								required
								value={activity.name}
								onChange={handleChange}
							/>
						</div>
						<div className="grid gap-4">
							<Label htmlFor="calories">Calories:</Label>
							<Input
								id="calories"
								type="number"
								placeholder="Example: 500"
								required
								value={activity.calories !== 0 ? activity.calories : ''}
								onChange={handleChange}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full"
							disabled={!isValidActivity()}
							type="submit"
						>
							{activity.category === 1 ? 'Save Food' : 'Save Exercise'}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</>
	)
}
