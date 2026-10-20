import { m, useReducedMotion } from 'framer-motion'

// Soft fade-and-rise as a block enters the viewport.
// Content starts visible enough that nothing looks blank if animation is slow.
export default function Reveal({ children, delay = 0, y = 20, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = m[as]
  if (reduce) return <div className={className}>{children}</div>
  return (
    <Tag
      className={className}
      initial={{ opacity: 0.55, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.55, delay: Math.min(delay, 0.2), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
