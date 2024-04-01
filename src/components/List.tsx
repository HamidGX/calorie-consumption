import { RotateCcw } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Activity } from '@/lib/types/activity'

import { categories } from '@/data/categories'

import { ActivityActions } from '@/reducers/activity-reducers'

type ActivityListProps = {
	activities: Activity[]
	dispatch: React.Dispatch<ActivityActions>
}

export default function List({ activities, dispatch }: ActivityListProps) {
	const categoryName = useMemo(
		() => (category: Activity['category']) =>
			categories.map((cat) => (cat.id === category ? cat.name : '')),
		[],
	)

	const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

	const disableRestartApp = useMemo(() => activities.length > 0, [activities])

	// console.log(activities)

	return (
		<Card className="xl:col-span-2 w-full relative overflow-auto">
			<CardHeader className="flex flex-row items-center">
				<div className="grid gap-2">
					<CardTitle>Activities</CardTitle>
					<CardDescription>
						Here you can see all the activities you have added
					</CardDescription>
				</div>
				<Button
					size="sm"
					className="ml-auto gap-1"
					disabled={!disableRestartApp}
					onClick={() =>
						dispatch({
							type: 'restart-app',
						})
					}
				>
					Reset
					<RotateCcw className="h-4 w-4" />
				</Button>
			</CardHeader>
			<div className="relative overflow-auto z-50">
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Activity</TableHead>
								<TableHead className="text-right">Calories</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{isEmptyActivities ? (
								<div>
									<p className="text-xl pt-4">No activities yet...</p>
								</div>
							) : (
								activities?.map((activity) => (
									<TableRow key={activity.id}>
										<TableCell>
											<p className="font-medium">{activity.name}</p>
											<p className="text-sm text-muted-foreground md:inline">
												{categoryName(activity.category)}
											</p>
										</TableCell>
										<TableCell className="text-right">
											{activity.calories}
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" className="h-8 w-8 p-0">
														<span className="sr-only">Open menu</span>
														<DotsHorizontalIcon className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														onClick={() =>
															dispatch({
																type: 'set-activeId',
																payload: { id: activity.id },
															})
														}
													>
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															dispatch({
																type: 'delete-activity',
																payload: { id: activity.id },
															})
														}
													>
														Delate
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</div>
		</Card>
	)
}
