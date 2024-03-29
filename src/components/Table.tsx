import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
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

type ActivityListProps = {
	activities?: Activity[]
}

export default function TablaMods({ activities }: ActivityListProps) {
	const categoryName = useMemo(
		() => (category: Activity['category']) =>
			categories.map((cat) => (cat.id === category ? cat.name : '')),
		[activities],
	)

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Activity</TableHead>
					<TableHead className="text-right">Calories</TableHead>
					<TableHead className="text-right">Acctions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>
						<div className="font-medium">Sissssssssssssssssssssssssssssss</div>
						<div className="text-sm text-muted-foreground md:inline">
							sssssssssssssssssssssssssssssssssssssssssssssssssssssss
						</div>
					</TableCell>
					<TableCell className="text-right">
						sssssssssssssssssssssssssssssssssssssssss
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
								<DropdownMenuItem>Copy payment ID</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>View customer</DropdownMenuItem>
								<DropdownMenuItem>View payment details</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}
