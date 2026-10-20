import { Link } from 'react-router-dom'
import { defaultAuthor, contentUpdated } from '../data/eeat'

export default function AuthorByline({ updated = contentUpdated, author = defaultAuthor }) {
  return (
    <aside className="mt-10 border-t border-ink/15 pt-6 text-[14px] text-ink/65">
      <p>
        <span className="text-ink/45">Written by </span>
        <Link to={author.path} className="text-ink underline-offset-2 hover:underline">
          {author.name}
        </Link>
        <span className="text-ink/45"> · {author.role}</span>
      </p>
      <p className="mt-1">
        <span className="text-ink/45">Updated </span>
        <time dateTime={updated}>{updated}</time>
        <span className="text-ink/45"> · Facts verified against forest department sources where linked</span>
      </p>
    </aside>
  )
}
