import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } overflow-hidden rounded-[1.5rem] border border-stone-900/10 bg-[#fbf6ed]/88 shadow-[0_14px_36px_rgba(70,49,29,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(70,49,29,0.14)] dark:border-stone-100/8 dark:bg-[linear-gradient(180deg,rgba(44,33,26,0.78),rgba(25,19,15,0.88))] dark:shadow-[0_14px_30px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,238,211,0.03)]`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="h-44 object-cover object-center saturate-[0.8] sepia-[0.14] md:h-32 lg:h-40"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="h-44 object-cover object-center md:h-32 lg:h-40"
            width={544}
            height={306}
          />
        ))}
      <div className="p-7">
        <p className="mb-3 text-xs tracking-[0.28em] text-stone-500 uppercase dark:text-stone-400">
          Project
        </p>
        <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight text-stone-800 dark:text-stone-100">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-4 max-w-none text-stone-600 dark:text-stone-300">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 text-base leading-6 font-medium"
            aria-label={`Link to ${title}`}
          >
            Explore &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
