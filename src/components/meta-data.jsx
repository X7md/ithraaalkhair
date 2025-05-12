import { GET_FILE_MTIME } from '@/vite-macros.mjs' with { type: 'macro' };

export function MetaData() {
  const fileModifiedTime = GET_FILE_MTIME('./public/data/taskDetails.json')
  const formattedDate = new Date(fileModifiedTime).toLocaleString('ar', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })

  return (
    <div className="text-xs text-center text-muted-foreground">
      المهام سحبت بتاريخ
      <br />
      <time dateTime={fileModifiedTime}>
        {formattedDate}
      </time>
    </div>
  )
}
