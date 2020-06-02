const endPoint = "http://localhost:5000"


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
