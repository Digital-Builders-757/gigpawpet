import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

const sizeClasses = {
  sm: 'size-4',
  default: 'size-5',
  lg: 'size-6',
} as const

function Spinner({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'svg'> & {
  size?: 'sm' | 'default' | 'lg'
}) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(sizeClasses[size], 'animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
