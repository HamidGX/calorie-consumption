import { Clock4, Diff, Footprints, Pizza } from 'lucide-react'
import { useMemo } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Activity } from '@/lib/types/activity'

type CardProps = {
	activities: Activity[]
}

export default function CardStats({ activities }: CardProps) {
	const caloriesConsumed = useMemo(
		() =>
			activities.reduce(
				(total, activity) =>
					activity.category === 1 ? total + activity.calories : total,
				0,
			),
		[activities],
	)

	const caloriesBurned = useMemo(
		() =>
			activities.reduce(
				(total, activity) =>
					activity.category === 2 ? total + activity.calories : total,
				0,
			),
		[activities],
	)

	const difference = useMemo(
		() => caloriesConsumed - caloriesBurned,
		[caloriesConsumed, caloriesBurned],
	)

	const lastNameActivity = useMemo(
		() => activities[activities.length - 1],
		[activities],
	)

	return (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Calories Consumed
					</CardTitle>
					<Pizza className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{caloriesConsumed}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
					<Footprints className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{caloriesBurned}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Difference</CardTitle>
					<Diff className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{difference}</p>
					<p className="text-xs text-muted-foreground"></p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Last Activity</CardTitle>
					<Clock4 className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">
						{lastNameActivity && lastNameActivity.name
							? lastNameActivity.name
							: 'No activity'}
					</p>
				</CardContent>
			</Card>
		</>
	)
}
