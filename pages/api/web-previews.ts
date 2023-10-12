import { withWebPreviewsEdge } from 'dato-nextjs-utils/hoc';

export const config = {
  runtime: 'edge'
}

export default withWebPreviewsEdge(async ({ item, itemType }) => {

  let path = null;

  const { slug } = item.attributes

  switch (itemType.attributes.api_key) {
    case 'start':
      path = `/`
      break;
    case 'partner':
      path = `/skabholmen-group`
      break;
    case 'sponsor':
      path = `/corporate-social-responsibility`
      break;
    default:
      path = slug ? `/${slug}` : null
      break;
  }

  return path
})