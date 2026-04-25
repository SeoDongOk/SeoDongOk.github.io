// Design Handoff — category-based navigation
// Each category links to /blog with a category query param (filter handled by main/blog page)
const headerNavLinks = [
  { href: '/blog?cat=quant', title: '퀀트' },
  { href: '/blog?cat=infra', title: '인프라' },
  { href: '/blog?cat=japan', title: '일본어' },
  { href: '/about', title: 'About' },
]

export default headerNavLinks
