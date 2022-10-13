import withRevalidate from '/lib/dato/webhook/withRevalidate'

export default withRevalidate(async (record, req, res) => {
  
  const { api_key: apiKey } = record.model;
  const { slug }  = record
  const paths = []

  if(apiKey === 'start')
    paths.push('/')
  else
    paths.push(`/${slug}`)
  
  if (!paths.length)
    throw 'Nothing to revalidate';

  console.log('revalidating paths', paths)
  for (let i = 0; i < paths.length; i++){
    console.log('revalidate', paths[i])
    await res.revalidate(paths[i])
  }
  res.json({ revalidated: true })
  console.log('revalidating done!')

})
