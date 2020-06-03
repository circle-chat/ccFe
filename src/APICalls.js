const endPoint = "https://circle-jcg5wby7mq-uc.a.run.app"


export const postGroup = async ( groupName, description, rules ) => {
  let formattedRules = JSON.stringify(rules)
  const response = await fetch(`${endPoint}/groups`, {
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ name: groupName, rules: formattedRules, description: description })
  })


  return await response.json()

}

export const getGroup = async (code) => {
  const response = await fetch(`https://circle-jcg5wby7mq-uc.a.run.app/groups`)
  const data = await response.json()
  const group = data.find(group => group.access_code === code)

  return group

}
