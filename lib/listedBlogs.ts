import { allBlogs } from 'contentlayer/generated'

/**
 * unlisted: true 인 글은 링크로만 열린다.
 * 목록·태그·사이트맵·RSS·검색에는 이 배열만 쓴다.
 */
export const listedBlogs = allBlogs.filter((post) => post.unlisted !== true)
