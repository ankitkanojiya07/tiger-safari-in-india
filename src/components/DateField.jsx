import { forwardRef, useRef, useState } from 'react'
import { Icon } from './Icons'

function isoToDisplay(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

function todayIso() {
  const t = new Date()
  const y = t.getFullYear()
  const m = String(t.getMonth() + 1).padStart(2, '0')
  const d = String(t.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Text field that keeps dd/mm/yyyy display and opens the native date calendar on click.
 */
const DateField = forwardRef(function DateField(
  { name, id, className = 'field mt-1', required = false, min, ...rest },
  ref,
) {
  const [iso, setIso] = useState('')
  const pickerRef = useRef(null)

  const open = () => {
    const el = pickerRef.current
    if (!el) return
    try {
      if (typeof el.showPicker === 'function') el.showPicker()
      else el.focus()
    } catch {
      el.focus()
    }
  }

  return (
    <div className="relative">
      {/* Submitted value stays in dd/mm/yyyy for the enquiry email */}
      <input
        ref={ref}
        type="text"
        name={name}
        id={id}
        value={isoToDisplay(iso)}
        readOnly
        required={required}
        placeholder="dd/mm/yyyy"
        autoComplete="off"
        inputMode="none"
        className={`${className} cursor-pointer pr-9`}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault()
            open()
          }
        }}
        {...rest}
      />
      {/* Invisible native picker — overlay catches taps where showPicker is unavailable */}
      <input
        ref={pickerRef}
        type="date"
        value={iso}
        min={min ?? todayIso()}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => setIso(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
      />
      <span className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 p-1 text-ink/45" aria-hidden="true">
        <Icon name="calendar" className="h-5 w-5" />
      </span>
    </div>
  )
})

export default DateField
