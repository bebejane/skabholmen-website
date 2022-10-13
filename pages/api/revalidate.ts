import withRevalidate from '/lib/dato/webhook/withRevalidate'

export default withRevalidate(async (record, revalidate) => {
  
  const { api_key } = record.model;
  const { slug } = record
  const paths = []
  
  if(api_key === 'start')
    paths.push('/')
  else
    paths.push(`/${slug}`)

  revalidate(paths)
})

