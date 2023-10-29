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
    case 'partner': case 'partner_category':
      path = `/skabholmen-group`
      break;
    case 'person':
      path = `/team`
      break
    case 'sponsor': case 'project':
      path = `/corporate-social-responsibility`
      break;
    case 'contact':
      path = `/`
      break;
    default:
      path = slug ? `/${slug}` : null
      break;
  }

  return path
})