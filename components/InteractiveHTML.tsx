'use client'

type InteractiveHTMLProps = {
  title?: string
  src?: string
  html?: string
  height?: number
}

export default function InteractiveHTML({
  title = 'Interactive demo',
  src,
  html,
  height = 640,
}: InteractiveHTMLProps) {
  if (!src && !html) {
    return null
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-700">
      <iframe
        title={title}
        src={src}
        srcDoc={html}
        sandbox="allow-scripts allow-forms allow-popups allow-modals"
        loading="lazy"
        className="block w-full bg-white"
        style={{
          height,
          border: 0,
        }}
      />
    </div>
  )
}
